from django.urls import path

from . import views

urlpatterns = [
    path("health/", views.get_health, name="health"),
    path("tours/", views.TourList.as_view(), name="tours"),
    path("tours/stats/", views.tour_stats, name="tour_stats"),
    path("tours/<str:id>", views.TourSingle.as_view(), name="single_tour"),
    path("users/", views.UserList.as_view(), name="users"),
    path("users/<str:id>", views.UserSingle.as_view(), name="single_user"),
]
