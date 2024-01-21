from django.db.models import Avg, Count, Max, Min, Sum
from django.http import JsonResponse
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.filters import OrderingFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView

from core.utils import api_response
from tours.models import Tour

from .serializers import TourSerializer


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
