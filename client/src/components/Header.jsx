import React, { useEffect, useState } from 'react'

// import { FaSearch } from 'react-icons/fa' ;
import '../App.css' ;
import { Autocomplete, 
         TextField } from '@mui/material'

export default function Header() {

  
  const [movies, setMovies] = useState([]);
  // const [selectedMovie, setSelectedMovie] = useState();

  
const handleChange = () => {

}
  

  
  
  return (
    <>
    <nav className="navbar bg-body-tertiary position-sticky" style={{ maxWidth: "100%"}}>
    <div className="container-fluid bg-primary" style={{paddingLeft:"60px"}}>
    <Link to="/" className="navbar-brand p-2 text-color-blue" >RECIPE HUB</Link>
    
    <div className='input-group d-flex flex-nowrap w-25 ps-5 my-2'>
    <Autocomplete
            onChange={handleChange}
            sx={{ borderRadius: 10, width: "100%", margin: "auto" }}
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            renderInput={(params) => (
              <TextField
                sx={{
                  borderRadius: 2,
                  input: { color: "black" },
                  bgcolor: "#ffffff",
                  padding: "6px",
                }}
                variant="standard"
                placeholder="Type to Search..."
                {...params}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
    </div>
    
         <div className="d-grid gap-1 d-md-flex justify-content-md-end">
            <>
            <Link to='/user' className="btn btn-link me-md-2 text-dark" type="button">UserLogin</Link>
            <Link to='/admin' className="btn btn-link text-dark" type="button">Admin</Link>
            </>
          
             
            <>
            <Link to='/user' className="btn btn-link me-md-2 text-dark" type="button">Profile</Link>
            <Link onClick={() => logout(false)} to='/' className="btn btn-link text-dark" type="button">Logout</Link>
            </>
         

         
            <>
            <Link to='/' className="btn btn-link me-md-2 text-dark" type="button">Add</Link>
            <Link to='/admin-profile' className="btn btn-link text-dark" type="button">Profile</Link>
            <Link  to='/' className="btn btn-link text-dark" type="button">Logout</Link>

            </>  
           
         </div>
    </div>
    </nav>
    
    </>
  )
}
