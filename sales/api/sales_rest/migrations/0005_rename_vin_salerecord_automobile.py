# Generated by Django 4.0.3 on 2022-06-22 19:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0004_remove_automobilevo_import_href_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='salerecord',
            old_name='vin',
            new_name='automobile',
        ),
    ]
