import React from 'react';

class SalespersonHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seller:'',
            sellers: [],
            salerecords:[],
        };
        this.handleChange= this.handleChange.bind(this);
    }

    async componentDidMount() {
        const sellersUrl = "http://localhost:8090/api/sellers/"
        const salesUrl = "http://localhost:8090/api/sales/"
        const sellerResponse = await fetch(sellersUrl)
        const salesResponse = await fetch(salesUrl)
        if (sellerResponse.ok) {
            const sellersData = await sellerResponse.json();
            this.setState({ sellers: sellersData.salers })

        }
        if (salesResponse.ok) {
            const salesData = await salesResponse.json();
            this.setState({ salerecords: salesData.sales })

        }
    }
    handleChange(event) {
        const value = parseInt(event.target.value);
        this.setState({ seller:value })
    }

    render () {
        return (
            <>           
                <h1>Find sales history</h1>
                <div className="mb-3">
                <select onChange={this.handleChange} value={this.state.seller} name="seller" required id="seller" className="form-select">
                    <option value="">Choose a seller to see sale history</option>
                    {this.state.sellers.map(seller => {
                        return (
                            <option key={seller.employee_id} value={seller.employee_id}>{seller.name}</option>
                        );
                    })}
                </select>
                </div>
                
                <table className = "table table-warning table-hover">
                    <thead>
                        <tr>
                            <th>Seller</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Sale price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.salerecords.map(salerecord => {
                            if (salerecord.seller.employee_id === this.state.seller) {
                                return (
                                    <tr key = {salerecord.vin.vin}>
                                        <td>{ salerecord.seller.name }</td>
                                        <td>{ salerecord.customer.name }</td>
                                        <td>{ salerecord.vin.vin }</td>
                                        <td>${ salerecord.price }</td>
                                    </tr>
                                );
                            }
                        })}
                            
                    </tbody>
                </table>
            </>
        );
    }
}

export default SalespersonHistory;
