from django.db import models

# Create your models here.
class Appointment(models.Model):
    vin = models.CharField(max_length=25)
    customer_name = models.CharField(max_length=100)
    date = models.DateTimeField()
    reason = models.TextField()
    technician = models.ForeignKey("Technician", related_name="appointments", on_delete=models.PROTECT)
    completed = models.BooleanField(default=False)

    def is_vip(self):
        if DealershipAutoMobilesVO.objects.get(vin=self.vin):
            self.vin += '(VIP**)'


class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveSmallIntegerField()


class DealershipAutoMobilesVO(models.Model):
    vin = models.CharField(max_length=17)
    year = models.PositiveSmallIntegerField()
