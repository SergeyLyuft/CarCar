import { useState, useEffect } from 'react';

function ManufacturerList() {
  let [mList, setMList] = useState({manufacturers: []})

  async function fetchManufacturers() {
    const res = await fetch('http://localhost:8100/api/manufacturers/')
    const newMList = await res.json()
    setMList(newMList)
  }
  useEffect(() => {fetchManufacturers()}, [])
  console.log(mList)
      return (
          <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
          {mList.manufacturers.map(manufacturer => {
          return (
         <tr key={manufacturer.id}>
           <td>{ manufacturer.name }</td>
         </tr>
            );
             })}
          </tbody>
        </table>
      );
  }
  
  export default ManufacturerList;