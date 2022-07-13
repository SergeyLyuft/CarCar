import json
from django.http import JsonResponse
from common.json import ModelEncoder
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import SaleRecord, SellerPerson, AutomobileVO, Customer
# Create your views here.


class SellerPersonEncoder(ModelEncoder):
    model = SellerPerson
    properties = [ "name", "employee_id"]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [ "id", "name", "address", "phone_number"]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["color", "year", "vin", "status"]


class SaleRecordEncoder(ModelEncoder):
    model = SaleRecord
    properties = [ "price", "vin", "seller", "customer"]
    encoders = {
        "vin": AutomobileVOEncoder(),
        "customer":CustomerEncoder(),
        "seller":SellerPersonEncoder(),
    }


@require_http_methods(["GET", "POST"])
def sales_list(request):
    if request.method == "GET":
        sales = SaleRecord.objects.all()
        return JsonResponse(
            {'sales': sales},
            encoder=SaleRecordEncoder,
        )
    else:
        content = json.loads(request.body)
        # try:
        vin = AutomobileVO.objects.get(vin = content["vin"])
        content["vin"] = vin
        # except AutomobileVO.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Invalid automobile id"},
        #         status=400,
        #     )
        # try:
        customer = Customer.objects.get(id = content["customer"])
        content["customer"] = customer
        # except Customer.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Invalid customer number"},
        #         status=400,
        #     )
        # try:
        seller = SellerPerson.objects.get(name = content["seller"])
        content["seller"] = seller
        # except SellerPerson.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Invalid saler id"},
        #         status=400,
        #     )
        
        sales = SaleRecord.objects.create(**content)
        return JsonResponse(
            sales,
            encoder=SaleRecordEncoder,
            safe=False,
        )



@require_http_methods(["GET","DELETE", "PUT"])
def sale_details(request, pk):
    if request.method == "DELETE":
        try:
            sale = SaleRecord.objects.get(id=pk).delete()
            return JsonResponse(sale, encoder=SaleRecordEncoder, safe = False)   
        except SaleRecord.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid sale id"},
                status=404,
            )
    elif request.method == "GET":
        try:
            sale = SaleRecord.objects.get(id=pk)
            return JsonResponse(sale, encoder=SaleRecordEncoder, safe = False)
        except SaleRecord.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid sale id"},
                status=404,
            )
    else:
        try:
            content = json.loads(request.body)
            sale = SaleRecord.objects.get(id=pk)
            props = ["price"]
            for prop in props:
                if prop in content:
                    setattr(sale, prop, content[prop])
            sale.save()
            return JsonResponse(sale, encoder=SaleRecordEncoder, safe = False)
        except SaleRecord.DoesNotExist:
            return JsonResponse(
                {"message": "Sale doesn't exist"},
                status=404,
            )


@require_http_methods(["GET", "POST"])
def customers_list(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(customer, encoder=CustomerEncoder, safe = False)



@require_http_methods(["GET","DELETE", "PUT"])
def customer_details(request, pk):
    if request.method == "GET":
        customer = Customer.objects.get(id=pk)
        return JsonResponse(customer, encoder=CustomerEncoder, safe = False)
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=pk).delete()
            return JsonResponse(customer, encoder=CustomerEncoder, safe = False) 
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer doesn't exist"},
                status = 404,
            )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(id=pk)
            props = ["name", "address", "phone_number"]
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            customer.save()
            return JsonResponse(customer, encoder=CustomerEncoder, safe = False)
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer doesn't exist"},
                status = 404,
            )


@require_http_methods(["GET", "POST"])
def employees_list(request):
    if request.method == "GET":
        salers = SellerPerson.objects.all()
        return JsonResponse(
            {"salers": salers},
            encoder=SellerPersonEncoder,
        )
    else:
        content = json.loads(request.body)
        saler = SellerPerson.objects.create(**content)
        return JsonResponse(saler, encoder=SellerPersonEncoder, safe = False)


@require_http_methods(["GET","DELETE", "PUT"])
def employee_details(request, pk):
    if request.method == "GET":
        saler = SellerPerson.objects.get(id=pk)
        return JsonResponse(saler, encoder=SellerPersonEncoder, safe = False)
    elif request.method == "DELETE":
        try:            
            saler = SellerPerson.objects.get(id=pk).delete()
            return JsonResponse(saler, encoder=SellerPersonEncoder, safe = False) 
        except SellerPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Saler doesn't exist"},
                status = 404,
            )
    else:
        try:
            content = json.loads(request.body)
            saler = SellerPerson.objects.get(id=pk)
            props = ["name", "employee_id"]
            for prop in props:
                if prop in content:
                    setattr(saler, prop, content[prop])
            saler.save()
            return JsonResponse(saler, encoder=SellerPersonEncoder, safe = False) 
        except SellerPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Saler doesn't exist"},
                status = 404,
            )






