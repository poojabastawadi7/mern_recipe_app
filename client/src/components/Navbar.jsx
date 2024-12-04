import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    
    <>
    <Link to="/" >Home</Link>
    <Link to="/auth">Auth</Link>
    <Link to="/create-recipe" >AddRecipe</Link>
    <Link to="/saved-recipes" >Recipes</Link>

    
    </>
  )
}

export default Navbar
