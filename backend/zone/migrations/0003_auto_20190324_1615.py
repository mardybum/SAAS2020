# Generated by Django 2.1.7 on 2019-03-24 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('zone', '0002_zones_zoneid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='zones',
            name='id',
            field=models.CharField(max_length=100, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='zones',
            name='zoneId',
            field=models.TextField(default=models.CharField(max_length=100, primary_key=True, serialize=False)),
        ),
    ]
