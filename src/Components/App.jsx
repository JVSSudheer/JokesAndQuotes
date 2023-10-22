import React from 'react';
import Home from "./Home";
import {Routes,Route} from "react-router-dom"
import Favourites from "./Favourites"
import "../index.css"

function App() {
    return ( 
        <Routes>
            <Route path='/' element={<Home/>} /> 
            <Route path='/Favourites' element={<Favourites/>} /> 
        </Routes>
    )
}

export default App;
