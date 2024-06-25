 
import { Link, Navigate, Outlet } from 'react-router-dom';
import './App.css';

import StudentForm from './component.js/StudentForm';

function App() {
 

  return (
   <div>

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className='container'>
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
      
      <Link to='/student-form' className="nav-link"> Student Form </Link>
 
      </li>
      <li className="nav-item">
        <Link to='/student-details' className="nav-link"> Student Details </Link>
        
      </li> 
    </ul> 
  </div>
  </div>
</nav>

  <Outlet></Outlet>
    </div>
  );
}

export default App;
