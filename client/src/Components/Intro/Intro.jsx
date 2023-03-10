import React from "react";
import { useState } from 'react';
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Modal from 'react-bootstrap/Modal';
import logo from '../Images/Lemon.png'




const Intro = () => {

    //para acceder al local storage y obtener el token y role
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    //
    const role = localStorage.getItem("role")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    // const navigate = useNavigate()



    const [showA, setShowA] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const toggleShowA = () => setShowA(!showA);

    const onChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
        console.log(user)
    }


    //enviar formulario de iniciar sesion
    const LoginSubmit = async e => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/login", { ...user })
            console.log(response)

            //guarda el token y el rol del usuario una vez iniciada sesion
            localStorage.setItem("token", response.data.accessToken)
            localStorage.setItem("role", response.data.role)
            setSuccessMessage(response.data.message)

            window.location.href = "/home"

            // navigate("/home") pasa de un componente a otro sin refrescar pag.
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
    }


    //llamada register submit incluir aqui debajo
    // const Register = () => {
    const [user2, setUser2] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        imagen:"https://res.cloudinary.com/kaelego/image/upload/v1664807242/CrossFit%20Upload/lemon_logo_ctybfk.png"
    })
    const [showB, setShowB] = useState(true);
    // const [errorMessage, setErrorMessage] = useState(null)
    // const [successMessage, setSuccessMessage] = useState(null)

    const toggleShowB = () => setShowB(!showB);

    //guardar en la variable user los cambios que introduzco en los inputs(formulario)
    const onChangeInput2 = e => {
        const { name, value } = e.target
        setUser2({ ...user2, [name]: value })
        console.log(user2)
    }

    const RegisterSubmit = async e => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/register", { ...user2 })
            console.log(response)
            setSuccessMessage(response.data.message)
            console.log(successMessage)
        } catch (error) {
            setErrorMessage(error.response.data.message)
            console.log(error.response.data.message)
        }
    }



    
        const Home = () => {
            return (
                <div className='home'>
                    <div className='banner'>
                        <a>Lemon</a>
                        <img src={logo} style={{ width: "120px", height: "120px" }} alt="" />
                        <a>Pair</a>
                    </div>
                    <p>Crossfit app</p>


                    {/* Boton para enviar formulario de login */}
                    <button className="button-56" onClick={handleShow}>
                        Login
                    </button>

                    {/* Modelo y formulario de inicio de sesion login si registrado */}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header className="fondoPopup" closeButton>
                            <Modal.Title >LemonPair - ¡Nos encanta que vuelvas!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={LoginSubmit}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Dirección de correo electrónico</Form.Label>
                                    <Form.Control type="email" name="email" value={user.email} onChange={onChangeInput}
                                        placeholder="name@example.com"
                                        autoFocus
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control name="password" value={user.password} onChange={onChangeInput}
                                        type="password"
                                        placeholder="password"
                                        autoFocus
                                    />
                                </Form.Group>
                                <Button className="buttonCancel" variant="secondary" onClick={handleClose}>
                                    Cancelar
                                </Button>
                                <Button className="buttonLogin" variant="primary" onClick={handleClose} type="submit">
                                    Iniciar sesión
                                </Button>

                            </Form>
                        </Modal.Body>


                        {/* Pop up  si inicio OK o algun error en formulario */}
                        <ToastContainer style={{ display: successMessage ? "block" : "none" }}>
                            <Toast show={showA} onClose={toggleShowA}>
                                <Toast.Header closeButton="true">
                                    <img src="holder.js/20x20?text=%20" className="rounded me-3" alt="" />
                                    <strong className="me-auto" >LemonPair</strong>
                                </Toast.Header>
                                <Toast.Body> {successMessage} </Toast.Body>
                            </Toast>
                        </ToastContainer>

                        <ToastContainer style={{ display: errorMessage ? "block" : "none" }}>
                            <Toast show={showA} onClose={toggleShowA}>
                                <Toast.Header>
                                    <img src="holder.js/20x20?text=%20" className="rounded me-3" alt="" />
                                    <strong className="me-auto" >LemonPair</strong>
                                </Toast.Header>
                                <Toast.Body> {errorMessage} </Toast.Body>
                            </Toast>
                        </ToastContainer>

                    </Modal>

                    {/* modelo y formulario para REGISTRO */}
                    <button className="button-56" role="button" variant="primary" onClick={handleShow2}>
                        Registrarme
                    </button>

                    <Modal show={show2} onHide={handleClose2}>
                        <Modal.Header className="fondoPopup" closeButton>
                            <Modal.Title >LemonPair - ¡Bienvenido!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={RegisterSubmit}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="name" name="name" value={user2.name} onChange={onChangeInput2}
                                        placeholder="name"
                                        autoFocus
                                    />
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control type="surname" name="surname" value={user2.surname} onChange={onChangeInput2}
                                        placeholder="surname"
                                        autoFocus
                                    />
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Dirección de correo electrónico</Form.Label>
                                    <Form.Control type="email" name="email" value={user2.email} onChange={onChangeInput2}
                                        placeholder="name@example.com"
                                        autoFocus
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control name="password" value={user2.password} onChange={onChangeInput2}
                                        type="password"
                                        placeholder="password"
                                        autoFocus
                                    />
                                </Form.Group>
                                <Button className="buttonCancel" variant="secondary" onClick={handleClose2}>
                                    Cancelar
                                </Button>
                                <Button className="buttonLogin" variant="primary" onClick={handleClose2} type="submit">
                                    Registrar
                                </Button>

                            </Form>
                        </Modal.Body>


                        {/* Pop up  si inicio OK o algun error en formulario */}
                        <ToastContainer style={{ display: successMessage ? "block" : "none" }}>
                            <Toast show={showB} onClose={toggleShowB}>
                                <Toast.Header closeButton="true">
                                    <img src="holder.js/20x20?text=%20" className="rounded me-3" alt="" />
                                    <strong className="me-auto" >LemonPair</strong>
                                </Toast.Header>
                                <Toast.Body> {successMessage} </Toast.Body>
                            </Toast>
                        </ToastContainer>

                        <ToastContainer style={{ display: errorMessage ? "block" : "none" }}>
                            <Toast show={showB} onClose={toggleShowB}>
                                <Toast.Header>
                                    <img src="holder.js/20x20?text=%20" className="rounded me-3" alt="" />
                                    <strong className="me-auto" >LemonPair</strong>
                                </Toast.Header>
                                <Toast.Body> {errorMessage} </Toast.Body>
                            </Toast>
                        </ToastContainer>
                    </Modal>
                </div>
            )
        }
 return(
    <div>
        {Home()}
    </div>
    )
}


export default Intro