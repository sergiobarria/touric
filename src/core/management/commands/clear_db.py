from django.core.management.base import BaseCommand

from tours.models import Tour


class Command(BaseCommand):
    help = "Delete all tours from database"

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING("⇨ Deleting all tours from database..."))

        # Delete all tours from database
        Tour.objects.all().delete()

        self.stdout.write(self.style.SUCCESS("⇨ Done deleting tours"))
