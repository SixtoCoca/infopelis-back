# Iniciar proyecto
Instalamos las dependecias
```bash
npm install 
```

Una vez esto ya podemos ejecutar nuestra app de manera local y sin un contenedor docker
```bash
node -r esm src/app.js
```

Comandos
```bash
npm start ## ejecutamos normal
npm run dev ##ejecutamos con nodemon
```


Instalamos docker ,creamos el Dockerfile, y luego creamos la imagen con el siguiente comando
```bash
sudo docker build -t infopelis . ##-t la etiqueta y el . el directorio donde se encuentra el Dockerfile
```

Una vez hecho esto podemos comprobar si hemos creado la imagen
```bash
sudo docker images
```

Ejecutamos nuestra app con el contenedor Docker
```bash 
sudo docker run -p 8000:8000 -t infopelis ## Con esto nuestra app escuchar en http://localhost:8000/
sudo docker run -p 3000:8000 -t infopelis ## Con esto nuestra app escuchar en http://localhost:3000/
```