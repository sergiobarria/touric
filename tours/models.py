from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.text import slugify
from model_utils import FieldTracker, Choices


class Tour(models.Model):
    DIFFICULTY_CHOICES = Choices(
        ("easy", "Easy"), ("medium", "Medium"), ("difficult", "Difficult")
    )

    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True, null=True, blank=True)
    duration = models.PositiveIntegerField()
    max_group_size = models.PositiveIntegerField()
    difficulty = models.CharField(
        max_length=20, choices=DIFFICULTY_CHOICES, default=DIFFICULTY_CHOICES.medium
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
    tracker = FieldTracker(["name"])

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["id", "-created_at"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug or self.tracker.has_changed("name"):
            self.slug = slugify(self.name)

        return super(Tour, self).save(*args, **kwargs)
