import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";



const Home = () =>{
    return(
        <div>
        <Navbar/>
        <Link className="link"  to="/profile"><button className="button-565">Perfil</button></Link>
        <Link className="link"  to="/classeslist"><button className="button-565">Horarios</button></Link>
        <Link  className="link" to="/listclasses"><button className="button-565">Reservas</button></Link>
        </div>

    )
}

export default Home