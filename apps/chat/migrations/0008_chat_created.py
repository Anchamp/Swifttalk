# Generated by Django 4.1.3 on 2022-11-21 09:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0007_remove_room_created'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat',
            name='created',
            field=models.DateField(auto_now_add=True, null=True),
        ),
    ]
