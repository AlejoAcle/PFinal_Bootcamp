import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


const ClasesList = () => {
    //guarda todo en formato array
    //el primer parametro es la variable que usamos en el return de componente, el segundo es la funcion que hace que los datos se guarden en "clases"
    const [clases, setClases] = useState([])
    //el token del usuario registrado lo coge
    const token = localStorage.getItem("token")
    //coge las clases de esa ruta siempre que exista el token
    const getClases = async () => {
        const response = await axios.get("http://localhost:5000/api/classes", {
            headers: { "Authorization": token }
        })
        console.log(response)
        //almacena el objeto elegido de la array
        setClases(response.data.classes)
        console.log(clases)
    }
    //devuelve la array guardada, llama la funcion getclases que llama a la ruta del back
    //, y ejecuta la funcion para devolver los datos y que estén cargados al abrir la pag
    // se pone []array para parar el bucle, si no infinito.
    useEffect(() => {
        getClases()
    }, [])


    return (
        <div>
            <Navbar />
            <p>¿Que día quieres entrenar?</p>
            {
                //estructura tipo blucle for para extraer los datos que quiero y mostrarlos
                clases.map(parametro => {

                    let correctDate = "";
                    let date1 = new Date(parametro.date);
                    let year = date1.getFullYear();
                    let month = date1.getMonth() + 1;
                    let dt = date1.getDate();
                    if (dt < 10) {
                        dt = "0" + dt;
                    }
                    if (month < 10) {
                        month = "0" + month;
                    }
                    correctDate = dt + "/" + month + "/" + year;


                    return (
                        // <div key={parametro._id}>
                        //     <h3>{correctDate}</h3>
                        //     <h3>{parametro.wodDay}</h3>
                        // </div>
                        //este link sustituye a uno de ClasesVer.jsx
                        <div className="orden_clases">
                        <Link key={parametro._id} className="Link alinearclase" to={`/booking/${parametro._id}`}>
                            <button className="button-56clases">{correctDate}</button>
                        </Link>
                        </div>
                    )
                })
            }
            <Link className="link" to="/home">
                <button className="button-56">Volver</button>
            </Link>
        </div>
    )
}

export default ClasesList