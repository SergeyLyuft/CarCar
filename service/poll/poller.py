import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here.
import service_rest.models
# from service_rest.models import Something
from service_rest.models import DealershipAutoMobilesVO

def get_cars():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    for car in content["autos"]:
        DealershipAutoMobilesVO.objects.update_or_create(
            vin=car["vin"],
            defaults={"vin": car["vin"], "year": car["year"]},
        )

def poll():
    while True:
        print('Service poller polling for data')
        try:
            get_cars()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
