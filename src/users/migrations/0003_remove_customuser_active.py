# Generated by Django 5.0.1 on 2024-01-21 17:37

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0002_customuser_role"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="customuser",
            name="active",
        ),
    ]