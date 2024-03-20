# Generated by Django 5.0.3 on 2024-03-20 23:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Playlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('uri', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Track',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('uri', models.CharField(max_length=200)),
                ('artist_name', models.CharField(max_length=200)),
                ('artist_uri', models.CharField(max_length=200)),
                ('playlist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='QRSpotify.playlist')),
            ],
        ),
    ]
