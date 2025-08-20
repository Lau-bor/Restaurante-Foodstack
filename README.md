# 🍽️ FoodStack  

FoodStack es una aplicación web para la gestión de pedidos de un restaurante. Incluye un **backend con Node.js/Express/MongoDB** y un **frontend en React con Vite**, permitiendo a los usuarios explorar el menú, registrarse, realizar pedidos y gestionar órdenes desde un panel administrativo.  

---

## 🚀 Tecnologías utilizadas  

### Backend  
- **Node.js + Express** – Servidor y API REST  
- **MongoDB + Mongoose** – Base de datos  
- **JWT (jsonwebtoken)** – Autenticación  
- **Bcrypt** – Encriptación de contraseñas  
- **Multer** – Subida de archivos (ej. imágenes de perfil o menú)  
- **Nodemailer + Handlebars** – Envío de emails (verificación, notificaciones)  
- **MercadoPago SDK** – Pasarela de pagos  
- **Zod** – Validación de datos  
- **Morgan & CORS** – Middlewares de logging y seguridad  

### Frontend  
- **React 18 + Vite** – Interfaz rápida y moderna  
- **React Router DOM** – Navegación  
- **Bootstrap / React-Bootstrap** – Estilos y UI components  
- **Formik + Yup** – Formularios y validaciones  
- **Axios** – Peticiones HTTP  
- **SweetAlert2 + React Hot Toast** – Notificaciones amigables  
- **EmailJS** – Contacto desde frontend  

---

## 📂 Estructura del proyecto  

backend/

├── public/uploads/ # Archivos subidos (menu, perfil, etc.)

├── src/

│ ├── controllers/ # Lógica de negocio

│ ├── helpers/ # Funciones auxiliares

│ ├── middlewares/ # Middlewares de Express

│ ├── models/ # Modelos de MongoDB

│ ├── routes/ # Endpoints de la API

│ ├── validators/ # Validaciones con Zod

│ └── views/emails/ # Templates para correos

├── app.js # Configuración principal de Express

├── db.js # Conexión a la base de datos

└── index.js # Entry point del backend

frontend/

├── public/ # Recursos estáticos

├── src/

│ ├── components/ # Componentes reutilizables (Navbar, Footer, etc.)

│ ├── pages/ # Páginas (Home, Login, Register, Orders...)

│ ├── context/ # Context API (estado global)

│ ├── services/ # Llamadas a la API

│ ├── App.jsx # Configuración principal

│ ├── main.jsx # Entry point

│ └── index.css # Estilos globales

└── vite.config.js

---

## ⚙️ Instalación y ejecución  

### 1️⃣ Clonar el repositorio  
bash
git clone https://github.com/tu-usuario/foodstack.git
cd foodstack

2️⃣ Backend
cd backend
npm install
npm run dev   # arranca con nodemon
👉 Por defecto corre en http://localhost:5000

3️⃣ Frontend
cd frontend
npm install
npm run dev
👉 Por defecto corre en http://localhost:5173

🔑 Variables de entorno

Crear un archivo .env en el backend con las siguientes variables:

PORT=4000

MONGO_URI=tu_conexion_mongodb

JWT_SECRET=clave_super_secreta

EMAIL_USER=tu_correo

EMAIL_PASS=tu_password

MERCADOPAGO_ACCESS_TOKEN=tu_token

📌 Funcionalidades principales

✅ Registro y login con JWT

✅ Gestión de usuarios y perfiles

✅ Catálogo de menú con imágenes

✅ Carrito de compras

✅ Notificaciones por correo (registro, confirmación de pedido)

✅ Integración con MercadoPago

🤝 Contribución

Haz un fork del proyecto

Crea una nueva rama (git checkout -b feature/nueva-funcionalidad)

Haz commit de tus cambios (git commit -m 'Agrega nueva funcionalidad')

Haz push a la rama (git push origin feature/nueva-funcionalidad)

Crea un Pull Request
