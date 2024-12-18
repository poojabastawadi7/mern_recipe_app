import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home } from './pages/home';
import {CreateRecipe} from './pages/createRecipe';
import {Auth} from './pages/auth';
import {SavedRecipes} from './pages/savedRecipes';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Router>
      
      <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/create-recipe' element={<CreateRecipe />} />
          <Route path='/saved-recipes' element={<SavedRecipes />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
