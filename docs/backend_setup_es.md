# Instrucciones para configurar el backend

Este proyecto incluye una API basada en **Node.js** y **Express** ubicada en la carpeta `server`.
A continuación se describen los pasos básicos para ponerla en marcha y cómo utilizar la interfaz
administrativa para gestionar la documentación, las imágenes de aviones y las entradas del blog.

## Requisitos previos
- [Node.js](https://nodejs.org/) 18 o superior

## Instalación
1. Clonar el repositorio y entrar en la carpeta del proyecto:
   ```bash
   git clone <URL-del-repositorio>
   cd AirTraderPro
   ```
2. Instalar las dependencias del frontend y del backend:
   ```bash
npm install
npm install firebase
cd server && npm install
 cp .env.example .env # añade tu JSON de cuenta de servicio de Firebase
 cd ..
 cp .env.example .env # añade la configuración web de Firebase para el frontend
 # El archivo de ejemplo ya incluye el ID del proyecto (aviacion360-7a463)
 # y el número del proyecto/messaging sender ID (972139427481).
 # Solo debes rellenar tu API key, app ID y measurement ID.
   ```

## Puesta en marcha
Se recomienda abrir dos terminales.

1. **Iniciar el backend**
   ```bash
   cd server
   npm start
   ```
   El servidor quedará disponible en `http://localhost:5000`.

2. **Iniciar el frontend**
   ```bash
   npm run dev
   ```
   La aplicación web se servirá en `http://localhost:5173`.

## Uso de la página de administración
1. Accede a `http://localhost:5173/login` e inicia sesión con un usuario de Firebase
   creado en la consola de autenticación. Ya no se utilizan credenciales fijas en el servidor.
2. Tras iniciar sesión, podrás crear, editar o eliminar:
   - Aviones en la sección **Inventory**.
  - Entradas de blog en la sección **Blog**.
  Las imágenes subidas se guardan en la carpeta `server/uploads`.
  Los datos de inventario y blog se almacenan en Firebase Firestore.

Con estos pasos la aplicación quedará funcionando de forma local, permitiendo gestionar
la documentación de tus aviones, imágenes y artículos del blog desde la interfaz de backend.
