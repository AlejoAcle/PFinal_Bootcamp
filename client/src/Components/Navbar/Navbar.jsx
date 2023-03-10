import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import logo from '../Images/Lemon.png'




// import {link} from 'react-router-dom'


const Navbar = () => {
  const role = localStorage.getItem("role")

  //barra a mostrar si rol=1 ADMIN
  const AdminNavbar = () => {
    return (

      <div className='adminNavbar'>
        <div className='home'>
          <div className='banner'>
            <a>Lemon</a>
            <Link to="/home">
              <img src={logo} style={{ width: "80px", height: "80px" }} alt="" />
            </Link>
            <a>Pair</a>
          </div>
        </div>

        
        <Nav className="justify-content-center" activeKey="/home">
          <Nav.Item className="Navbutton">
            <Nav.Link className='colorButton' href="/home">Perfil</Nav.Link>
          </Nav.Item>
          <Nav.Item className="Navbutton">
            <Nav.Link className='colorButton' href="/listclasses" eventKey="link-1">Reservas</Nav.Link>
          </Nav.Item>
          <Nav.Item className="Navbutton">
            <Nav.Link className='colorButton' href="/classeslist" eventKey="link-2">Horarios</Nav.Link>
          </Nav.Item>

          <Nav.Item className="Navbutton">
            <Nav.Link className='colorButton' eventKey="link-4" href="/wod">WODs</Nav.Link>
          </Nav.Item>

          <Nav.Item className="Navbutton">
            <Nav.Link className='colorButton' eventKey="link-9" href="/ejercicios">Ejercicios</Nav.Link>
          </Nav.Item>

        


          <li class="nav-item dropdown administrador">
            <a className="nav-link dropdown-toggle Navbutton1" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Administrador</a>
            <ul className="dropdown-menu Navbutton1">

              <Nav.Item className="Navbutton2">
                <Nav.Link className='colorButton' href="/users" eventKey="link-7"> Borrar Usuario</Nav.Link>
              </Nav.Item>

              <Nav.Item className="Navbutton2">
                <Nav.Link className='colorButton' href="/classesAdd" eventKey="link-5"> Crear Clase</Nav.Link>
              </Nav.Item>

              <Nav.Item className="Navbutton2">
                <Nav.Link className='colorButton' href="/newWod" eventKey="link-3"> Crear WOD</Nav.Link>
              </Nav.Item>

            </ul>
          </li>
          <Nav.Item className="Navbutton">
            <Nav.Link className='colorButton' href="/logout" eventKey="link-8"> Cerrar sesión</Nav.Link>
          </Nav.Item>
        </Nav>

      </div>
    )
  }


  //barra a mostrar si rol = 0 USER
  const UserNavbar = () => {
    return (
      <div>
                <div className='home'>
          <div className='banner'>
            <a>Lemon</a>
            <Link className='Link' to='/home'>
            <img src={logo} style={{ width: "80px", height: "80px" }} alt="" />
            </Link>
            <a>Pair</a>
          </div>

        </div>
        <div className='userNavbar'>
          <Nav className="justify-content-center" activeKey="/home">
            <Nav.Item className="Navbutton">
              <Nav.Link className='colorButton' href="/profile">Perfil</Nav.Link>
            </Nav.Item>
            <Nav.Item className="Navbutton">
              <Nav.Link className='colorButton' eventKey="link-1" href="/listclasses">Reservas</Nav.Link>
            </Nav.Item>
            <Nav.Item className="Navbutton">
              <Nav.Link className='colorButton' eventKey="link-2" href="/classeslist">Horario</Nav.Link>
            </Nav.Item>
            <Nav.Item className="Navbutton">
              <Nav.Link className='colorButton' eventKey="link-3" href="/ejercicios">Ejercicios</Nav.Link>
            </Nav.Item>
            <Nav.Item className="Navbutton">
              <Nav.Link className='colorButton' href="/newExercise" eventKey="link-5"> Crear Ejercicio</Nav.Link>
            </Nav.Item>
            <Nav.Item className="Navbutton">
              <Nav.Link className='colorButton' eventKey="link-4" href="/wod">WODs</Nav.Link>
            </Nav.Item>
            <Nav.Item className="Navbutton">
              <Nav.Link className='colorButton' eventKey="link-5" href="/logout">Cerrar sesión</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

      </div>
    )
  }


  //compuesto por componentes para login o registro,
  //dos botones que desencadenen formulario para login o registrarse como nuevo user.
  //el banner se mantiene como formato de encabezado de esta "pagina"


  // let nav = role == 0 ? UserNavbar() : role == 1 ? AdminNavbar()
  return (
    <>
      {role == 0 ? UserNavbar() : AdminNavbar()}
      {/* {nav} */}
    </>
  )
}

export default Navbar