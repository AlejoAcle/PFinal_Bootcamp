import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const WodSee = () => {


    //para guardar el mensaje satisfactorio eliminar marca
    const [successMessage, setSuccessMessage] = useState(null)

    const [wod, setWod] = useState([])
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    const getWods = async () => {
        const response = await axios.get("http://localhost:5000/api/wodsList", {
            headers: { "Authorization": token }
        })
        console.log(response)
        setWod(response.data.wods)

    }
    useEffect(() => {
        getWods()
    }, [])


    //funcion para eliminar el wod, pasando parametro del wod (ID)
    const DeleteWod = async (wod_id) => {
        localStorage.setItem("wodID", wod_id)

        const idwod = localStorage.getItem("wodID")
        //aleta en pantalla de eliminar el wod
        let option = window.confirm("¿Seguroo que quieres eliminar este WOD?")
        if (option = true) {
            const response = await axios.delete(`http://localhost:5000/api/deleteWod/${idwod}`, {
                headers: { "Authorization": token }
            })

            localStorage.removeItem("wodID")
            setSuccessMessage(response.data.message)
            window.location.href = `/wod`
        }

    }

    const buttonAdmin = () => {
        return (
            <>

            </>
        )
    }


    return (
        <div >
            {console.log(wod)}
            <Navbar />

            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    {
                        wod.map(WODS => {
                            let description1 = WODS.description.split("\n")
                            return (
                                <div className="conjunto" key={WODS._id}>
                                    <h5 className="card-title texttitle">{WODS.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted textsub">{WODS.type}</h6>
                                    <a className="wodtext" >Time cap {WODS.time}</a>
                                    <div className="footer">
                                        {description1.map((desc, i) => {
                                            return (
                                                <div key={i + desc}>
                                                    <p className="card-text text">{desc}</p>
                                                </div>
                                            )
                                        })}

                                        {role == 1 ? (<>
                                            <Link className="link" to={`/wod/${WODS._id}`}>
                                                <button  className="button-5659 ">Modificar</button>
                                            </Link>


                                            <button onClick={() => { DeleteWod(WODS._id) }} className="button-566">Eliminar</button>
                                        </>) : (<></>)}

                                    </div>
                                </div>
                            )
                        })


                    }   </div>
            </div>
        </div>

    )
}

export default WodSee






