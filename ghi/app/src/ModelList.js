import { useState, useEffect } from 'react';

function ModelList() {
  let [mList, setMList] = useState({models: []})

  async function fetchModels() {
    const res = await fetch('http://localhost:8100/api/models/')
    const newMList = await res.json()
    setMList(newMList)
  }
  useEffect(() => {fetchModels()}, [])
  console.log(mList)
      return (
          <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
          {mList.models.map(model => {
          return (
         <tr key={model.id}>
           <td>{ model.name }</td>
           <td>{ model.manufacturer.name }</td>
           <td><img alt='' src={model.picture_url} className="card-img-top" /></td>
         </tr>
            );
             })}
          </tbody>
        </table>
      );
  }
  
  export default ModelList;