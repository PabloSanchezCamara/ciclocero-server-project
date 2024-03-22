# CICLOCERO

## [ Prueba la App!] (https://ciclocero.netlify.app/)



## Description

Ciclocero es una plataforma diseñada por Francisco Estepa y Pablo Sánchez, estudiantes de Web Dev en Ironhack, para su proyecto final de Bootcamp. Esta plataforma está creada para entusiastas del ciclismo que
buscan explorar nuevas rutas y compartir experiencias con
otros usuarios de la comunidad ciclista. Con Ciclocero, los
usuarios pueden crear, descubrir y compartir sus rutas favoritas para bicicleta, junto con descripciones detalladas, información sobre modalidad, distancias, reseñas, fotos y puntos de interés en el camino. Para plasmar la información hemos creado un <a href="https://github.com/PabloSanchezCamara/ciclocero-server-project"> servidor backend </a> donde almacenamos la información de los distintos modelos (rutas, reseñas y usuarios), y las distintas rutas que hemos usado, tanto de verificación de usuarios como recibir información.

Toda la App ha sido desarrollada con con herramientas de React, JavaScript, CSS, Node, Express, además de las librerias de <a href="https://react-leaflet.js.org/">Leaflet</a>, <a href="https://www.react-simple-maps.io/">react-simple-maps </a>, <a href="https://cloudinary.com/">Cloudinary</a>, <a href="https://www.davidhu.io/react-spinners/"> REACT SPINNERS by David Hu </a>, <a href="https://react-bootstrap.netlify.app/">Bootstrap</a> y <a href="https://www.npmjs.com/package/react-burger-menu">react-burger-menu</a>

#### [Client Repo here](https://github.com/fraestgue/ciclocero-project3)

#### [Server Repo here](https://github.com/PabloSanchezCamara/ciclocero-server-project)

## Technologies, Libraries & APIs used

**Tecnologías usadas: -**

-   HTML
-   JavaScript
-   CSS
-   React
-   axios
-   Express
-   MongoDB
-   Node.js
-   React Context

## Librerias:

#### [Bootstrap](https://react-bootstrap.netlify.app/)

#### [REACT SPINNERS by David Hu](https://www.davidhu.io/react-spinners/)

### [Leaflet](https://react-leaflet.js.org/)

### [react-simple-maps](https://www.react-simple-maps.io/)

### [Cloudinary](https://cloudinary.com/)

### [react-burger-menu](https://www.npmjs.com/package/react-burger-menu)

## Backlog Functionalities

-   Que cuando selecciones una provincia el crear la ruta aparezca el mapa con esas coordenadas
-   Limitar las reseñas del usuario en una misma ruta
-   Sección de favoritos
-   Poder editar las rutas


# Server Structure

## Models

User model

```javascript
{
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    username: {
      type: String,
      required: true,
      unique: true
    }, 
    image: {
      type: String,
      default: "https://i.pinimg.com/564x/67/2c/d6/672cd616936e481ef2632306731a87cd.jpg"
    },
}
```

Rutas model

```javascript
{
        name: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
        enum: ["fácil", "media", "difícil", "profesional"]
    },
    distanciaEnKm: {
        type: Number, 
        required: true
    },
    desnivelEnM: {
        type: Number, 
        required: true
    }, 
    duracionEnHoras: {
        type: Number, 
        required: true
    },
    modalidad: {
        type: String,
        required: true,
        enum: ["montaña", "urbano", "carretera", "gravel"]
    }, 
    provincia: {
        type: String,
        required: true,
        enum: ["alava", "almeria", "avila", "asturias", "badajoz", "baleares", "barcelona", "burgos", "cantabria", "castellon", "ciudad real", "cuenca", "caceres", "cadiz","cordoba","girona","granada","guadalajara","guipuzcoa","huelva","huesca","jaen","la coruña","la rioja","las palmas","leon","lugo","lerida","madrid","murcia","malaga","navarra","orense","palencia","pontevedra","salamanca","tenerife","segovia","sevilla","soria","tarragona","teruel","toledo","valencia","valladolid","vizcaya","zamora","zaragoza"]
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    image: {
        type: String,
        default: "https://www.lugaresdeaventura.com/sites/default/files/2018-07/suiza-paraiso-ciclista-portada.jpg"
    },
    coordinatesStart: [Number], 
    coordinatesEnd: [Number]
}
```

