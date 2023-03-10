// import React from "react"
// import axios from "axios"
// import { useState } from "react"
// import { Link } from "react-router-dom"




// const ProfileModify = () =>{
//     const[pass,setPass] = useState({password:""})
//     const token = localStorage.getItem("token")
//     const [successMessage, setSuccessMessage] = useState(null)

//     const onChangeInput = e => {
//         const { name, value } = e.target
//         setPass({ ...pass, [name]: value })
//         console.log(pass)
//     }

//     const ModifySubmit = async e =>{
//         e.preventDefault()
//         try {
//             const response = await axios.put("http://localhost5000/api/updateProfile",{...pass},{
//             headers: { "Authorization": token }})
//             setSuccessMessage(response.data.message)
//             console.log(response)

//             } catch (error) {
//                 console.log(error.response)
            
//         }
//     }


//     return(
//         <div>
//             <form onSubmit={ModifySubmit}>
//                 <label htmlFor="password">Password
//                 <input  type="text" name="password" value={pass.password} onChange={onChangeInput}></input>
//                 </label>
//                 <input type="submit">Modificar</input>
//             </form>
//             <Link to="/profile">
//                 <button>Volver</button>
//             </Link>
//         </div>
//     )

// }


// export default ProfileModify


import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProfileModify = () => {
  const [info, setInfo] = useState({
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const modSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:5000/api/updateProfile",
        { ...info },
        { headers: { Authorization: token } }
      );
      // console.log (response)
      setSuccessMessage(response.data.message);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="">
      <form onSubmit={modSubmit}>
        <div className="FormPass">
        <p> Intoduce la contraseña nueva</p>
          <input 
            type="password"
            name="password"
            value={info.password}
            onChange={onChangeInput}
            className=" PassBox"
            id="floatingPassword"
            placeholder="Password"
          />
          {/* <label htmlFor="floatingPassword" >
            Contraseña
          </label> */}
          
        </div>
        <div
          className="message_login"
          style={{ display: successMessage ? "block" : "none" }}
        >
          {successMessage}
        </div>
        <div
          className="message_login"
          style={{ display: errorMessage ? "block" : "none" }}
        >
          {errorMessage}
        </div>
        <div className="container_input_addTmtb">
          <button className="button-56" type="submit">
            Aceptar
          </button>
          <Link className="Link" to="/profile">
            <button className="button-56">Cancelar</button>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default ProfileModify;