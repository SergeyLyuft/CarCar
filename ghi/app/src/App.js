import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import CreateAutomobile from "./Inventory/AutomobileForm"
import CreateVehicleModel from "./Inventory/VehicleModelForm"
import ListAutomobile from "./Inventory/AutomobileList"
import Nav from './Nav';
import SaleRecordForm from "./sales/SaleRecordForm"
import SalesRecordList from "./sales/SaleRecordList"
import CustomerForm from "./sales/CustomerForm"
import EmployeeForm from "./sales/EmployeeForm"
import SalespersonHistory from "./sales/SellerSaleList"
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';
import TechnicianForm from './TechnicianForm';
import ServiceHistory from './ServiceHistory';
import ManufacturerForm from './ManufacturerForm';
import ManufacturerList from './ManufacturerList';
import ModelList from './ModelList';
import React from 'react';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="sales">
            <Route path="new" element={<SaleRecordForm />} />
            <Route path="" element={<SalesRecordList />} />     
          </Route>
          <Route path="customers">
            <Route path="new" element={<CustomerForm />} />
          </Route>
          <Route path="sellers">
            <Route path="new" element={<EmployeeForm />} />
            <Route path="history" element={<SalespersonHistory />} />
          </Route>
          <Route path="automobiles">
            <Route path="new" element={<CreateAutomobile />} />
            <Route path="list" element={<ListAutomobile />} />
          </Route>
          <Route path="vehicles">
            <Route path="new" element={<CreateVehicleModel />} />
          </Route>
          <Route path="appointments" element={<AppointmentList />} />
          <Route path="manufacturers" element={<ManufacturerList />} />
          <Route path="models" element={<ModelList />} />
          <Route path="appointments">
            <Route path="new" element={<AppointmentForm />} />
            </Route>
            <Route path="technicians">
            <Route path="new" element={<TechnicianForm />} />
            </Route>
            <Route path="servicehistory" element={<ServiceHistory />} /> 
            <Route path="manufacturers">
            <Route path="new" element={<ManufacturerForm />} />
            </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
