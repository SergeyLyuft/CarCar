import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadAppointments() {
  const response = await fetch('http://localhost:8080/api/appointments/');
  //console.log(response);
  if (!response.ok) {
    console.error(response)
  }
  else {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App appointments={data.appointments} />
      </React.StrictMode>
    );
  }
}
loadAppointments();

