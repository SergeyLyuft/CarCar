import { useState, useEffect } from 'react';

function AppointmentList() {
  
  let [aList, setAList] = useState({appointments: []})

  let [id, setId] = useState('')

  async function fetchAppointments() {
    const res = await fetch('http://localhost:8080/api/appointments/')
    const newAList = await res.json()
    setAList(newAList)
  }
  useEffect(() => {fetchAppointments()}, [id])
  console.log(aList)

  async function deleteAppt(id) {
    const url = `http://localhost:8080/api/appointment/${id}/`

    const fetchConfig = {
      method: "delete",
    };
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      console.log("appointment successfully canceled")
    }
    else {
      alert("invalid appointment id")
    }
    setId(id)
  }
  async function update(id) {
    const data = {"completed": true}
    const url = `http://localhost:8080/api/appointment/${id}/`
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
      'Content-Type': 'application/json',
      },
    };
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      console.log("appointment successfully completed")
    }
    else {
      alert("invalid appointment id")
    }
    setId(id)
  }
    return (
        <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Customer name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
        {aList.appointments.filter((x) => x["completed"] === false).map(appointment => {
        return (
       <tr key={appointment.id}>
         <td>{ appointment.vin }</td>
         <td>{ appointment.customer_name }</td>
         <td>{ appointment.date_revised }</td>
         <td>{ appointment.time }</td>
         <td>{ appointment.technician.name }</td>
         <td>{ appointment.reason }</td>
         <td><button onClick={() => deleteAppt(appointment.id)}>cancel</button></td>
         <td><button onClick={() => update(appointment.id)}>finish</button></td>
       </tr>
          );
           })}
        </tbody>
      </table>
    );
}

export default AppointmentList;