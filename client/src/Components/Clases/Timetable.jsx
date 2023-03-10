import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const TimeTable = () => {
  const { classesID } = useParams();
  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  const [timeTables, setTimeTables] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  // const [successMessage, setSuccessMessage] = useState(null)
  // const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate();
  useEffect(() => {
    let mounted = true;
    axios
      .get(`http://localhost:5000/api/classesList/${classesID}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        if (mounted) {
          setTimeTables(response.data.timeTable);
          setCurrentDate(response.data.date);
        }
      });

    return () => {
      mounted = false;
    };
  });
  // Alerta para eliminar el horario ----------
  const deleteTime = async (IDTime) => {
    // console.log(IDTime)
    localStorage.setItem("time", IDTime);
    let opcion = window.confirm("¿Seguro que quieres eliminar el horario?");

    if (opcion == true) {
      const response = await axios.delete(
        `http://localhost:5000/api/deleteTimeTable/${IDTime}`,
        {
          headers: { Authorization: token },
        }
      );
      console.log(response)
      //    setSuccessMessage(response.data.message)
      localStorage.removeItem("time");
      window.location.href = `/timetables/${classesID}`
    } else {
      localStorage.removeItem("time");
    }
  };

  const deleteClass = async (IDClass) => {
    localStorage.setItem("class", IDClass);
    let opcion = window.confirm("¿Seguro que quieres eliminar la clase?");

    if (opcion == true) {
      const response = await axios.delete(
        `http://localhost:5000/api/deleteClass/${IDClass}`,
        {
          headers: { Authorization: token },
        }
      );
      console.log(response)
      //    setSuccessMessage(response.data.message)
      localStorage.removeItem("class");
      window.location.href = "/classeslist"
    } else {
      localStorage.removeItem("class");
    }
  };

  const loading = () => {
    return (
      <div>
        <p>Hola, q tal?</p>
      </div>
    );
  };

  const screen = () => {
    let correctDate = "";
    let date1 = new Date(currentDate.date);
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
      <div>
        <Navbar/>
        <p className="subtitle">Horario del día:</p>
        {<h4 className="nameExerciceMarks">{correctDate}</h4>}
        <table className="table mx-auto table-striped tabla">
          <thead >
            <tr>
              <th>Hora</th>
              <th>Nº de Personas</th>
              <th>Tipo de clase</th>
            </tr>
          </thead>
          <tbody>
            {timeTables.map((timetable) => {
              return (
                <tr key={timetable._id}>
                  <td>{timetable.time}</td>
                  <td>{timetable.nPeople}</td>
                  <td>{timetable.typeWod}</td>

                  {role == 1 ? (<td><button className="button-eliminar "
                    onClick={() => {
                      deleteTime(timetable._id);
                    }}
                  >
                    Eliminar hora
                  </button></td>) : (
                    <></>
                  )}


                </tr>
              );
            })}
          </tbody>
        </table>
        <Link
          className="container_addTimeTable"
          to={`timetablesAdd/${classesID}`}
        >
          <i className="fas fa-plus-circle buttonPlus"></i>
        </Link>
        <Outlet />
        <br />
        {role == 1 ? (<div>  <Link
          className="container_addTimeTable Link  "
          to={`timetablesAdd/${classesID}`}
        >
            <button className="button-56">Añadir horario</button>
          </Link>
          <button
          className="button_delete_user button-5601 "
          onClick={() => {
            deleteClass(classesID);
          }}
        >
          Eliminar Clase
        </button> </div>) : (<></>)}

        <Link to="/classeslist">
          <div className="container_back_button">
            <i className="far fa-arrow-alt-circle-left buttonBack"></i>
          </div>
        </Link>
      </div>
    );
  };
  return <div>{currentDate ? screen() : loading()}</div>;
};

export default TimeTable;