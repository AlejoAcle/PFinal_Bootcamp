import React from "react";
import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";



const MarksAdd = () => {
  const { exerciceID } = useParams()
  const [info, setInfo] = useState({
    date: "",
    reps: "",
    weight: "",
    comment: "",
    exercisesId: exerciceID,
  })

  const navigate = useNavigate()

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)

  const token = localStorage.getItem("token")

  const onChangeInput = e => {
    const { name, value } = e.target
    setInfo({ ...info, [name]: value })
    console.log(info)
  }

  const MarkSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/api/newMarks", { ...info }, {
        headers: { "Authorization": token }
      }) 
      console.log(response)
      setSuccessMessage(response.data.message)
      setTimeout(()=>{
        navigate(`/marks/${exerciceID}`)
      },2000)

    } catch (error) {
      setErrorMessage(error.response.data.message)
      console.log(error.response)
    }
  };


  return (
    <div>
      <Navbar/>
      <p>Registrar nueva marca</p>
      <form className="formMark" onSubmit={MarkSubmit}>
        <div className="form-group ">
          <label for="formGroupExampleInput">Fecha</label>
          <input type="date" className="form-control" id="formGroupExampleInput" placeholder="00/00/00" name="date" value={info.date} onChange={onChangeInput}></input>
        </div>
        <div className="form-group">
          <label for="formGroupExampleInput">Repeticiones</label>
          <input type="text" className="form-control" id="formGroupExampleInput" placeholder="nº total" name="reps" value={info.reps} onChange={onChangeInput}></input>
        </div>
        <div className="form-group">
          <label for="formGroupExampleInput">Peso</label>
          <input type="text" className="form-control" id="formGroupExampleInput" placeholder="kilos" name="weight" value={info.weight} onChange={onChangeInput}></input>
        </div>
        <div className="form-group">
          <label for="formGroupExampleInput2">Comentario</label>
          <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Comentario" name="comment" value={info.comment} onChange={onChangeInput}></input>
        </div>
       
        <button type="submit" className="button-56125">Registrar</button>
      
      </form>


      <Link className="link" to={`/marks/${exerciceID}`}>
        <button className="button-5613">Cancelar</button>
      </Link>

    </div >
  )

}

export default MarksAdd



//EL CODIGO DE ALEX-----------------------------------------------------------------------//
// import axios from "axios";
// import { useState } from "react";
// import { Link, useParams } from "react-router-dom";

// const MarksAdd = () => {
//   //   console.log("Hola");
//   const { exerciceID } = useParams();

//   const [info, setInfo] = useState({
//     date: "",
//     reps: "",
//     weight: "",
//     comment: "",
//     exerciceID: exerciceID, // id del ejercicio cuando la reciba
//     // user: "" // lo identifico en la llamada
//   });

//   const [successMessage, setSuccessMessage] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);

//   const token = localStorage.getItem("token");

//   const onChangeInput = (e) => {
//     const { name, value } = e.target;
//     setInfo({ ...info, [name]: value });

//     console.log(info);
//   };

//   const addScore = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/createMark",
//         { ...info },
//         { headers: { Authorization: token } }
//       );
//       setSuccessMessage(response.data.message);
//       // navigate(`/marks/${exerciceAddMarkID}`)
//     } catch (error) {
//       console.log(error);
//       setErrorMessage(error.response.data.message);
//     }
//   };

//   return (
//     <div>
//       <h3 className="subtitle">¿Nuevas marcas personales?</h3>
//       <form onSubmit={addScore} className="addScore_form">
//         <div className="container_mod">
//           <div className="form-floating mb-3 container_inputReg">
//             <input
//               type="text"
//               name="date"
//               value={info.date}
//               onChange={onChangeInput}
//               className="form-control"
//               id="floatingDateM"
//               placeholder="Fecha"
//             />
//             <label htmlFor="floatingDateM">Fecha</label>
//           </div>
//           <div className="form-floating mb-3 container_inputReg">
//             <input
//               type="number"
//               name="reps"
//               value={info.reps}
//               onChange={onChangeInput}
//               className="form-control"
//               id="floatingRepsM"
//               placeholder="Repeticiones"
//             />
//             <label htmlFor="floatingRepsM">Repeticiones</label>
//           </div>
//           <div className="form-floating mb-3 container_inputReg">
//             <input
//               type="number"
//               name="weight"
//               value={info.weight}
//               onChange={onChangeInput}
//               className="form-control"
//               id="floatingWeightM"
//               placeholder="Peso"
//             />
//             <label htmlFor="floatingWeightM">Peso</label>
//           </div>
//           <div className="form-floating mb-3 container_inputReg">
//             <input
//               type="text"
//               name="comment"
//               value={info.comment}
//               onChange={onChangeInput}
//               className="form-control"
//               id="floatingWeightM"
//               placeholder="Comentario"
//             />
//             <label htmlFor="floatingWeightM">Comentario</label>
//           </div>
//           <div
//             className="message_login"
//             style={{ display: successMessage ? "block" : "none" }}
//           >
//             {successMessage}
//           </div>
//           <div
//             className="message_login"
//             style={{ display: errorMessage ? "block" : "none" }}
//           >
//             {errorMessage}
//           </div>
//         </div>
//         <button className="button_5612" type="submit">
//           Aceptar
//         </button>
//         <Link to={`/marks/${exerciceID}`}>
//           <button className="button-5613">Cancelar</button>
//         </Link>
//       </form>
//     </div>
//   );
// };

// export default MarksAdd;