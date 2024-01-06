from django.urls import path

from .views import SingleTour, TourList

urlpatterns = [
    path("tours/", TourList.as_view(), name="tours"),
    path("tours/<str:id>", SingleTour.as_view(), name="single_tour"),
]
