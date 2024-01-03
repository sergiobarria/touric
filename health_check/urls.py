from django.urls import path

from .views import get_health

urlpatterns = [
    path("", get_health, name="health"),
]
