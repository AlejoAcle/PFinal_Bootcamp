# T铆tulo del Proyecto

<p align="center" fontweight="bold">Desarrollo Backend para aplicaci贸n de Crossfit</p>
<p align="center">
    <img src = "https://github.com/AlejoAcle/PFinal_Bootcamp/blob/master/images/Portada.png" widht="600px" height="200px">
</p>

## Comenzando 馃殌

_Proyecto 3 del Bootcamp **FullStack**_, creaci贸n del servidor y desarrollo del backend, para gesti贸n de reservas y usuarios de una aplicaci贸n para un centro de entrenamiento de Crossfit.


### Funcionalidades 馃搵

- Registro de nuevos usuarios
- Sistema de inicio de sesi贸n
- Subida de imagenes por el usuario para uso como avatar o imagen de perfil
- Creaci贸n de reservas para asistencia a entrenamients
- Base de ejercicios
- Posibilidad de registrar resultados y marcas personales por parte de cada usuario
- Creaci贸n de un perfil `ADMIN` para la gesti贸n de usuarios, datos e incidencias.


### Tecnolog铆as empleadas 馃敡


<p align="center"> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="60" height="60"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="60" height="60"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="60" height="60"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="60" height="60"/> </a> </p>




## Descripci贸n T茅cnica 鈿欙笍

Descripci贸n de las funcionalidades aplicadas.

### Funciones administrador 馃敥

- Al inicio de sesi贸n el sistema reconoce el rol del usuario, detectanto si es administrador o usuario.
- El administrador puede subir los horarios, los entrenos y crear/modificar la base de datos de ejericios.
- El administrador puede ver y gestionar las reservas de todos los usuarios as铆 como procesar la eliminaci贸n de los datos bajo petici贸n.


### Funciones usuario 鈱笍

- El usuario puede registrarse, iniciar sesi贸n y cambiar su imagen de perfil
- Selecci贸n de horario y posibilidad de guardar sus resultados.


## Construido con 馃洜锔?

* Desarrollo en `NodeJS`
* Base de datos alojada en `MongoAtlas`
* Servidor creado con `Express`
* Puerto servidor :5000

## Rutas 馃殔

Users 

-`.post(/register)`- Ruta abierta para que el usuario pueda hacer el registro

-`.post(/login)` - Ruta abierta donde el usuario puede iniciar su sesi贸n

-`.get(/updateProfile)` - Ruta para poder actualizar alg煤n parametro del usuario

-`.del(/deleteUser)` - Ruta que permite eliminar un usuario a trav茅s del token

-`.del(/destroyPhoto)` - Ruta para eliminar foto de perfil/usuario

-`.post(/upload)` - Ruta para subir una imagen de perfil/usuario

-`.get(/profile)` - Ruta que permite ver el perfil de usuario

-`.get(/exercicesUser)` - Ruta para ver los ejercicios del usuario al loguearse

-`.get(/usersList)` - Ruta para visualizar la totalidad de usuarios registrados

-`.del(deleteUsers/:id)` - Ruta para eliminar alg煤n usuario mediante su ID



Booking

-`.post(/newBooking)` - Ruta para realizar una reserva

-`.del(/deleteBooking/:id)` - Ruta para eliminar una reserva por ID


Classes

-`.get(/classes)` - Ruta para conocer las clases disponibles

-`.get(/newClasses)` - Ruta ADMIN para crear las clases 

-`.get(/updateClass/:id)` - Ruta ADMIN que permite modificar una clase a trav茅s de su ID

-`.del(/deleteClass/:id)` - Ruta ADMIN para eliminar la clase creada a trav茅s de su ID

-`.get(/classesList/:id)` - Ruta para ver clases y horario disponible a trav茅s del ID de la clase


Exercises

-`.put(/updateExercice/:id)` - Ruta para modificar un ejercicio a trav茅s de su ID

-`.del(/deleteExercice/:id)` - Ruta para eliminar un ejercico a trav茅s de su ID

-`.get(/exercises/:id)` - Ruta para poder ver los ejercicios

-`.post(/newExercises)`- Ruta para crear el repositorio de ejercicios

-`.post(/updateExercises/:id)` - Ruta que permite modificar cada ejercicio del repositorio


Marks

-`.del(/deleteUserMark/:id)` - Ruta que permite modificar las marcas publicadas por el usuario en alg煤n ejercicio, a trav茅s del ID

-`.post(/newMarks)` - Ruta para poder guardar los resultados personales


TimeTable

-`.post(/newTimeTable)` - Ruta ADMIN para crear el horario de entrenamiento de un d铆a

-`.put(/updateTimeTable/:id)` - Ruta ADMIN que permite modificar el horario creado

-`.del(/deleteTimeTable/:id)` - Ruta ADMIN para eliminar un horario publicado a trav茅s de su ID


WODs

-`.get(/wodsList)` - Ruta para conocer los wods que se programen

-`.post(/createWod)` - Ruta ADMIN para crear y publicar el entrenamiento del d铆a

-`.put(/updateWod/:id)` - Ruta ADMIN que permite modificar el entrenamiento del d铆a publicado

-`.del(/deleteWod/:id)` - Ruta ADMIN que permite modificar el entrenamiento del d铆a publicado


## Versionado 馃搶

v1.0(24.08.2022 - Presentaci贸n proyecto)

## Autores 鉁掞笍

* **Alejo** - *Trabajo Inicial* - [Alejo](https://github.com/AlejoAcle)
* **Alexandra** - *Mentora y soporte* - 

## Licencia 馃搫

Este proyecto est谩 bajo la Licencia AlejoAcle 






[Alejo](https://github.com/AlejoAcle) 馃鈥?
