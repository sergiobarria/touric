from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

urlpatterns = [
    path("auth/register/", views.register, name="register"),
    path("auth/login/", views.login, name="login"),
    path("health/", views.get_health, name="health"),
    path("tours/", views.TourList.as_view(), name="tours"),
    path("tours/monthly-plan/<int:year>", views.get_monthly_plan, name="monthly_plan"),
    path("tours/stats/", views.tour_stats, name="tour_stats"),
    path("tours/top", views.get_top_cheapest_tours, name="top_tours"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("tours/<str:id>", views.TourSingle.as_view(), name="single_tour"),
    path("users/", views.UserList.as_view(), name="users"),
    path("users/<str:id>", views.UserSingle.as_view(), name="single_user"),
]
