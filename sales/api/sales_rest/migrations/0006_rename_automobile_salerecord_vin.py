# Generated by Django 4.0.3 on 2022-06-22 20:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0005_rename_vin_salerecord_automobile'),
    ]

    operations = [
        migrations.RenameField(
            model_name='salerecord',
            old_name='automobile',
            new_name='vin',
        ),
    ]
