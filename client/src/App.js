import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home } from './pages/home';
import {CreateRecipe} from './pages/createRecipe';
import {Auth} from './pages/auth';
import {SavedRecipes} from './pages/savedRecipes';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/' element={<Auth />} />
          <Route path='/' element={<CreateRecipe />} />
          <Route path='/' element={<SavedRecipes />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
