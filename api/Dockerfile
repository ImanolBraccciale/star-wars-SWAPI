# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json (o yarn.lock) para instalar dependencias
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install --production

# Copia el resto de los archivos de la aplicación
COPY . .

# Compila el código TypeScript a JavaScript (si es necesario)
RUN npm run build

# Establece las variables de entorno
ENV DB_URL=mongodb://mongo:27017/Starwars

# Expone el puerto que usará tu aplicación
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]
