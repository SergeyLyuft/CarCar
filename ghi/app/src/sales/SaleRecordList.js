import React from "react";

class SalesRecordList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sales: [],
    }
  }

  async componentDidMount() {
    const url = 'http://localhost:8090/api/sales/'
    const response = await fetch(url) 
    if (response.ok) {
        const data = await response.json();
        this.setState({sales: data.sales})
    }
  }

  render() {
    return (
      <div>
        <table className="table table-striped">
            <thead>
              <tr>
                <th>Seller name</th>
                <th>Seller number</th>
                <th>Customer</th>
                <th>Vin</th> 
                <th>Price</th>                              
              </tr>
            </thead>
            <tbody>
              {this.state.sales.map(sale => {
                return (
                  <tr key={ sale.vin.vin }>
                    <td>{ sale.seller.name }</td>
                    <td>{ sale.seller.employee_id }</td>
                    <td>{ sale.customer.name }</td>                    
                    <td>{ sale.vin.vin }</td>
                    <td>{ sale.price }</td>                                           
                  </tr>
                );
              })}
            </tbody>
        </table>
      </div>
    );
  }

}




    




export default SalesRecordList