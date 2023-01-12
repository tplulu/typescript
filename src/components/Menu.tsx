import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Menu = () => {

    return ( 
        <div className="bg-primary navbar navbar-dark bg-dark">
               <nav className="navbar navbar-expand navbar-dark container">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className= "nav-link">Aéroport</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/findfly" className="nav-link">Trouver un vol</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/favoris" className="nav-link">Favoris</Link>
                        </li>
                    </ul>
               </nav> 
        </div>
     );
}
 
export default Menu;