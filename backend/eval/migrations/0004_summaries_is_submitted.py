# Generated by Django 4.2.6 on 2023-10-30 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eval', '0003_remove_summaries_text_remove_text_question_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='summaries',
            name='is_submitted',
            field=models.BooleanField(default=False),
        ),
    ]