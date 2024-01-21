import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models
from model_utils import Choices


class CustomUser(AbstractUser):
    ROLE_CHOICES = Choices(
        ("user", "User"),
        ("admin", "Admin"),
        ("guide", "Guide"),
        ("lead-guide", "Lead Guide"),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    photo = models.CharField(max_length=255, blank=True, null=True)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default="user")

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
