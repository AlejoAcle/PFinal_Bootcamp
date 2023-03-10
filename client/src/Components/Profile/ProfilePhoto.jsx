import axios from "axios";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";



//const para añadir foto
const ProfilePhoto = () => {
  const navigate = useNavigate();
  //el token para identificar el usuario que esta subiendo la foto
  const token = localStorage.getItem("token");

  //las dos variables necesarias, la imagen y el id de la imagen
  const [imagen, setImagen] = useState(null);
  const [publicId, setPublicId] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
 
  //me precarga el perfil y despues la imagen que haya y su id, el de la imagen
  useEffect(() => {
    if (!token) navigate("/");
    axios
      .get("http://localhost:5000/api/profile", {
        headers: { Authorization: token },
      })
      
      .then((response) => {
        console.log(response)
        setImagen(response.data.user.imagen.url);
        setPublicId(response.data.user.imagen.public_id);
      });
  });

  // ------------------------------- Función de eliminar imagen ------------------------------

  const deletePhoto = async () => {
    let opcion = window.confirm("¿Seguro que quieres eliminar la foto?");

    if (opcion == true) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/destroyPhoto",
          { public_id: publicId },
          { headers: { Authorization: token } }
        );

        //me actualiza para restablecer sin imagen
        await axios.put(
          "http://localhost:5000/api/updateProfile",
          {
            imagen: {
              public_id: "",
              url: "https://res.cloudinary.com/dzenpc7wi/image/upload/v1642780148/crossfitAPP/auxt7ab5smg7879zbq4f.webp",
            },
          },
          { headers: { Authorization: token } }
        );

        setSuccessMessage(response.data.msg);

        // console.log(response)
      } catch (err) {
        setErrorMessage(err.response.data.msg);
      }
    }
  };

  // ------------------------------- Función para cargar imagen de perfil --------------------
  //verifica condiciones de la imagen?
  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];

      if (!file) return alert("No se ha subido ningún archivo");
      if (file.size > 1024 * 1024 * 2) return alert("Archivo demasiado grande");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("Formato de archivo no soportado");
        
      let formData = new FormData();
      formData.append("file", file);
      

      //   setLoading(true);
      const res = await axios.post(
        `http://localhost:5000/api/upload`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          },
          
        }
      );
      console.log(res)

      // Para añadir la imagen al usuario

      const responsePhoto = await axios.put(
        "http://localhost:5000/api/updateProfile",
        {
          imagen: {
            public_id: res.data.public_id,
            url: res.data.url,
          },
        },
        { headers: { Authorization: token } }
      );

      console.log(responsePhoto.data.message);

      setSuccessMessage(responsePhoto.data.msg);
      console.log(res.data);
    } catch (err) {
      console.log(err.response);
      alert(err.message);
      setErrorMessage(err.responsePhoto.data.msg);
    }
  };

  return (
    <div>
        <Navbar/>
      <div className="container">
        <p className="subtitle">¿Quieres añadir o cambiar tu foto de perfil?</p>
        <div className="container_photo">
          <img className="profile_photo" alt="" src={imagen}></img>
        </div>
        <div className="file-select" id="src-file">
          <label className="upload">
            <input
              className="upload_imagen"
              type="file"
              name="src-file"
              onChange={handleUpload}
            ></input>
          </label>
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
        <button className="button-56 delete2" onClick={deletePhoto}>
          Eliminar foto
        </button>
      </div>

      <Link to="/profile">
        <div className="container_back_button">
          <i className="far fa-arrow-alt-circle-left buttonBack"></i>
        </div>
      </Link>
    </div>
  );
};

export default ProfilePhoto;