# CarCar

Team:

* Person 1 - Which microservice? A: Kervin Clenance, I worked on the service microservice. In inventory, I worked on the manufacturer form and list as well as the model list.
* Sergey Lyuft - Worked with sale microservice. In Inventory worked with automobile and model form, and with automobiles list.


## Design
We will generate all pages on 1 page, it means that we have a SPA(single page application). We add all links to different pages in our navbar.With a smaller size of page, all link will be inside of dropdown menu.

## Service microservice

I integrated with the automobile model in inventory and used a polling feature to transfer instances of automobiles in inventory into my own automobilesVO model in the service microservice. I also created models for appointments and technicians and used a foreign key relationship to connect my technicians(one) to my appointments(many). Using these three models I was able to successfully define a bounded autoservice context and provide an effective solution to the problem domain.

## Sales microservice

I created models for "Customer", "SellerPerson", "AutomobileVO" and "Salerecord". AutomobileVO represents integration with the "inventory" microservice. Cause every microservice is a bounded context, we have to prevent chance to change inventory data within our sale data, we have to create Automobile value object. New value object has access to get inventory data via polling, but can not change this data.Polling system periodically checks the inventory, and update data for consumer.
SaleRecord is a more complex model,because it has relationships to 3 different models. Seller field has one-to-many relationship, because sale record can have only one seller.The same situation with customer field, cause every sale record can have only 1 customer.I set PROTECT for delete option in all 3 field, cause i think we have to keep all data if we want to delete piece of data. 
Also I created from for seller, customer, sale record, automobile, and model. And list pages for automobiles,sellers and sale records.
