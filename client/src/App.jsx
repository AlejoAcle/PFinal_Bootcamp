
import './App.css';



// import PopUp from './Components/PopUp/PopUp';

import Exercise from './Components/Exercise/Exercise';

import ClasesVer from './Components/Clases/ClasesVer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // esta importación es clave y ya saben que tiene que hacer
import Mark from './Components/Exercise/Marks';
import ExerciseAdd from './Components/Exercise/ExerciseAdd';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import MarksAdd from './Components/Exercise/MarkAdd';
import Logout from './Components/Logout/Logout';
import WodCreate from './Components/Wod/WodCreate';
import Intro from './Components/Intro/Intro';
import WodSee from './Components/Wod/WodSee';
import WodModify from './Components/Wod/WodModify';
import ProfileModify from './Components/Profile/ProfileModify';
import Timetable from './Components/Clases/Timetable';
import TimetableAdd from './Components/Clases/TimetableAdd';
import ClassesAdd from './Components/Clases/ClassesAdd';
import ProfileDeleteMaster from './Components/Profile/ProfileDeleteMaster';
import ProfilePhoto from './Components/Profile/ProfilePhoto';
import ClasesList from './Components/Booking/ClasesList';
import Booking from './Components/Booking/Booking';
// import ProfileData from './Components/Profile/ProfileData';




function App() {
  return (
    <div className="App">
      {/* etiqueta encargada de hacer enrutamiento */}
      <BrowserRouter>

        {/* si quiero que me muestre siempre algo esté donde esté,la etiqueta del componente fuera de routes */}
        {/* <Navbar /> */}
        {/* este engloba las rutas a crear para mostrar componentes y navegar */}
        <Routes>
          <Route path='/' element={<Intro />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/home" element={<Home />} />


          {/* AÑADIR EJERCICIOS Y VERLOS */}
          <Route path="/ejercicios" element={<Exercise />} />
          <Route path='/newExercise' element={<ExerciseAdd />} />
          {/* <Route path="/clases" element={<ClasesVer />} /> */}




          {/* CLASES Y HORARIOS */}
          <Route path="/classeslist" element={<ClasesVer />} />
          <Route path="/classesAdd" element={<ClassesAdd />} />
          <Route path="/timetables/:classesID" element={<Timetable />} />
          <Route path="/timetables/:classesID" element={<Timetable />}>
            <Route
              path="timetablesAdd/:classesID2"
              element={<TimetableAdd />}
            />
          </Route>




          <Route path='/logout' element={<Logout />} />

          {/* CREAR WOD Y VER POR ID */}
          <Route path='/newWod' element={<WodCreate />} />
          <Route path='/wod' element={<WodSee />} />
          <Route path='/wod/:wodID' element={<WodModify />} />



          {/* RUTAS DE PERFIL */}
          <Route path='/profile' element={<Profile />} >
            <Route path='profileModify' element={<ProfileModify />} />
          </Route>
          <Route path='/users' element={<ProfileDeleteMaster />} />
          <Route path='/profilephoto' element={<ProfilePhoto />} />

          {/* el componente marks no hace falta que esté en la navbar, va metido en los ejercicios */}
          <Route path='/marks/:exerciceID' element={<Mark />} />
          <Route path="/marksAdd/:exerciceID" element={<MarksAdd />} />

          {/* CLASES  - reservas  */}
          <Route path="/listclasses" element={<ClasesList />} />
          <Route path="/booking/:classID" element={<Booking />} />


        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
