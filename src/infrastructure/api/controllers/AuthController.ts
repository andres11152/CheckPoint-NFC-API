import { Request, Response } from 'express';
import { AuthServicePort } from '../../../domain/ports/in/AuthServicePort';

export class AuthController {
  // El controlador depende del puerto de servicio (el caso de uso)
  constructor(private readonly authService: AuthServicePort) {}

  async login(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
      return;
    }

    const result = await this.authService.login(username, password);

    if (!result) {
      res.status(401).json({ message: 'Credenciales inválidas.' });
      return;
    }

    // Si result es string (token), envía como { token: result }
    if (typeof result === 'string') {
      res.status(200).json({ token: result });
    } else {
      // Si result es objeto con token dentro
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
}

}