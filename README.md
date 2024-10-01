
  
 # Proyecto Swapi
## Tabla de Contenidos

1. [Descripción](#descripción)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Componentes](#Componentes)
4. [Imágenes](#imágenes)
5. [Instrucciones para Ejecutar](#instrucciones-para-ejecutar-el-frontend)

## Descripción
Este proyecto consiste en una aplicación de Nextjs y Nestjs para una prueba Tecnica, pero deseo que sirva de guía para otra persona que lo necesite. 

Estoy utilizando la Api SWAPI para traer información y almacenarla en mongoDB, pero como SWAPI no tiene IMAGENES, este proyecto no pudo aplicarse debido a que podia usar esa Api. Si es obligario para ustedes las imagenes, les recomiendo usar https://starwars-visualguide.com/#/ . Simplemente extraigan la info de Swapi, luego busquen por name exacto en visuaguide y guarden la imange.

 Si a alguno le ha ayudo, denme una estrella. Les deseo lo mejor 




## Estructura del Proyecto
```
/Star-Wrs-API
    /api
        /src
            /design
            /modules

        /test
    /front
        /public
        /src
            /app
            /components
            /dtos
            /hooks
            /pages
            /styles
            /utils
```

## Componentes
Desde el backend se sigue la estructura del patrón de diseño modular que establece Nestjs en su documentación, se crea una carpeta modulo que respeta la entidad de cada servicio (films,people,starships y planets).

Además iimplementé un CRON para que cuando sea Domingo y apenas inicie el servidor traiga la información mas reciente de la API mientras borra el contenido actual, esto es para mantener la información actualizada

En la carpeta design, se concentra funciones que utilizarán algún patrón de diseño (recomiendo que cada modulo tenga el propio por si desean hacer cambios particulares).

Mientras que en el front  se sigue un Patrón de componentes para su máxima reutilización, esto facilita y acorta el tiempo  en proyectos chicos y grandes.

Para base de datos utilicé monngoDB que recomiendo siempre establecer un filtro de IP para evitar problemas, se deja un ejemplo de como debe quedar. PSD:"Recuerden sacar los <>"

# Imágenes

![Home](/front/public/main.png)
![Card](/front/public//object.png)
![Search bar](/front/public//search.png)
![Item finded](/front/public//searchFind.png)
![Skeleton](/front/public//skel.png)



5. **Instrucciones para Ejecutar**

   1. **Clona el repositorio**:
      ```bash
      git clone https://github.com/tu_usuario/tu_repositorio.git
      ```

   2. **Navega al directorio del proyecto**:
      ```bash
      cd tu_repositorio
      ```

   3. **Instala las dependencias**:
      Asegúrate de tener [Node.js](https://nodejs.org/) instalado. Luego, ejecuta:
       ```bash
      cd api
      ```
        ```bash
      cd front
      ```
      y ejecuta en cada uno
      ```bash
      npm install 
      ```
      o si usas Yarn:
      ```bash
      yarn install
      ```

   4. **Inicia el servidor de desarrollo**:
      Ejecuta el siguiente comando para iniciar la aplicación en modo desarrollo:
      ```bash
      npm run dev en front
      ```
       ```bash
      npm start en back
      ```
      o si usas Yarn:
      ```bash
      yarn dev
      ```

   5. **Accede a la aplicación**:
      Abre tu navegador y visita [http://localhost:3000](http://localhost:3000) para ver la aplicación en ejecución.

   6. **Construye la aplicación para producción**:
      Para crear una versión optimizada para producción, ejecuta:
      ```bash
      npm run build y npm start para api
      ```
      o si usas Yarn:
      ```bash
      yarn build
      ```

   7. **Ejecuta la aplicación en modo producción**:
      Una vez construida, puedes ejecutar la aplicación en modo producción con:
      ```bash
      npm start
      ```
      o si usas Yarn:
      ```bash
      yarn start
      ```
 
