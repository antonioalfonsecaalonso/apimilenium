docker-compose up -d
npm run start:dev

git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/antonioalfonsecaalonso/nestjs.git
git push -u origin main

***** produccion *****
lo primero que tenemos que hacer es configurar en el main.ts el cors, para que admita las peticiones desde el mismo dominio

git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/antonioalfonsecaalonso/nest.git
git branch -M main
git push -u origin main


----- AGREGAR A LA BASE DE DATOS LAS COSAS QUE FALTAN. -----

PROVINCIAS:
    España:
        INSERT INTO "public"."provincias" ("id", "name", "state_code", "paisId") VALUES (5117, 'Elche', 'EL', 207);
        INSERT INTO "public"."provincias" ("id", "name", "state_code", "paisId") VALUES (5118, 'Vigo', 'VI', 207);
        INSERT INTO "public"."provincias" ("id", "name", "state_code", "paisId") VALUES (5119, 'BARCELOS', 'BR', 207);
    Italia:
        INSERT INTO "public"."provincias" ("id", "name", "state_code", "paisId") VALUES (5120, 'PRATOS', 'PR', 107);


# Producciones notes:
git init
git add .
git commit -am "make it better"
git push heroku main


heroku logs --tail



# despues de subir
npm config set strict-ssl false

npm vagrant up


# ------- instalar -----------
lo primero es levantar la base de datos

docker-compose up

// instalamos los paises-ciudades-poblacion

http://localhost:3002/apiMilenium/instalaciones/creacion