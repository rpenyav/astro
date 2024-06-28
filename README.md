![Astro Logo](logotipo-astro.png)

### Backend

1. crear una bbdd en mongodb/atlas
2. importar el archivo data.json en la bbdd ([descargar aquí](https://www.transfernow.net/dl/20240628AtYJYEuL), si no está disponible escriba un correo a rafa@rafapenya.com)
3. abrir env.template y poner la url mongodb de la bbdd y la database
   ejemplo:
   ` 
DATABASE_URL=mongodb+srv://tu_usuario:tu_pass@cluster0.444343.mongodb.net/astro
JWT_SECRET=your_secret_key`

4. convertir env.template en .env

```
cd backend-astro
npm install
npm run start
```

### Frontend

1. Cambiar el nombre de env.template a .env sin modificar el contenido (la bbdd conecta en el puerto 3002)

```
npm install
npm run start
```

Credenciales de acceso como user "User":
`"email": "test@test.com",
  "password": "123456789",`

**(NOTA: solo los usuarios "Admin" tiene acceso al backoffice)**

### Mobile

**Instalar en local el proyecto:**
Cambiar el nombre de env.template a .env

```
npm install
```

Visualizar según el SO/navegador/emulador (chrome, android, iOS)

**Instalar APK:**
Descargar apk de aqui (nota, no conectará a la bbdd porque está levantada en local,pendiente de colgar backend en heroku)
