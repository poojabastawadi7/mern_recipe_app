import React, { useState } from 'react';
import axios from "axios"
import { useGetUserID } from '../hooks/useGetUserID';
import InputField from '../components/InputField';
import { useCookies } from "react-cookie";

// const InputField = ({ id, name, label, type, value, onChange, error }) => {
//   return (
//     <div className="mb-3">
//       <label htmlFor={id} className="form-label">{label}</label>
//       <input
//         type={type}
//         id={id}
//         name={name}
//         className="form-control"
//         value={value}
//         onChange={onChange}
//       />
//       {error && <div className="text-danger">{error}</div>}
//     </div>
//   );
// };

const CreateRecipeForm = () => {
  const userID = useGetUserID()
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    ingredients: [],
    instructions: '',
    cookingTime: '',
    userOwner: userID
  });

  const [errors, setErrors] = useState({});
  const [cookies, _] = useCookies(["access_token"])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      ingredients: updatedIngredients
    }));
  };

  const addIngredientField = () => {
    setFormData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, '']
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.imageUrl) newErrors.imageUrl = 'Image URL is required';
    if (formData.ingredients.length === 0 || formData.ingredients.some((ingredient) => !ingredient)) {
      newErrors.ingredients = 'All ingredients are required';
    }
    if (!formData.instructions) newErrors.instructions = 'Instructions are required';
    if (!formData.cookingTime || isNaN(formData.cookingTime)) {
      newErrors.cookingTime = 'Cooking time must be a number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/recipes", formData,
        {headers : {
          authorization : cookies.access_token
        }}
      );
      alert("Recipe created")
    } catch (error) {
      throw new Error(error)
    }
    if (validate()) {
      console.log('Form Submitted', formData);
      alert('Recipe created successfully!');
      setFormData({ name: '', imageUrl: '', ingredients: [], instructions: '', cookingTime: '' });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="container mt-5" style={{ width: '50%' }}>
        <h2>Create Recipe</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            id="name"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          <InputField
            id="imageUrl"
            name="imageUrl"
            label="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            error={errors.imageUrl}
          />

          <div className="mb-3">
            <label htmlFor="ingredients" className="form-label">Ingredients</label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="mb-2 d-flex">
                <InputField
                  id={`ingredient-${index}`}
                  name={`ingredient-${index}`}
                  type="text"
                  label={`Ingredient ${index + 1}`}
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                />
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={addIngredientField}>Add Ingredient</button>
            {errors.ingredients && <div className="text-danger mt-2">{errors.ingredients}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="instructions" className="form-label">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              className="form-control"
              rows="5"
              value={formData.instructions}
              onChange={handleChange}
            ></textarea>
            {errors.instructions && <div className="text-danger">{errors.instructions}</div>}
          </div>

          <InputField
            id="cookingTime"
            name="cookingTime"
            label="Cooking Time (in minutes)"
            type="number"
            value={formData.cookingTime}
            onChange={handleChange}
            error={errors.cookingTime}
          />

          <button type="submit" className="btn btn-primary">Create Recipe</button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipeForm;



// import React, { useState } from 'react';

// const CreateRecipe = () => {
//   const [recipe, setRecipe] = useState({
//     name: '',
//     imageUrl: '',
//     ingredients: [],
//     instructions: '',
//     cookingTime: 0,
//     userOwner: 0,
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setRecipe((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleIngredientChange = (index, value) => {
//     const updatedIngredients = [...recipe.ingredients];
//     updatedIngredients[index] = value;
//     setRecipe((prevData) => ({
//       ...prevData,
//       ingredients: updatedIngredients
//     }));
//     console.log(recipe);
    
//   };

//   const addIngredientField = () => {
//     setRecipe((prevData) => ({
//       ...prevData,
//       ingredients: [...prevData.ingredients, '']
//     }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!recipe.name) newErrors.name = 'Name is required';
//     if (!recipe.imageUrl) newErrors.imageUrl = 'Image URL is required';
//     if (!recipe.ingredients) newErrors.ingredients = 'Ingredients are required';
//     if (!recipe.instructions) newErrors.instructions = 'Instructions are required';
//     if (!recipe.cookingTime || isNaN(recipe.cookingTime)) {
//       newErrors.cookingTime = 'Cooking time must be a number';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       console.log('Form Submitted', recipe);
//       alert('Recipe created successfully!');
//       setRecipe({ name: '', imageUrl: '', ingredients: [], instructions: '', cookingTime: '' });
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//       <div className="container mt-5" style={{ width: '50%' }}>
//       <h2>Create Recipe</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             className="form-control"
//             value={recipe.name}
//             onChange={handleChange}
//           />
//           {errors.name && <div className="text-danger">{errors.name}</div>}
//         </div>

//         <div className="mb-3">
//           <label htmlFor="imageUrl" className="form-label">Image URL</label>
//           <input
//             type="text"
//             id="imageUrl"
//             name="imageUrl"
//             className="form-control"
//             value={recipe.imageUrl}
//             onChange={handleChange}
//           />
//           {errors.imageUrl && <div className="text-danger">{errors.imageUrl}</div>}
//         </div>

//         <div className="mb-3">
//             <label htmlFor="ingredients" className="form-label">Ingredients</label>
//             {recipe.ingredients.map((ingredient, index) => (
//               <div key={index} className="mb-2 d-flex">
//                 <input
//                   type="text"
//                   className="form-control me-2"
//                   value={ingredient}
//                   onChange={(e) => handleIngredientChange(index, e.target.value)}
//                 />
//               </div>
//             ))}
//             <button type="button" className="btn btn-secondary mx-2" onClick={addIngredientField}>Add Ingredient</button>
//             {errors.ingredients && <div className="text-danger mt-2">{errors.ingredients}</div>}
//           </div>


//         <div className="mb-3">
//           <label htmlFor="instructions" className="form-label">Instructions</label>
//           <textarea
//             id="instructions"
//             name="instructions"
//             className="form-control"
//             rows="5"
//             value={recipe.instructions}
//             onChange={handleChange}
//           ></textarea>
//           {errors.instructions && <div className="text-danger">{errors.instructions}</div>}
//         </div>

//         <div className="mb-3">
//           <label htmlFor="cookingTime" className="form-label">Cooking Time (in minutes)</label>
//           <input
//             type="number"
//             id="cookingTime"
//             name="cookingTime"
//             className="form-control"
//             value={recipe.cookingTime}
//             onChange={handleChange}
//           />
//           {errors.cookingTime && <div className="text-danger">{errors.cookingTime}</div>}
//         </div>

//         <button type="submit" className="btn btn-primary">Create Recipe</button>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default CreateRecipe;

