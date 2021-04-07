# Iniciar proyecto
Iniciar proyecto tanto en git como en node js
```bash
git init      ##Iniciar repositorio git
npm init -y   ##Iniciar proyecto nodejs
```
Instalamos express(que sirve la pagina) y esm(para variables de entorno)
```bash
npm install express ##Instalando express
npm install esm ##Instalando esm
```

Una vez esto ya podemos ejecutar nuestra app de manera local y sin un contenedor docker
```bash
node -r esm app.js
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