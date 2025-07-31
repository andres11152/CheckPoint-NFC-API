// createAdmin.js
const bcrypt = require('bcryptjs');

// La contraseña que quieres usar para tu administrador
const password = 'admin'; 
const saltRounds = 10;

const hash = bcrypt.hashSync(password, saltRounds);

console.log('Tu hash es:', hash);