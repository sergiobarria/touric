from django.urls import path

from .views import ToursList, SingleTour

urlpatterns = [
    path("", ToursList.as_view(), name="tours"),
    path("<str:id>", SingleTour.as_view(), name="single_tour"),
]
