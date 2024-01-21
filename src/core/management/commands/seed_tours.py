import json

from django.conf import settings
from django.core.management.base import BaseCommand

from tours.models import Tour

ROOT_DIR = settings.BASE_DIR.parent
FILE_PATH = ROOT_DIR / "data" / "tours-simple.json"


class Command(BaseCommand):
    help = "Seeds the database with tours"

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS("⇨ Seeding tours..."))

        # Delete all tours from database
        Tour.objects.all().delete()
        self.stdout.write(self.style.WARNING("⇨ Deleted all tours from database"))

        # Read tours from json file
        with open(FILE_PATH, "r") as file:
            tours = json.load(file)

            # Create tours
            for tour in tours:
                # Exclude id, image_cover, images and start_date from tour
                tour.pop("id")
                tour.pop("image_cover")
                tour.pop("images")

                Tour.objects.create(**tour)
                self.stdout.write(self.style.SUCCESS(f"⇨ Created tour: {tour['name']}"))

        self.stdout.write(self.style.SUCCESS("⇨ Done seeding tours"))
