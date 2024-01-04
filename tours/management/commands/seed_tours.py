import json

from django.core.management.base import BaseCommand
from django.conf import settings

from tours.models import Tour

FILE_PATH = settings.BASE_DIR / "data" / "tours-simple.json"


class Command(BaseCommand):
    help = "Seeds the database with tours"

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS("⇨ Seeding tours..."))

        # delete all tours from database
        Tour.objects.all().delete()
        self.stdout.write(self.style.SUCCESS("⇨ Deleted all tours from database"))

        # read tours from json file
        with open(FILE_PATH, "r") as file:
            tours = json.load(file)

            # create tours
            for tour in tours:
                # exclude id, image_cover, images and start_date from tour
                tour.pop("id")
                tour.pop("image_cover")
                tour.pop("images")
                tour.pop("start_date")

                Tour.objects.create(**tour)
                self.stdout.write(self.style.SUCCESS(f"⇨ Created tour: {tour['name']}"))

        self.stdout.write(self.style.SUCCESS("⇨ Done seeding tours"))
