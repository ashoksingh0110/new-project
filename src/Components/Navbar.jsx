import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {

  return (
    <nav className="navbar navbar-expand-lg bg-success sticky-top">
      <Link className="navbar-brand text-light" to="#">NewProject</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item text-light active">
            <Link className="nav-link text-light" to="/">Home</Link>
          </li>
          <li className="nav-item text-light active">
            <Link className="nav-link text-light" to="/addUser"><button style={{backgroundColor:"yellow",color:"black",padding:"5px",border:"none",borderRadius:"20px"}}>Add New User</button></Link>
          </li>
        </ul>
        <input className="form-control me-2 w-50" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-light text-light bg-success" type="submit">Search</button>
      </div>
    </nav>
  )
}
