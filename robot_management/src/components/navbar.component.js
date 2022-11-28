import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Robot Management and Tracking</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Deliveries</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Delivery Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/robot" className="nav-link">Create robot</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}