import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => (
  <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
    <h3>{recipe.title}</h3>
    <p>{recipe.description?.slice(0, 100)}...</p>
    <Link to={`/recipes/${recipe._id}`}>View Details</Link>
  </div>
);

export default RecipeCard;
