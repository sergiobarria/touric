from collections import Counter, defaultdict

from django.db.models import Avg, Count, Max, Min, Sum
from django.http import JsonResponse
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.filters import OrderingFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from core.utils import api_response
from tours.models import Tour

from .serializers import LoginSerializer, TourSerializer, UserRegistrationSerializer


@api_view(["GET"])
def get_health(request):
    """Return a health check response."""
    return JsonResponse(
        {
            "status": "ok",
            "code": status.HTTP_200_OK,
            "version": "1.0.0",
            "message": "Server is up and running.",
            "name": "Touric REST API",
        }
    )


# =======================================================
# ==================== TOURS METHODS ====================
# =======================================================
class TourFilter(filters.FilterSet):
    """Filter class for tours"""

    name = filters.CharFilter(lookup_expr="icontains")
    duration = filters.NumberFilter(lookup_expr="exact")
    duration_gte = filters.NumberFilter(field_name="duration", lookup_expr="gte")
    duration_lte = filters.NumberFilter(field_name="duration", lookup_expr="lte")
    max_group_size = filters.NumberFilter(lookup_expr="exact")
    difficulty = filters.ChoiceFilter(choices=Tour.DIFFICULTY_CHOICES)
    price = filters.NumberFilter(lookup_expr="exact")
    price_get = filters.NumberFilter(field_name="price", lookup_expr="gte")
    price_lte = filters.NumberFilter(field_name="price", lookup_expr="lte")

    class Meta:
        model = Tour
        fields = [
            "name",
            "duration",
            "duration_gte",
            "duration_lte",
            "max_group_size",
            "difficulty",
            "price",
            "price_get",
            "price_lte",
        ]


class CustomPagination(PageNumberPagination):
    page_size_query_param = "page_size"
    page_size = 10
    max_page_size = 1000


class TourList(APIView):
    """List all tours, or create a new tour."""

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = TourFilter
    ordering_fields = [
        "name",
        "duration",
        "max_group_size",
        "difficulty",
        "price",
        "ratings_avg",
    ]
    ordering = ["name"]  # Default ordering

    def get(self, request):
        """Return a list of all tours."""
        self.permission_classes = [IsAuthenticated]
        self.check_permissions(request)

        tours = Tour.objects.all()
        fields = request.query_params.get("fields", None)

        # Apply filters
        filtered_queryset = TourFilter(request.query_params, queryset=tours).qs

        # Apply ordering
        ordering = OrderingFilter()
        ordered_tours = ordering.filter_queryset(request, filtered_queryset, self)

        # Apply pagination
        paginator = CustomPagination()

        # Determine fields to include in response
        serializer_fields = fields.split(",") if fields is not None else None

        # Check if pagination is needed, else return all results
        if ordered_tours.count() > paginator.page_size:
            # apply pagination
            paginated_tours = paginator.paginate_queryset(ordered_tours, request)
            serializer = TourSerializer(
                paginated_tours, many=True, fields=serializer_fields
            )
            return paginator.get_paginated_response(serializer.data)
        else:
            serializer = TourSerializer(
                ordered_tours, many=True, fields=serializer_fields
            )
            return api_response(data=serializer.data)

    def post(self, request):
        """Create a new tour."""
        serializer = TourSerializer(data=request.data)

        if not serializer.is_valid():
            return api_response(
                status_code=status.HTTP_400_BAD_REQUEST,
                message="Validation Error",
                errors=serializer.errors,
            )

        serializer.save()
        return api_response(data=serializer.data, status_code=status.HTTP_201_CREATED)


class TourSingle(APIView):
    """Retrive, update or delete a tour instance."""

    def _get_tour(self, id):
        """Helper method to get a tour instance"""
        try:
            return Tour.objects.get(id=id)
        except Tour.DoesNotExist:
            return None

    def _not_found(self):
        """Helper method to return a 404 response"""
        return api_response(
            success=False,
            message="Tour not found",
            status_code=status.HTTP_404_NOT_FOUND,
        )

    def get(self, request, id):
        """Return a single tour by ID."""
        tour = self._get_tour(id)

        if not tour:
            return self._not_found()

        serializer = TourSerializer(tour)
        return api_response(data=serializer.data)

    def patch(self, request, id):
        """Update a tour."""
        tour = self._get_tour(id)

        if not tour:
            return self._not_found()

        serializer = TourSerializer(tour, data=request.data, partial=True)

        if not serializer.is_valid():
            return api_response(
                status_code=status.HTTP_400_BAD_REQUEST,
                message="Validation Error",
                errors=serializer.errors,
            )

        serializer.save()
        return api_response(data=serializer.data)

    def delete(self, request, id):
        """Delete a tour."""
        tour = self._get_tour(id)

        if not tour:
            return self._not_found()

        tour.delete()
        return api_response(
            message="Tour deleted successfully.", status_code=status.HTTP_204_NO_CONTENT
        )


