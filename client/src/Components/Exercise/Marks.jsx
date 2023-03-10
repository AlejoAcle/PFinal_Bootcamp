import React from "react";
import axios from "axios";
import logo from '../Images/Lemon.png'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";



const Marks = () => {

  //para guardar el mensaje satisfactorio eliminar marca
  const [successMessage, setSuccessMessage] = useState(null)

  //crea una "ruta" para reconocer el id del ejercicio
  const { exerciceID } = useParams()

  //obtener el token primero
  const token = localStorage.getItem("token")


  // usestate para guardar las marcas del ejercicio
  const [marks, setMarks] = useState([])
  //para guardar el ejercicio del que estamos pidiendo las marcas
  const [ejercicio, setEjercicio] = useState({})


  // console.log(exerciceID)
  //funcion para llamar la ruta del backend y obtener las marcas
  const getMarks = async () => {
    //comillas invertidas para enlazar una variable en una string,
    const response = await axios.get(`http://localhost:5000/api/marksUserList/${exerciceID}`, {
      headers: { "Authorization": token }
    })
    // console.log(response)
    //setmarks guarda la []de marcas en marks linea 17 de use state
    setMarks(response.data.marks)

    setEjercicio(response.data.exercices)
  }
  //devuelve los datos guardados con useState, al cargar la pagina
  useEffect(() => {
    getMarks()
  }, [])

  //funcion pasando parametro
  const DeleteMarks = async (marca_id) => {
    localStorage.setItem("marcaID", marca_id)

    const idmarca = localStorage.getItem("marcaID")

    //alerta por pantalla para eliminar marca ejercicio
    let option = window.confirm("¿Seguro que quieres eliminar esta marca?")
    if (option == true) {
      const response = await axios.delete(`http://localhost:5000/api/deleteUserMark/${idmarca}`, {
        headers: { "Authorization": token }
      })


      //para borrar el id (propiedad guardada en localstorage,genericamente)
      localStorage.removeItem("marcaID")
      //respuesta satisfactoria
      setSuccessMessage(response.data.message)
      //window.location href o usenavigate para que te lleve a un lugar concreto despues de borrar, ojo con el parametro en la ruta ${}
      window.location.href = `/marks/${exerciceID}`
    }

  }







  return (
    <div className="cardContainer">
      <Navbar/>
      <p>Marcas</p>

      {
        marks.map(marcas => {
          // console.log(marks)

        //cuando recibimos la fecha desde el back, es como string, hay que transformarlo en formato de fecha
        //
        let correctDate = "";
        let date1 = new Date(marcas.date);
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
            <div className="cajaMarcas" key={marcas._id}>
              <div className="card text-center bg-transparent justify-content-center" >
                <div className="card-header" >
                  <h3>{ejercicio.nameExercice}</h3>
                </div>
                <ul className="list-group list-group-flush ">
                  <li className="list-group-item">Fecha: {correctDate}</li>
                  <li className="list-group-item">Repeticiones: {marcas.reps}</li>
                  <li className="list-group-item">Peso: {marcas.weight}</li>
                  <li className="list-group-item">Comentarios: {marcas.comment}</li>
                </ul>

                <div className="card-footer text-muted footercard ">
                  <button onClick={() => { DeleteMarks(marcas._id) }} className="button-561" >Eliminar marca</button>
                </div>
              </div>
            </div>
          )
        })
      }
      <Link className="link" to={`/marksAdd/${exerciceID}`}>
        <button className="button-563">Añadir marca</button>
      </Link>
      <Link className="link marca" to="/ejercicios">
        <button className="button-56">Volver</button>
      </Link>


    </div>
  )
}
export default Marks

