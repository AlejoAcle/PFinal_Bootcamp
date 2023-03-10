import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../Navbar/Navbar";

const Booking = () => {
  const token = localStorage.getItem("token");
  const { classID } = useParams();
  const [dateWod, setDateWod] = useState(null);
  const [timeTable, setTimeTable] = useState(null);
  const [booking, setBooking] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // primero cargamos los horarios de las clases de ese día en concreto

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/bookingList/${classID}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log("response", response);
        setTimeTable(response.data.horario);
        setBooking(response.data.reservas);
        setDateWod(response.data.date);
        setCurrentUser(response.data.user);
      });
  }, [successMessage]);

  console.log("reservas", booking)
  // console.log("horarios", timeTable)

  const newBooking = async (timeTableeID) => {
    const info = {
      classID: classID,
      timeTableID: timeTableeID,
    };
    console.log(info)
    try {
      const response1 = await axios.post(
        `http://localhost:5000/api/newBooking`,
        { ...info },
        { headers: { Authorization: token } }
      )
      console.log(response1);
      setSuccessMessage(response1.data.message);
      if (response1.data.message === "Ya estás apuntado en la clase") {
        swal({ text: response1.data.message, icon: "warning", timer: "3000" });
      }
      if (response1.data.message === "La clase está llena") {
        swal({ text: response1.data.message, icon: "warning", timer: "3000" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBooking = async (bookingID) => {
    try {
      const response2 = await axios.delete(
        `http://localhost:5000/api/deleteBooking/${bookingID}`,
        { headers: { Authorization: token } }
      );
      setSuccessMessage(response2.data.message);
    } catch (error) {
      setErrorMessage(error.response2.data.message);
    }
  };

  const loading = () => {
    return (
      <div>
        <p>Hola</p>
      </div>
    );
  };

  const screen = () => {
    let correctDate = "";
    let date1 = new Date(dateWod.date);
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

    // Creo un array nuevo con el wod separado ya que los saltos de línea vienen como '\n'
    let wodOfDay = dateWod.wodDay.split("\n");

    return (
      <div>
        <Navbar/>
        <p className="subtitle">Elige un horario </p>

        <div className="time_booking">
          <h4 className="fecha">{correctDate}</h4>
        </div>
        <button className="button_wod_booking" onClick={() => setShow(!show)}>
          🏋🏼 WOD del día 🏋🏼‍♀️
        </button>
        <div className="booking_wod">
          {show
            ? wodOfDay.map((wod, i) => {
                return <div key={i + wod}>{wod}</div>;
              })
            : null}
        </div>
        {timeTable.map((time) => {
          return (
            <div key={time._id} className="container_class">
              <div className="container_time_nPeople">
                <div className="time_class">{time.time}</div>
                <div className="numPeople">
                  {time.numTotPeople.length}/{time.nPeople}
                </div>
              </div>
              <div className="container_booking">
                {booking.map((bookings) => {
                  if (bookings.timeTable === time._id) {
                    return (
                      <div key={bookings._id} className="container_images">
                        <div>
                          <img
                            alt=""
                            className="user_photo_booking"
                            src={bookings.user.imagen.url}

                            // lo correcto es: src={bookings.user.imagen.url} pero yo no tenía imagen
                          ></img>
                          <p className="name_booking">{bookings.user.name}</p>

                          {bookings.user._id === currentUser ? (
                            <div
                              className="delete_booking"
                              onClick={() => deleteBooking(bookings._id)}
                            >
                              ❌
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <div>
                <button
                  className="button_submit button_booking"
                  onClick={() => newBooking(time._id)}
                >
                  Reservar
                </button>
              </div>
            </div>
          );
        })}

        <div
          className="message_login"
          style={{ display: errorMessage ? "block" : "none" }}
        >
          {errorMessage}
        </div>
        <Link to="/listclasses">
          <div className="container_back_button">
            <i className="far fa-arrow-alt-circle-left buttonBack"></i>
          </div>
        </Link>

        <Link className="link" to="/home">
                <button className="button-56volver">Volver</button>
            </Link>


      </div>
    );
  };
  return <div>{dateWod ? screen() : loading()}</div>;
};

export default Booking;