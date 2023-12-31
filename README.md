# backend_ts_postgres

## Description:

API REST de libros con authenticacion y roles de usuarios, implementando Node.js, Express.js, Typescript, Json Web Token, Bcrypt, PostgresSql, Zod y Cookie-parser.

Todos los end-points de book tienen un middleware donde se verifica el token, los end-points de Auth y book tienen un middleware de Zod para validacion de datos.

Los end-points de admin tienen un middleware donde se verifa si son de rol user o admin, los administradores podras listar todos los usuarios, pedir un usuario especifico por id y cambiarle el status a los usuarios.


## Installation:

Para empezar, es necesario instalar las dependencias. Puede hacerlo ejecutando el siguiente comando en su terminal: Este comando instalará automáticamente todas las dependencias requeridas para el proyecto. Asegúrese de tener Node.js y npm (Node Package Manager) instalados en su máquina antes de ejecutar este comando.

```
npm install
```
### Archivo .env
1. Afuera de src crear un archivo .env y agregar lo siguiente
```
PORT=
JWT_SECRET=
DB_USER=
DB_PASSWORD=
DB_NAME=
```
- En PORT el numero de puerto donde quieres que se ejecute el servidor
- En JWT_SECRET tu codigo secreto para jwt
- En DB_USER tu usuario de postgres
- En DB_PASSWORD tu contraseña de postges
- En DB_NAME nombre de la base de datos

## Ejecutar el backend
Una vez que se completa la instalación, puede ejecutar el backend de la aplicación con el siguiente comando:

```
npm run dev
```
## PostgresSql Schemas

### Rol

```
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user"
    }
}
```

### User
```
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: "id"
        },
    }
}
```
### Book

```
{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 10
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    }
}
```

## Zod Schemas

### Auth signin validation body

```
{
    body: z.object({
        name: z.string().min(4),
        email: z.string().email(),
        password: z.string().min(6)
    })
}
```
### Auth signup validation body
```
{
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })
}
```

### created book validation
```
{
    body: z.object({
        title: z.string().min(4),
        author: z.string().min(4),
        rating: z.number().min(1).max(10)
    })
}
```

### Deleted book validation
```
{
    params: z.object({
        id: z.string()
    })
}
```

### Update book validation
```
{
    body: z.object({
        title: z.string().min(4),
        author: z.string().min(4).optional(),
        rating: z.number().min(1).max(10)
    }),
    params: z.object({
        id: z.string()
    })
}
```
### Patch book validation
```
{
    body: z.object({
        rating: z.number()
    }),
    params: z.object({
        id: z.string()
    })
}
```

## End-points

### Rol

## Created rol
```
localhost:{.evn}/v1/api/rol
```
1. Post: created rol
2. Body
```
{
    "role": (user o admin)
}
```

### All roles

1. Get: Obtener todos los roles
- Se obtendra un arreglo con todos los roles
```
Ejemplo
[
    {
        "id": 1,
        "role": "user"
    },
    {
        "id": 2,
        "role": "admin"
    }
]
```


### Registrarse
```
localhost:{.evn}/v1/api/sign-up
```
1. Post: signup user
2. Body
```
{
    "username": "",
    "email": "",
    "password":"",
    "rol": 1,
}
```
- Se optiene un status 200 si todo salio bien en caso contrario devulve un status 400.
- Si hay algun error en la solicitud del end-point sera validado por Zod antes de llegar a la ruta principal, si no hay errores en los datos ingresados pasara a la ruta principal en caso contrario se obtendra un status code 400 y el mensaje de error un array

### iniciar seccion
```
localhost:{.env}/v1/api/sign-in
```
1. Post: signin
2. Body
```
{
    "email": "",
    "password":""
}
```
- Los datos ingresados seran validos por Zod, si todo salio bien parasara a la ruta principal en caso contrario se obtendra un arreglo con el error y un status code 400.
- Se obtendra un objecto con el _id, username, email y el token del usuario, en caso contrario se obtendra un status code 400 y un objecto con el mesnaje de error

### book
```
localhost:{.env}/v1/api/book
```
1. Post: created book
2. Authentication Bearer
```
La ruta pasara por un middleware donde espera el token del usuario que trata de crear la tarea.
Se obtendra un status code 401 si el token no es valido en caso contrario pasara por otro middleware donde validara los datos ingresados.
```
3. Body
```
{
    "title": "",
    "author":"",
    "rating": 8
}
```
- Los datos ingresados seran validados por Zod, si no hay ningun error en los datos ingresados pasaran a la ruta principal, en caso contrario devolvera un arreglo con el error y un status code 400.
- Se obtendra un status code 201 y un objeto con la tarea creada en caso contrario un status code 404 y un objeto con el error.
4. GET: Obtener todas las tareas del usuario registrado
- Se obtendra un arreglo con todas las tareas que tiene el usuario
```
Ejemplo
[
    {
        "id": 1
        "title": "jujutsu kaisen",
        "author: "jujutsu",
        "rating": 10,
        "userId": 65
    }
]
```
5. GET/:id (Obtener un libro por id)
```
{
    "id": 1
    "title": "jujutsu kaisen",
    "author: "jujutsu",
    "rating": 10,
    "userId": 65
}
```
6. PUT/:id (Actualizar el libro segun el id)
```
{
    "title": "",
    "author": "",
    "rating": (numero del 1 al 10)
}
```
- El author es opcional

7. PATCH/:id (Actualizar solo el rating del libro por id)
```
{
    "rating": (numero del 1 al 10)
}
```
8. DELETE/:id (Eliminar un libro por id) 
- Se obtendra un status code 200 si la tarea se elimino en caso contrario se obtendra un status code 404