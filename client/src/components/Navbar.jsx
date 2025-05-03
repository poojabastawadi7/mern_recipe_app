import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ display: 'flex', gap: '10px', padding: '10px', background: '#eee' }}>
    <Link to="/">Home</Link>
    <Link to="/recipes">Recipes</Link>
    <Link to="/add">Add Recipe</Link>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </nav>
);

export default Navbar;
