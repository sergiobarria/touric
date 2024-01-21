import uuid

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.text import slugify
from model_utils import Choices, FieldTracker


class Tour(models.Model):
    DIFFICULTY_CHOICES = Choices(
        ("easy", "Easy"), ("moderate", "Moderate"), ("difficult", "Difficult")
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True, null=True, blank=True)
    duration = models.PositiveIntegerField()
    max_group_size = models.PositiveIntegerField()
    difficulty = models.CharField(
        max_length=20, choices=DIFFICULTY_CHOICES, default=DIFFICULTY_CHOICES.moderate
    )
    ratings_avg = models.FloatField(
        default=4.5, validators=[MinValueValidator(0.0), MaxValueValidator(5.0)]
    )
    ratings_qty = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    price_discount = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True
    )
    summary = models.TextField()
    description = models.TextField()
    # TODO: Add cover_image, images, start_dates fields

    # Third party fields
    tracker = FieldTracker(
        ["name"]
    )  # used to track changes in the name field, and update the slug field accordingly

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["id", "-created_at"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        """Override the save method to update the slug field"""
        if not self.slug or self.tracker.has_changed("name"):
            self.slug = slugify(self.name)

        return super(Tour, self).save(*args, **kwargs)
