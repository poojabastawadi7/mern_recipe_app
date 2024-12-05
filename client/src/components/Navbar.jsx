import React from 'react'
import { Link } from 'react-router';
import "./Navbar.css"

const Navbar = () => {
  return (
    
    <div className='navbar'>
    <Link to="/" >Home</Link>
    <Link to="/auth">Auth</Link>
    <Link to="/create-recipe" >AddRecipe</Link>
    <Link to="/saved-recipes" >Recipes</Link>

    
    </div>
  )
}

export default Navbar
