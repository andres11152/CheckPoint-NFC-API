export class AuthController {
    // El controlador depende del puerto de servicio (el caso de uso)
    constructor(authService) {
        this.authService = authService;
    }
    async login(req, res) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
                return;
            }
            const result = await this.authService.login({ username, password });
            if (!result) {
                res.status(401).json({ message: 'Credenciales inválidas.' });
                return;
            }
            res.status(200).json(result); // Devuelve { token: '...' }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }
}
