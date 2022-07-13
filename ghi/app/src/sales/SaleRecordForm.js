import React from 'react';

class SaleRecordForm extends React.Component {
    async
    constructor(props) {
        super(props)
        this.state = {
            price: '',
            customer: '',
            vin: '',
            seller: '',
            customers: [],
            vins: [],
            sellers: []
          };
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleSellerChange = this.handleSellerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
}
    handlePriceChange(event) {
        const value = event.target.value;
        this.setState({price: value})
    }
    handleCustomerChange(event) {
        const value = event.target.value;
        this.setState({customer: value})
    }
    handleVinChange(event) {
        const value = event.target.value;
        this.setState({vin: value})
    }
    handleSellerChange(event) {
        const value = event.target.value;
        this.setState({seller: value})
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.customers;
        delete data.vins;
        delete data.sellers;
        delete data.sales;
        

        const salerecordUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
        };

        const responseSaleRecord = await fetch(salerecordUrl, fetchConfig);
        if (responseSaleRecord.ok) {
          const cleared = {
            price: '',
            customer: '',
            vin: '',
            seller: '',
        };
        this.setState(cleared);

        const salesUrl = 'http://localhost:8090/api/sales/';        
        const responseSales = await fetch(salesUrl);        
        if (responseSales.ok) {
          const data = await responseSales.json();
          this.setState({sales: data.sales.map(sale => sale.vin.vin)});
        }

        const automobilesUrl = 'http://localhost:8100/api/automobiles/';        
        const responseAuto = await fetch(automobilesUrl);        
          if (responseAuto.ok) {
            const data = await responseAuto.json();
            this.setState({vins: data.autos.map(auto => {return (auto.vin)})});
          }
        const sales = this.state.vins.filter(vin => !this.state.sales.includes(vin))
        
        }
        }
        async componentDidMount() {

            const customersUrl = 'http://localhost:8090/api/customers/';        
            const responseCustomers = await fetch(customersUrl);        
            if (responseCustomers.ok) {
              const data = await responseCustomers.json();
              this.setState({customers: data.customers});
            }

            const employeesUrl = 'http://localhost:8090/api/sellers/';        
            const responseEmployees = await fetch(employeesUrl);        
            if (responseEmployees.ok) {
              const data = await responseEmployees.json();
              this.setState({sellers: data.salers.map(seller => seller.name)});
            }

            const salesUrl = 'http://localhost:8090/api/sales/';        
            const responseSales = await fetch(salesUrl);        
            if (responseSales.ok) {
              const data = await responseSales.json();
              this.setState({sales: data.sales.map(sale => sale.vin.vin)});
            }

            const automobilesUrl = 'http://localhost:8100/api/automobiles/';        
            const responseAuto = await fetch(automobilesUrl);        
            if (responseAuto.ok) {
              const data = await responseAuto.json();
              this.setState({vins: data.autos.map(auto => {return (auto.vin)})});
            }


          }
        render() {
            return (
                <div className="row">
                <div className="offset-3 col-6">
                  <div className="shadow p-4 mt-4">
                    <h1>Create a new Sale record</h1>
                    <form onSubmit={this.handleSubmit} id="create-customer-form">                  
                      <div className="form-floating mb-3">
                        <input value={this.state.price} onChange={this.handlePriceChange} placeholder="Price" required type="text" name="price" id="price" className="form-control" />
                        <label htmlFor="price">Price</label>
                      </div>
                      <div className="mb-3">
                        <select value={this.state.customer} onChange={this.handleCustomerChange} required id="customer" name="customer" className="form-select">
                            <option value="">Choose a customer</option>
                            {this.state.customers.map(customer => {
                                return (
                                    <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                    </option>
                                );
                            })}
                        </select>
                      </div>
                      <div className="mb-3">
                        <select value={this.state.vin} onChange={this.handleVinChange} required id="vin" name="vin" className="form-select">
                            <option value="">Choose an automobile</option>
                            {this.state.vins.filter(vin => !this.state.sales.includes(vin)).map(vin =>{                              
                                return (
                                    <option key={vin} value={vin}>
                                    {vin}
                                    </option>
                                );                               
                            })}
                        </select>
                      </div>
                      <div className="mb-3">
                        <select value={this.state.seller} onChange={this.handleSellerChange} required id="seller" name="seller" className="form-select">
                            <option value="">Choose a seller</option>
                            {this.state.sellers.map(seller => {
                                return (
                                    <option key={seller} value={seller}>
                                    {seller}
                                    </option>
                                );
                            })}
                        </select>
                      </div>
                      <button className="btn btn-success">Create</button>
                    </form>
                  </div>
                </div>
              </div>
            );
          }
}

export default SaleRecordForm