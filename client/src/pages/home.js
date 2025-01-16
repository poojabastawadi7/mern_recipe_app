import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
import { useCookies } from 'react-cookie';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userID = useGetUserID(); 
    const [cookies, _] = useCookies(["access_token"])
  

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('/recipes'); 
        setRecipes(response.data);
      } catch (err) {
        setError('Failed to fetch recipes. Please try again.');
      } finally {
        setLoading(false);
      }
    };


    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(`/recipes/savedRecipes/ids/${userID}`); 
        setSavedRecipes(response.data.savedRecipes);
        console.log(savedRecipes);
        
      } catch (err) {
        setError('Failed to fetch recipes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
    if(cookies){
    fetchSavedRecipes();
    }
  }, []);

 

  if (loading) {
    return <div>Loading recipes...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put('/recipes', {recipeID, userID},
        {headers : {
          authorization : cookies.access_token
        }}
      ); 
      setSavedRecipes(response.data.savedRecipes)
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const isRecipeSaved = (id) => savedRecipes.includes(id)
  

  return (
    <div className="container mt-5">
      <h2>Recipes List</h2>
      {recipes.length > 0 ? (
        <div className="row">
          {recipes.map((recipe) => (
            <div className="col-md-4 mb-4" key={recipe._id}>
              <div className="card">
                <img
                  src={recipe.imageUrl}
                  className="card-img-top"
                  alt={recipe.name}
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">
                    <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
                  </p>
                  <p className="card-text">
                    <strong>Ingredients:</strong>
                    <ul>
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </p>
                  <button className="btn btn-primary" onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
                    {isRecipeSaved(recipe._id) ? "Saved" : "Save"}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default Home;
