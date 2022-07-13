import React from 'react';

class TechnicianForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employee_number: '',
          };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        console.log(data);

        const technicianUrl = 'http://localhost:8080/api/technicians/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };
       const response = await fetch(technicianUrl, fetchConfig);
       if (response.ok) {
        const newTechnician = await response.json();
        console.log(newTechnician);

        const cleared = {
            name: '',
            employee_number: '',
          };
          this.setState(cleared);
       }
       }
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value})
      }
    handleEmployeeNumberChange(event) {
        const value = event.target.value;
        this.setState({employee_number: value})
    }
    render() {
    return (
        <div className="my-5">
      <div className="row">
        <div className="col col-sm-auto">
          <img width="300" alt="" className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" />
        </div>
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <form id="create-technician-form" onSubmit={this.handleSubmit}>
                <h1 className="card-title">Register a technician here!</h1>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input required onChange={this.handleNameChange} value={this.state.name} placeholder="Your full name" type="text" id="name" name="name" className="form-control" />
                      <label htmlFor="name">Technician name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input required onChange={this.handleEmployeeNumberChange} value={this.state.employee_number} placeholder="Your email address" type="number" id="employee_number" name="employee_number" className="form-control" />
                      <label htmlFor="employee_number">Employee Number</label>
                    </div>
                  </div>
                </div>
                <button className="btn btn-lg btn-primary">Register</button>
              </form>
              <div className="alert alert-success d-none mb-0" id="success-message">
                Congratulations! You're all signed up!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
}
export default TechnicianForm;