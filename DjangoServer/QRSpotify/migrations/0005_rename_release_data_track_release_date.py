# Generated by Django 5.0.3 on 2024-04-04 22:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('QRSpotify', '0004_track_release_data'),
    ]

    operations = [
        migrations.RenameField(
            model_name='track',
            old_name='release_data',
            new_name='release_date',
        ),
    ]
