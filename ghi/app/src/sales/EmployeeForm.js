import React from 'react';

class EmployeeForm extends React.Component {
    async
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employeeId: ''
          };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeIdChange = this.handleEmployeeIdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
}
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value})
    }
    handleEmployeeIdChange(event) {
        const value = event.target.value;
        this.setState({employeeId: value})
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.employee_id = data.employeeId;
        delete data.employeeId;

        const selerUrl = "http://localhost:8090/api/sellers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
        };
        const response = await fetch(selerUrl, fetchConfig);
        if (response.ok) {
            const newEmployee = await response.json();
            const cleared = {
                name: '',
                employeeId: ''
            };
            this.setState(cleared);
            }
        }
        render() {
            return (
                <div className="row">
                <div className="offset-3 col-6">
                  <div className="shadow p-4 mt-4">
                    <h1>Create a new Employee</h1>
                    <form onSubmit={this.handleSubmit} id="create-customer-form">                  
                      <div className="form-floating mb-3">
                        <input value={this.state.name} onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                        <label htmlFor="name">Name</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input value={this.state.employeeId} onChange={this.handleEmployeeIdChange} placeholder="Employee Id" required type="text" name="employeeId" id="employeeId" className="form-control" />
                        <label htmlFor="employeeId">Employee Id</label>
                      </div> 
                      <button className="btn btn-success">Add Employee</button>
                    </form>
                  </div>
                </div>
              </div>
            );
          }

}

export default EmployeeForm