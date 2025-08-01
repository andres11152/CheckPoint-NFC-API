// createAdmin.js
import * as bcrypt from 'bcryptjs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Por favor, ingresa la contraseña para encriptar (ej: admin): ', (password) => {
  if (!password) {
    console.error('No se ingresó ninguna contraseña.');
    rl.close();
    return;
  }

  // Genera el hash de la contraseña
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  console.log('\n--- ¡Hash generado con éxito! ---');
  console.log('Copia este hash y pégalo en la columna "password" de tu base de datos para el usuario "admin":\n');
  console.log(hashedPassword);
  console.log('\n---------------------------------');

  rl.close();
});