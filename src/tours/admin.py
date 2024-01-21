from django.contrib import admin

from .models import Tour


@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}
    list_display = (
        "name",
        "price",
        "price_discount",
        "duration",
        "max_group_size",
        "difficulty",
        "ratings_avg",
        "ratings_qty",
        "created_at",
    )
