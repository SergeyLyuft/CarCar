# Generated by Django 4.0.3 on 2022-06-21 23:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='SalerPerson',
            new_name='SellerPerson',
        ),
    ]
