import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";





const WodModify = () =>{
const {wodID} = useParams()
const [info, setInfo] = useState({
    type:"",
    name:"",
    time:"",
    description:"",

})

const navigate = useNavigate()

const [successMessage, setSuccessMessage] = useState(null);
const [errorMessage, setErrorMessage] = useState(null)

const token = localStorage.getItem("token")

const onChangeInput = e =>{
    const { name, value} = e.target
    setInfo({...info, [name]: value})
    console.log(info)
}

const WodModifyAdd = async e =>{
    e.preventDefault()
    try {
        const response = await axios.put(`http://localhost:5000/api/updateWod/${wodID}`,{...info},{
            headers:{"Authorization": token}
        })
        console.log(response)
        setSuccessMessage(response.data.message)
        setTimeout(()=>{
            navigate(`/wod`)
        },2000)
    } catch (error) {
        setErrorMessage(error.response.data.message)
        console.log(error.response)
    }
};

    return(
        <div>
        <Navbar/>
        <p>Modifica el WOD</p>
        <form onSubmit={WodModifyAdd}>
            <div className="form-group ">
                <label forHtml="formGroupExampleInput">Nombre del WOD</label>
                <input type="text" className="form-control form1" id="formGroupExampleInput" placeholder="Nombre" name="name" value={info.name} onChange={onChangeInput}></input>
            </div>
            <div className="form-group ">
                <label forHtml="formGroupExampleInput">Time Cap</label>
                <input type="text" className="form-control form1" id="formGroupExampleInput" placeholder="min" name="time" value={info.time} onChange={onChangeInput}></input>
            </div>
            <select className="input button-5616" name="type" onChange={onChangeInput}>
                <option value="A" >Tipo de WOD</option>
                <option value="AMRAP" >AMRAP</option>
                <option value="EMOM" >EMOM</option>
                <option value="For Time">For Time</option>
            </select>
            <textarea type="text" className="form-control form1" name="description" placeholder="Descripción del WOD" onChange={onChangeInput} value={info.description} aria-label="Descripción del WOD"></textarea>

            <div style={{ display: successMessage ? "block" : "none" }}>
                {successMessage}
            </div>
            <div style={{ display: errorMessage ? "block" : "none" }}>
                {errorMessage}
            </div>

            <button type="submit" className="button-5611">WOD modificado</button>
        </form>
        <div className="volver">
        <Link className="link" to="/wod">
                <button className="button-5610">Volver</button>
            </Link>
            </div>
    </div>

    )
}

export default WodModify