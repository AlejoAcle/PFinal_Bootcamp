import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const TimetableAdd = () => {
  const { classesID2 } = useParams();

  const token = localStorage.getItem("token");
  const [info, setInfo] = useState({
    time: "",
    nPeople: "",
    typeWod:"",
    date: classesID2,
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const addTimeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/newTimeTable/${classesID2}`,
        { ...info },
        { headers: { Authorization: token } }
      );
      setSuccessMessage(response.data.message);
      setInfo({
        time: "",
        nPeople: "",
        date: classesID2,
      });
      window.location.href = `/timetables/${classesID2}`;
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h6>Añade un nuevo horario</h6>
      <form onSubmit={addTimeSubmit} className="formNewTimetable">
        <div className="container_input_addTmtb">
          <input
            name="time"
            className="input_time input_design"
            onChange={onChangeInput}
            value={info.time}
            placeholder="Hora"
          ></input>
          <input
            name="nPeople"
            className="input_time input_design"
            onChange={onChangeInput}
            value={info.nPeople}
            placeholder="Nº de Personas"
          ></input>
                    <input
            name="typeWod"
            className="input_time input_design"
            onChange={onChangeInput}
            value={info.typeWod}
            placeholder="Tipo de clase"
          ></input>
        </div>
        <div style={{ display: successMessage ? "block" : "none" }}>
          {successMessage}
        </div>
        <div style={{ display: errorMessage ? "block" : "none" }}>
          {errorMessage}
        </div>
        <div className="container_buttonT ">
          <button type="submit" className="button-56">
            Añadir
          </button>
          <Link className="Link"to={`/timetables/${classesID2}`}>
            <button className="button-56">Cancelar</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default TimetableAdd;