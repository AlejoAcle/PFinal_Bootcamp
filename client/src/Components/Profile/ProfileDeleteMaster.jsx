import React from "react";
import axios from "axios"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar"


const ProfileDeleteMaster = () => {

    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");

    const [successMessage, setSuccessMessage] = useState(null)

    const AllUsers = async () => {
        try {
            

            const response = await axios.get("http://localhost:5000/api/usersList",
                { headers:{
                    Authorization: token
                } })
            console.log(response)
            setUsers(response.data.users)

        } catch (error) {
            // setErrorMessage(error.response.data.message)

        }
    }
    useEffect(() => {
        AllUsers()
    }, [])

// Borramos la cuenta del usuario por su ID
    const MasterDelete = async (user_id) =>{

        ///guardo el dato necesario
        localStorage.setItem("userID",user_id)


        //recojo el dato que acabo de guardar con setItem
        const iduser = localStorage.getItem("userID")

        //alerta de que voy a borrar, si estoy seguro
        let opcion = window.confirm("Vas a eliminar este usuario ¿Estás seguro?")
        if (opcion == true) {
           const response = await axios.delete(`http://localhost:5000/api/deleteUsers/${iduser}`,{
                headers:{"Authorization": token}
            })
            //borro el id, que lo tenia guardado en localstorage
            localStorage.removeItem("userID")

            //respuesta OK
            setSuccessMessage(response.data.message)
            //vamos de nuevo al panel de todos los usuarios
            window.location.href = `/users`



        }
       }




    return (
        <div>
            <Navbar/>
            {
                users.map((usuario)=>{
                    return(
                        <div className="container-borrado" key={usuario._id}> 
                            <p className="borrado">{usuario.name}</p>
                            <p className="borrado">{usuario.email}</p>
                          <div>
                            <button onClick={() => { MasterDelete(usuario._id) }} className="button-borrado">Eliminar</button>
                          </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProfileDeleteMaster