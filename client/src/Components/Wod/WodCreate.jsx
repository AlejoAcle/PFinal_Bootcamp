import React from "react";
import axios from "axios";
import { useEffect, useState, Link } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";



const WodCreate = () => {
    //guardo el token para saber que es ADMIN
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role");
    //lo que necesito para crear el wod

    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            if (!token) {
                navigate("/");
            } else {
                if (role != 1) {
                    navigate("/home");
                }
            }
        }, 3000);
    });



    const [wod, setWod] = useState({
        type: "",
        name: "",
        time: "",
        description: ""
    })



    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const onChangeInput = e => {
        const { name, value } = e.target
        setWod({ ...wod, [name]: value })

    }

    const WodSubmit = async e => {
        e.preventDefault()
        try {
            const response = await axios.post(
                "http://localhost:5000/api/createWod",
                { ...wod },
                { headers: { Authorization: token } }
              );
              setSuccessMessage(response.data.message);
        } catch (error) {
            setErrorMessage(error.response.data.message)
            console.log(error.response)
        }
    }


    return (
        <div>
            <Navbar/>
            <p>Crear WOD</p>
            <form onSubmit={WodSubmit}>
                <div className="form-group ">
                    <label forHtml="formGroupExampleInput">Nombre del WOD</label>
                    <input type="text" className="form-control form1" id="formGroupExampleInput" placeholder="Nombre" name="name" value={wod.name} onChange={onChangeInput}></input>
                </div>
                <div className="form-group ">
                    <label forHtml="formGroupExampleInput">Time Cap</label>
                    <input type="text" className="form-control form1" id="formGroupExampleInput" placeholder="min" name="time" value={wod.time} onChange={onChangeInput}></input>
                </div>
                <select className="input button-5616" name="type" onChange={onChangeInput}>
                    <option value="A" >Tipo de WOD</option>
                    <option value="AMRAP" >AMRAP</option>
                    <option value="EMOM" >EMOM</option>
                    <option value="For Time">For Time</option>
                </select>
                <textarea type="text" className="form-control form1" name="description" placeholder="Descripción del WOD" onChange={onChangeInput} value={wod.description} aria-label="Descripción del WOD"></textarea>

                <div style={{ display: successMessage ? "block" : "none" }}>
                    {successMessage}
                </div>
                <div style={{ display: errorMessage ? "block" : "none" }}>
                    {errorMessage}
                </div>

                <button type="submit" className="button-56">Crear WOD</button>
            </form>
        </div>
    )
}

export default WodCreate


// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const WodCreate = () => {
//   const token = localStorage.getItem("firsLogin");
//   const role = localStorage.getItem("role");
//   const navigate = useNavigate();
//   useEffect(() => {
//     setTimeout(() => {
//       if (!token) {
//         navigate("/");
//       } else {
//         if (role != 1) {
//           navigate("/home");
//         }
//       }
//     }, 3000);
//   });

//   const [info, setInfo] = useState({
//     type: "",
//     name: "",
//     time: "",
//     description: "",
//   });
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);

//   const onChangeInput = (e) => {
//     const { name, value } = e.target;
//     setInfo({ ...info, [name]: value });
//   };
//   // console.log(info)
//   const submitCreateWod = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "/api/createWod",
//         { ...info },
//         { headers: { Authorization: token } }
//       );
//       setSuccessMessage(response.data.message);
//       //   setInfo({
//       //     type: "",
//       //     name: "",
//       //     time: "",
//       //     description: "",
//       //   });
//     } catch (error) {
//       setErrorMessage(error.response.data.message);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={submitCreateWod}>
//         <h2 className="subtitle">Crea un WOD</h2>
//         <div className="containerRegister">
//           <select
//             className="select_wod input_design"
//             name="type"
//             onChange={onChangeInput}
//           >
//             <option value="A">Tipo de WOD</option>
//             <option value="AMRAP">AMRAP</option>
//             <option value="EMOM">EMOM</option>
//             <option value="For Time">For Time</option>
//           </select>

//           <div className="form-floating mb-3 container_inputReg">
//             <input
//               type="text"
//               name="name"
//               value={info.name}
//               onChange={onChangeInput}
//               className="form-control input_design"
//               id="floatingNameWod"
//               placeholder="Nombre"
//             />
//             <label htmlFor="floatingNameWod" className="color_input">
//               Nombre
//             </label>
//           </div>
//           <div className="form-floating mb-3 container_inputReg">
//             <input
//               type="text"
//               name="time"
//               value={info.time}
//               onChange={onChangeInput}
//               className="form-control input_design"
//               id="floatingNameTime"
//               placeholder="Tiempo"
//             />
//             <label htmlFor="floatingNameTime" className="color_input">
//               Tiempo
//             </label>
//           </div>
//           <div className="form-floating mb-3 container_inputReg container_input_wod">
//             <textarea
//               type="text"
//               name="description"
//               value={info.description}
//               onChange={onChangeInput}
//               className=" texArea_wod input_design input_wod"
//               id="floatingDescription"
//               placeholder="Descripción"
//             />
//             <label
//               htmlFor="floatingDescription"
//               className="color_input"
//             ></label>
//           </div>
//         </div>
//         <div style={{ display: successMessage ? "block" : "none" }}>
//           {successMessage}
//         </div>
//         <div style={{ display: errorMessage ? "block" : "none" }}>
//           {errorMessage}
//         </div>
//         <button type="submit" className="button_submit">
//           Aceptar
//         </button>
//       </form>

//       <Link to="/home">
//         <div className="container_back_button">
//           <i className="far fa-arrow-alt-circle-left buttonBack"></i>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default WodCreate;