@api_view(["GET"])
def tour_stats(request):
    """Return tours statistics"""
    tours = Tour.objects.filter(ratings_avg__gte=4.5)

    # Perform aggregation using Django ORM
    stats = (
        tours.values("difficulty")
        .annotate(
            num_tours=Count("id"),
            num_ratings=Sum("ratings_qty"),
            avg_rating=Avg("ratings_avg"),
            avg_price=Avg("price"),
            min_price=Min("price"),
            max_price=Max("price"),
        )
        .order_by("avg_price")
    )

    return api_response(list(stats))


@api_view(["GET"])
def get_monthly_plan(request, year):
    """Return a monthly plan for a given year"""
    tours = Tour.objects.all()

    # Dictionary to hold tour data by month
    tours_by_month = defaultdict(list)
    month_counter = Counter()

    # Iterate through each tour and its start dates
    for tour in tours:
        for start_date in tour.start_dates:
            if start_date.year == int(year):
                month = start_date.month
                tours_by_month[month].append(tour.name)
                month_counter[month] += 1

    # Aggregate data
    monthly_plan = []

    for month in sorted(tours_by_month):
        month_data = {
            "month": month,
            "num_tour_starts": month_counter[month],
            "tours": tours_by_month[month],
        }
        monthly_plan.append(month_data)

        if len(monthly_plan) == 12:
            break

    return api_response(monthly_plan)


@api_view(["GET"])
def get_top_cheapest_tours(request):
    """Return the top 5 cheapest tours"""
    limit = 5
    order = ["-ratings_avg", "price"]
    fields = ["name", "price", "ratings_avg", "summary", "difficulty"]

    top_tours = Tour.objects.order_by(*order)[:limit]
    serializer = TourSerializer(top_tours, many=True, fields=fields)
    return api_response(data=serializer.data)


# =======================================================
# ==================== USERS METHODS ====================
# =======================================================
class UserList(APIView):
    """List all users, or create a new user."""

    def get(self, request):
        """Return a list of all users."""
        return api_response(
            status_code=status.HTTP_501_NOT_IMPLEMENTED, message="Not implemented"
        )

    def post(self, request):
        """Create a new user."""
        return api_response(
            status_code=status.HTTP_501_NOT_IMPLEMENTED, message="Not implemented"
        )


class UserSingle(APIView):
    """Retrive, update or delete a user instance."""

    def get(self, request, id):
        """Return a single user by ID."""
        return api_response(
            status_code=status.HTTP_501_NOT_IMPLEMENTED, message="Not implemented"
        )

    def patch(self, request, id):
        """Update a user."""
        return api_response(
            status_code=status.HTTP_501_NOT_IMPLEMENTED, message="Not implemented"
        )

    def delete(self, request, id):
        """Delete a user."""
        return api_response(
            status_code=status.HTTP_501_NOT_IMPLEMENTED, message="Not implemented"
        )


# =======================================================
# ===================== AUTH METHODS ====================
# =======================================================
@api_view(["POST"])
def register(request):
    """Register a new user."""
    serializer = UserRegistrationSerializer(data=request.data)
    if not serializer.is_valid():
        return api_response(
            status_code=status.HTTP_400_BAD_REQUEST,
            message="Validation Error",
            errors=serializer.errors,
        )

    user = serializer.save()
    refresh = RefreshToken.for_user(user)
    data = {
        **serializer.data,
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }
    return api_response(
        data=data,
        status_code=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
def login(request):
    """Login a user."""
    serializer = LoginSerializer(data=request.data)

    if not serializer.is_valid():
        return api_response(
            status_code=status.HTTP_400_BAD_REQUEST,
            message="Validation Error",
            errors=serializer.errors,
        )

    user = serializer.validated_data["user"]
    refresh = RefreshToken.for_user(user)
    data = {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }
    return api_response(data=data, status_code=status.HTTP_200_OK)