Reseñas model

```javascript
{
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
    ruta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ruta"
    },
    image: {
        type: String,
        default: ""
    }
}
```

## API Endpoints (backend routes)

| HTTP Method | URL /api                | Request Body                               | Success status | Error Status | Description                            |
| ----------- | ----------------------- | ------------------------------------------ | -------------- | ------------ | -------------------------------------- |
| POST        | `/auth/signup`          | {username, email, password}                | 201            | 400          | Registers the user in the Database     |
| POST        | `/auth/login`           | {username/email password}                  | 200            | 400          | Valida credentials, crea y manda Token |
| GET         | `/auth/verify`          |                                            | 200            | 400          | Verifies the user Token                |
| POST        | `/reviews`              | {title, description, creador, ruta, image} | 201            | 400          | Crea una reseña                        |
| GET         | `/reviews/rutas/:rutaId`|                                            | 200            | 400          | Reseñas de una ruta                    |
| DELETE      | `/reviews/:reviewId`    |                                            | 202            | 400     | Elimina una reseña                     |
| GET         | `/rutas`                |                                            | 200            | 400          | Lista todas las rutas                  |
| GET         | `/rutas/user`           |                                            | 200            | 400          | Lista rutas del user                   |
| GET         | `/rutas/query`          |                                            | 200            | 400          | Lista rutas con querys                 |
| GET         | `/rutas/:rutaId`        |                                            | 200            | 400          | Detalles de una ruta                   |
| POST        | `/rutas`               |{name, difficulty, distanciaEnKm, desnivelEnM, duracionEnHoras, modalidad, provincia, creador, image, coordinatesStart, coordinatesEnd} | 201            | 400          | Crea una ruta          |
| PATCH       | `/rutas/:rutaId`        | { name, difficulty, distanciaEnKm, desnivelEnM, duracionEnHoras, modalidad, provincia } | 202            | 400          | Edita una ruta                         |
| DELETE      | `/rutas/:rutaId`        |                                            | 202            | 400          | Elimina una ruta                        |
| GET         | `/user`                 |                                            | 200            | 400          | Detalles del usuario                    |
| PATCH       | `/user/image`           | {image}                                    | 202            | 400          | Editar imagen user                      |
| PATCH       | `/user/password`        | {password}                                 | 202            | 400          | Editar password                         |
| PATCH       | `/user/email`           | {email}                                    | 202            | 400          | Editar email                            |
| PATCH       | `/user`                 | {username}                                 | 202            | 400          | Editar username                         |
| POST        | `/upload`               |                                            | 200            | 400          | Subir una foto                          |

  



## Links

### Collaborators

-   Fran Estepa
    [Github](https://github.com/fraestgue)
    [Linkedin](https://www.linkedin.com/in/francisco-estepa-guerra-400417163/)

-   Pablo Sánchez
    [Github](https://github.com/PabloSanchezCamara)
    [Linkedin](https://www.linkedin.com/in/pablo-sanchez-camara-b143892b4/)

### Project

[Repository Link Client](https://github.com/fraestgue/ciclocero-project3)

[Repository Link Server](https://github.com/PabloSanchezCamara/ciclocero-server-project)

[Deploy Link](https://ciclocero.netlify.app/)

### Excalidraw

[Link](https://excalidraw.com/#json=CIH812HxVxiC39UfiBA_S,ooDX6aZCkTnmbT5LN88csw)

### Slides

[Slides Link](https://docs.google.com/presentation/d/12-Q07jMcPCNBzKuRjoFAa8XXq2U0fdJgXHGUdvWhvzY/edit?hl=es#slide=id.g2c5787f0142_0_101)
