import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/home';
import CreateRecipe from './pages/createRecipe';
import {Auth} from './pages/auth';
import SavedRecipes from './pages/savedRecipes';
import Navbar from './components/Navbar';
import Login from './components/Login';

function App() {
    
  
  return (
    <>
      <Router>
      
      <Navbar />
      <div className="container mt-4">

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/create-recipe' element={<CreateRecipe />} />
          <Route path='/saved-recipes' element={<SavedRecipes />} />
          <Route path='/login' element={<Login />} />

        </Routes>
      </div>
      </Router>
    </>
  );
}

export default App;
