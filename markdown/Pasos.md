# Orden de creacion de funcionalidad de la aplicacion

1. Configuracion inicial de package.json, express, nodemon, gitignore.
2. Creamos ruta estatica para la carpeta ./public
3. Utilizamos el metodo .join() de "path" para no tener inconvenientes con las rutas de distintos sistemas operativos
4. Creamos las plantillas html en /views
5. Creamos las rutas de acceso HTTP en /routes
6. Creamos el middleware para logger (historial de registro) en ./middleware/registrador.js o ./middleware/logger.js
7. Creamos el middleware: manejadorDeErrores.js
8. Creamos el Objeto con opciones para CORS y le pasamos al metodo cors(). Usamos cors() como middleware.
9. Creamos los modelos Usuario y Notas.
10. Creamos los controladores para Usuario y Notas.
11.
