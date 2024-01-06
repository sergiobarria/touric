from django.urls import path

from . import views

urlpatterns = [
    path("tours/", views.TourList.as_view(), name="tours"),
    path("tours/<str:id>", views.SingleTour.as_view(), name="single_tour"),
    path("users/", views.UserList.as_view(), name="users"),
    path("users/<str:id>", views.SingleUser.as_view(), name="single_user"),
]
