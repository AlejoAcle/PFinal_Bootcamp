import React from "react";
import logo from '../Images/Lemon.png'
import { useState, useEffect } from "react";
import axios from "axios";
//link para enlazar 
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


const ExerciseSee = () => {

    const [successMessage, setSuccessMessage] = useState(null)

    //para devolver cosas desde la base de datos, ejercicios ya hechos por el user
    const [ejercicios, setEjercicios] = useState([])

    //ejercicios totales , DEVUELVE ARRAY
    // const [ejerciciosTot, setEjerciciosTot] = useState([])

    //cogemos el token guardado en application cuando haces login.
    const token = localStorage.getItem("token")
    const getExercise = async () => {
        const response = await axios.get("http://localhost:5000/api/exercicesUser", {
            headers: { "Authorization": token }
        })


        setEjercicios(response.data.exercices)
        console.log(response)


    }
    useEffect(() => {
        getExercise()
    }, [])


    const DeleteExercise = async (exercise_id) =>{
        localStorage.setItem("exerciseID",exercise_id)

        const idexercise = localStorage.getItem("exerciseID")

        let option = window.confirm("¿Quieres eliminar definitivamente el ejercicio?")
        if (option = true){
            const response = await axios.delete(`http://localhost:5000/api/deleteExercice/${idexercise}`,{
                headers: { "Authorization": token}
            })

        localStorage.removeItem("exerciseID")
        setSuccessMessage(response.data.message)
        window.location.href= `/ejercicios`
        }



    }





    return (
        <div >
            <Navbar />

            <p>Mis ejercicios</p>
            {
                ejercicios.map(parametro => {
                    return (
                        //la etiqueta Link, precisa Key para "enrutarse", necesita ademas saber a donde nos lleva
                        <div className="DisplayFlex" key={parametro._id}>

                            <Link className="Link" to={`/marks/${parametro._id}`}>
                                <button className="button-53" role="button">{parametro.nameExercice}</button>
                            </Link>
                            <div className="botonesEjercicios">
                            <button className="button-531 modificar"> Modificar </button>

                            <Link className="link" to="/ejercicios">
                                <button onClick={() => {DeleteExercise(parametro._id)}} className="button-531 delete"> Eliminar  </button>
                            </Link>
                            </div>

                        </div>
                    )
                })
            }
        </div>


    )
}

export default ExerciseSee
