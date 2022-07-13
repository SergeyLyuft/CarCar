from django.urls import path
from .views import sales_list, sale_details, customers_list, customer_details, employee_details, employees_list



urlpatterns = [
    path('sales/', sales_list, name="sales_list"),
    path('sales/<int:pk>', sale_details, name="sale_details"),
    path('customers/', customers_list, name="customers_list"),
    path('customers/<int:pk>', customer_details, name="customer_details"),
    path('sellers/', employees_list, name="employees_list"),
    path('sellers/<int:pk>', employee_details, name="employee_details"), 
]

