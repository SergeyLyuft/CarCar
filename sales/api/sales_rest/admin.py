from django.contrib import admin
from .models import AutomobileVO, Customer, SaleRecord, SellerPerson
# Register your models here.


@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass


@admin.register(SaleRecord)
class SaleRecordAdmin(admin.ModelAdmin):
    pass


@admin.register(SellerPerson)
class SalerPersonAdmin(admin.ModelAdmin):
    pass