import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="sales/">Sales</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="sales/new">Create a sale</NavLink> 
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="customers/new">Create a customer</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link" to="sellers/new">Create an employee</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link" to="sellers/history">Employee sales</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link" to="automobiles/new">Create an automobile</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link" to="automobiles/list">Automobiles</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link" to="vehicles/new">Create a Model</NavLink>
          </li>
          <li>
              <NavLink className="nav-link" aria-current="page" to="/technicians/new">New Technician</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/appointments/new">New appointment</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/appointments">Appointments</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/servicehistory">Service History</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/manufacturers/new">New Manufacturer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/manufacturers">Manufacturers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/models">Models</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}










export default Nav;
