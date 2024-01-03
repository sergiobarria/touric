from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(["GET"])
def get_health(request):
    return JsonResponse(
        {
            "status": "ok",
            "code": status.HTTP_200_OK,
            "version": "1.0.0",
            "message": "Server is up and running.",
            "name": "Touric REST API",
        }
    )
