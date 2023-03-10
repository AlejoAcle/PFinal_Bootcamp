import React from "react";
import axios from "axios";
import logo from '../Images/Lemon.png'
import { useState } from "react";
import Navbar from "../Navbar/Navbar";



const ExerciseAdd = () => {
    const [user, setUser] = useState({
        nameExercice: ""
    })

    const token = localStorage.getItem("token")



    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const onChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
        console.log(user)
    }

    const ExerciseSubmit = async e => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/newExercises", { ...user }, {
                headers: { "Authorization": token }
            })
            console.log(response)
            setSuccessMessage(response.data.message)
            setTimeout(()=>{
                window.location.href='/newExercise'
            },2000)
            
        } catch (error) {
            setErrorMessage(error.response.data.message)
            setTimeout(() =>{
                window.location.href ='/newExercise'
                }, 1000)
        }
    }

    return (
        //form y submit juntos siempre, no vale otra etiqueta
        <div>
<Navbar/>
<div className="container-md">
        <div className="parent-wrapper">
            
            <p>Ejercicios</p>
            <span className="close-btn glyphicon glyphicon-remove"></span>
            <div className="subscribe-wrapper">
                <form onSubmit={ExerciseSubmit} >
                    <h4>¿Creamos algo?...</h4>
                    <h4>¿Qué ejercicio quieres subir?</h4>
                    <input type="text" className="form-control" name="nameExercice" placeholder="Escribe tu ejercicio" onChange={onChangeInput} value={user.nameExercice} aria-label="Ejercicio"></input>
                    <button type="submit" className="submit-btn">Registrar</button>
                    <div className="ok" style={{ display: successMessage ? "block" : "none" }}>
                        {successMessage}
                    </div>
                    <div className="fail" style={{ display: errorMessage ? "block" : "none" }}>
                        {errorMessage}
                    </div>
                </form>
            </div>
        </div>
        </div>
        </div>
    )

}

export default ExerciseAdd;