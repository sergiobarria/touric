from django.urls import path

from . import views

urlpatterns = [
    path("", views.get_tours, name="tours"),
    path("<str:id>", views.get_single_tour, name="single_tour"),
]
