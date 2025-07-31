export class Admin {
  readonly id: string;
  readonly username: string;
  readonly password: string; // Este será el hash de la contraseña, no el texto plano

  constructor(id: string, username: string, passwordHash: string) {
    this.id = id;
    this.username = username;
    this.password = passwordHash;
  }
}