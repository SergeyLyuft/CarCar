from django.urls import path
from .views import api_list_appointments, api_list_dealer_cars, api_show_appointment, api_list_technicians


urlpatterns = [
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("cars/", api_list_dealer_cars, name="api_list_dealer_cars"),
    path("appointment/<int:pk>/", api_show_appointment, name="api_show_appointment"),
    path("technicians/", api_list_technicians, name="api_list_appointments"),
]



