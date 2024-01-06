from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView

from core.models import Tour
from core.serializers import TourSerializer


class TourList(APIView):
    """List all tours, or create a new tour."""

    def get(self, request):
        """Return a list of all tours."""
        tours = Tour.objects.all()
        serializer = TourSerializer(tours, many=True)

        return JsonResponse(
            {
                "success": True,
                "code": status.HTTP_200_OK,
                "results": len(tours),
                "data": serializer.data,
            }
        )

    def post(self, request):
        """Create a new tour."""
        serializer = TourSerializer(data=request.data)

        if not serializer.is_valid():
            return JsonResponse(
                {
                    "success": False,
                    "code": status.HTTP_400_BAD_REQUEST,
                    "message": "Validation Error",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer.save()
        return JsonResponse(
            {
                "success": True,
                "code": status.HTTP_201_CREATED,
                "data": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )


class SingleTour(APIView):
    """Retrieve, update or delete a tour instance."""

    def _get_tour(self, id):
        """Helper method to get a tour instance"""
        try:
            return Tour.objects.get(id=id)
        except Tour.DoesNotExist:
            return None

    def _not_found(self):
        """Helper method to return 404 response"""
        return JsonResponse(
            {
                "success": False,
                "code": status.HTTP_404_NOT_FOUND,
                "message": "Tour not found",
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    def get(self, request, id):
        """Return a single tour by ID."""
        tour = self._get_tour(id)

        if not tour:
            return self._not_found()

        serializer = TourSerializer(tour)
        return JsonResponse(
            {
                "success": True,
                "code": status.HTTP_200_OK,
                "data": serializer.data,
            }
        )

    def patch(self, request, id):
        """Update a tour."""
        tour = self._get_tour(id)

        if not tour:
            return self._not_found()

        serializer = TourSerializer(tour, data=request.data, partial=True)

        if not serializer.is_valid():
            return JsonResponse(
                {
                    "success": False,
                    "code": status.HTTP_400_BAD_REQUEST,
                    "message": "Validation Error",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer.save()
        return JsonResponse(
            {
                "success": True,
                "code": status.HTTP_200_OK,
                "data": serializer.data,
            }
        )

    def delete(self, request, id):
        """Delete a tour."""
        tour = self._get_tour(id)

        if not tour:
            return self._not_found()

        tour.delete()
        return JsonResponse(
            {
                "success": True,
                "code": status.HTTP_204_NO_CONTENT,
            },
            status=status.HTTP_204_NO_CONTENT,
        )