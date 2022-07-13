import React from 'react';

class ManufacturerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
          };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        console.log(data);

        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };
       const response = await fetch(manufacturerUrl, fetchConfig);
       if (response.ok) {
        const newManufacturer = await response.json();
        console.log(newManufacturer);

        const cleared = {
          name: '',
          };
          this.setState(cleared);
       }
       }
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value})
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
                <h1 className="card-title">Register a Manufacturer here</h1>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input required onChange={this.handleNameChange} value={this.state.name} placeholder="Name" type="text" id="name" name="name" className="form-control" />
                      <label htmlFor="name">Name</label>
                    </div>
                  </div>
                </div>
                <button className="btn btn-lg btn-primary">Register Manufacturer</button>
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
export default ManufacturerForm;