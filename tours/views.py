from rest_framework.decorators import api_view

from django.http import JsonResponse


@api_view(["GET"])
def get_tours(request):
    return JsonResponse({"message": "Hello, World!"})


@api_view(["GET", "PATCH", "DELETE"])
def get_single_tour(request, id):
    if request.method == "GET":
        return JsonResponse({"message": f"Get Single Tour: {id}"})

    if request.method == "PATCH":
        return JsonResponse({"message": f"Update Single Tour: {id}"})

    if request.method == "DELETE":
        return JsonResponse({"message": f"Delete Single Tour: {id}"})
