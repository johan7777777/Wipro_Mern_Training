import React from 'react';
import { NavLink } from 'react-router-dom';

function Menu() {
  return (
    <div>
      <h3>NavLink Menu</h3>
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active">
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeClassName="active">
            Contact Us
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Menu;