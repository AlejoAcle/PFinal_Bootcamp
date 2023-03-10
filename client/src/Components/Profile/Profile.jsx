import React from "react";
import axios from "axios";
import logo from '../Images/Lemon.png'
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar"
import { Outlet } from "react-router-dom";





const Profile = () => {

    const [userData, setUserData] = useState([]);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const [imagen, setImagen] = useState(
        "https://st3.depositphotos.com/19428878/36349/v/600/depositphotos_363499050-stock-illustration-default-avatar-profile-vector-user.jpg"
    );

    const navigate = useNavigate();

    useEffect(() => {
        // if (!token) navigate('/')
        let mounted = true;
        axios
            .get("http://localhost:5000/api/profile", {
                headers: { Authorization: token },
            })
            .then((response) => {
                if (mounted) {
                    setUserData(response.data.user);
                    setImagen(response.data.user.imagen.url);
                }
                console.log(response.data.user)
            });
        return () => {
            mounted = false;
        };
    }, []);

    const deleteCuenta = () => {
        let opcion = window.confirm("¿Seguro que quieres eliminar tu cuenta?");
        if (opcion == true) {
            axios.delete("http://localhost:5000/api/deleteUser", {
                headers: { Authorization: token },
            });

            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.href="/"
        }
    };


    //spinner por si no cargar imagen
    const cargando = () => {
        return (
            <div>
                <p>Hola, q tal ? </p>
            </div>
        );
    };

    const screen = () => {
        return (

            <div>
                <Navbar />
                <p >Perfil</p>
                <div className="">
                    <Link to="/profilephoto" className="Link">
                    <img  alt="" className=" image" src={imagen}></img>
                    </Link>
                </div>
                <form className="">
                    <div className="secciones">
                        {/* <a className="">Nombre</a> */}
                        <p className="Nombre">{userData.name}</p>
                    </div>
                    <div className="secciones">
                        {/* <p className="">Apellido</p> */}
                        <p className="Nombre">{userData.surname}</p>
                    </div>
                    <div className="secciones">
                        <p className="email">Email</p>
                        <p className="mailUser">{userData.email}</p>
                    </div>
                </form>
                <div className="botonera">
                    <Link className="Link" to="profileModify">
                        <button className="button-56">Modificar contraseña</button>
                    </Link>
                    <Link className="Link" to="/home">
                    <button className="button-56 delete1" onClick={() => {deleteCuenta();}}>Eliminar Perfil</button>
                    </Link>
                    
                <Link className="link" to="/home">
                    <button className="button-56"> Volver</button>
                </Link>



                </div>
                
                <Outlet />

            </div>
        );
    };

    return (
        <div>

            {imagen ? screen() : cargando()}</div>);
}

export default Profile