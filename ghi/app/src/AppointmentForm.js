import React from 'react';

class AppointmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vin: '',
            customer_name: '',
            date_revised: '',
            time: '',
            reason: '',
            technicians: []
          };
        this.handleTechnicianChange = this.handleTechnicianChange.bind(this);
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleCustomerNameChange = this.handleCustomerNameChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.technicians;
        console.log(data);

        const appointmentUrl = 'http://localhost:8080/api/appointments/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };
       const response = await fetch(appointmentUrl, fetchConfig);
       if (response.ok) {
        const newAppointment = await response.json();
        console.log(newAppointment);

        const cleared = {
          vin: '',
          customer_name: '',
          date_revised: '',
          time: '',
          reason: '',
          technician: '',
          };
          this.setState(cleared);
       }
       }
    handleVinChange(event) {
        const value = event.target.value;
        this.setState({vin: value})
      }
    handleCustomerNameChange(event) {
        const value = event.target.value;
        this.setState({customer_name: value})
    }
    handleDateChange(event) {
        const value = event.target.value;
        this.setState({date_revised: value})
    }
    handleReasonChange(event) {
        const value = event.target.value;
        this.setState({reason: value})
    }
    handleTechnicianChange(event) {
        const value = event.target.value;
        this.setState({technician: value})
    }
    handleTimeChange(event) {
      const value = event.target.value;
      this.setState({time: value})
  }
    async componentDidMount() {
        const url = 'http://localhost:8080/api/technicians/';
    
        const response = await fetch(url);
    
        if (response.ok) {
          const data = await response.json();
          this.setState({technicians: data.technicians});
          console.log("technicians successfully fetched")
          
        }
        else {
          console.log("error")
        }
    }
  render() {
    let spinnerClasses = 'd-flex justify-content-center mb-3';
    let dropdownClasses = 'form-select d-none';
    if (this.state.technicians.length > 0) {
     spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
     dropdownClasses = 'form-select';
     }
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
                <h1 className="card-title">Register an appointment here</h1>
                <p className="mb-3">
                  Choose a technician
                </p>
                <div className={spinnerClasses} id="loading-conference-spinner">
                  <div className="spinner-grow text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
                <div className="mb-3">
                  <select name="technician" onChange={this.handleTechnicianChange} value={this.state.technician} required id="technician" className={dropdownClasses}>
                    <option value="">Choose a technician</option>
                    {this.state.technicians.map(technician => {
                   return (
                    <option key={technician.employee_number} value={technician.employee_number}>
                     {technician.name}
                    </option>
                          );
                      })}
                  </select>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input required onChange={this.handleCustomerNameChange} value={this.state.customer_name} placeholder="Customer name" type="text" id="customer_name" name="customer_name" className="form-control" />
                      <label htmlFor="customer_name">Customer Name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input required onChange={this.handleVinChange} value={this.state.vin} placeholder="VIN Number" type="text" id="vin" name="vin" className="form-control" />
                      <label htmlFor="vin">VIN number</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input required onChange={this.handleDateChange} value={this.state.date_revised} placeholder="Date" type="date" id="date_revised" name="date_revised" className="form-control" />
                      <label htmlFor="date_revised">Appointment Date</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input required onChange={this.handleTimeChange} value={this.state.time} placeholder="Time" type="time" id="time" name="time" className="form-control" />
                      <label htmlFor="time">Appointment Time</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input required onChange={this.handleReasonChange} value={this.state.reason} placeholder="Reason" type="text" id="reason" name="reason" className="form-control" />
                      <label htmlFor="reason">Reason for Appointment</label>
                    </div>
                  </div>
                </div>
                <button className="btn btn-lg btn-primary">Register Appointment</button>
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

export default AppointmentForm;