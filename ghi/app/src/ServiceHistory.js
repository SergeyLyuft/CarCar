import {useState} from 'react'
import {useRef} from 'react'
import {useEffect} from 'react'


const getFilteredItems = (query, items) => {
    if (!query) {
        return items
    }
    return items.filter(appt => appt.vin.includes(query))
}

function ServiceHistory() {

    let [aList, setAList] = useState({appointments: []})


    async function fetchAppointments() {
      const res = await fetch('http://localhost:8080/api/appointments/')
      const newAList = await res.json()
      setAList(newAList)
    }
    useEffect(() => {fetchAppointments()}, [])
    console.log(aList)
    
    const inputRef = useRef('')
    const [query, setQuery] = useState('')
    const items = aList.appointments

    const filteredItems = getFilteredItems(query, items)

    return (
        <div className="container">
            <h1>Enter the VIN number of the vehicle you are searching for</h1>
            <form onSubmit={(e) => { e.preventDefault(); setQuery(inputRef.current.value)}}>
            <label>Search</label>
            <input type="text" ref={inputRef} />
            <button>Search VIN</button>
            </form>
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
        {filteredItems.map(appointment => {
        return (
       <tr key={appointment.id}>
         <td>{ appointment.vin }</td>
         <td>{ appointment.customer_name }</td>
         <td>{ appointment.date_revised }</td>
         <td>{ appointment.time }</td>
         <td>{ appointment.technician.name }</td>
         <td>{ appointment.reason }</td>
       </tr>
          );
           })}
        </tbody>
      </table>
        </div>
    )
}

export default ServiceHistory;