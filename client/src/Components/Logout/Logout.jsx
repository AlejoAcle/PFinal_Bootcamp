import React from "react";
import { useEffect} from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import logo from "../Images/Lemon.png"




//cerrar sesion
const Logout = () =>{

localStorage.removeItem("token")
localStorage.removeItem("role")


useEffect(()=>{
    setTimeout(()=>{
        window.location="/"
    },3000)
})




    return(
        <div>
             <div className='banner'>
            <a>Lemon</a>
            <Link className='Link' to='/home'>
            <img src={logo} style={{ width: "80px", height: "80px" }} alt="" />
            </Link>
            <a>Pair</a>
          </div>
            {/* <Navbar/> */}
            <h2> ✨ Esperamos que vuelvas pronto ✨ </h2>
        </div>
    )
}
export default Logout