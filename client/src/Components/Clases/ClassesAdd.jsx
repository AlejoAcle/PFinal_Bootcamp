import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const ClassesAdd = () => {
  const token = localStorage.getItem("token");
  const [info, setInfo] = useState({
    date: "",
    wodDay: "",
  });
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      if (role != 1) {
        navigate("/home");
      }
    }
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  // console.log(info)

  const createClass = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/newClasses",
        { ...info },
        { headers: { Authorization: token } }
      );
      setSuccessMessage(response.data.message);
      setInfo({
        date: "",
        wodDay: "",
      });
      window.location.href = "/classeslist";
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
        <Navbar />
        <p>¡Vamos a crear el horario para entrenar!</p>
      <form onSubmit={createClass} className="classes_form container-fluid">
        <h3 className="subtitle">Crea una Clase</h3>
        <div className="form-floating mb-3 container_inputReg ">
          <input
            type="date"
            name="date"
            value={info.date}
            onChange={onChangeInput}
            className="form-control input_design"
            id="floatingDateC"
            placeholder="Fecha"
          />
          <label htmlFor="floatingDateC" className="color_input">
            Fecha
          </label>
        </div>

        <div className="form-floating mb-3 container_inputReg container_input_wod">
          <textarea
            type="text"
            name="wodDay"
            value={info.wodDay}
            onChange={onChangeInput}
            className=" input_design input_wod"
            id="floatingWod"
            placeholder="Tipo de Clase"
          />
          <label htmlFor="floatingWod" className="color_input"></label>
        </div>
        <button className="button-56 aceptar">Aceptar</button>
      </form>
      <div style={{ display: successMessage ? "block" : "none" }}>
        {successMessage}
      </div>
      <div style={{ display: errorMessage ? "block" : "none" }}>
        {errorMessage}
      </div>

      <Link className="Link" to="/home">
        <div className="container_back_button">
          <button className="button-56 "> Volver</button>
        </div>
      </Link>
    </div>
  );
};

export default ClassesAdd;