from django.db import models



# Create your models here.
class SellerPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_id = models.PositiveSmallIntegerField(unique=True)

    def __str__(self):
        return self.name


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name


class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    status = models.BooleanField()

    def __str__(self):
        return self.vin


class SaleRecord(models.Model):
    price = models.PositiveIntegerField()
    vin = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.PROTECT,
    )
    seller = models.ForeignKey(
        SellerPerson,
        related_name="sales",
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return "Customer: " + self.seller.name + ', VIN number: ' + self.vin.vin + ', Seller: ' + self.seller.name