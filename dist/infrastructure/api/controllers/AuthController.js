"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    // El controlador depende del puerto de servicio (el caso de uso)
    constructor(authService) {
        this.authService = authService;
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                if (!username || !password) {
                    res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
                    return;
                }
                const result = yield this.authService.login({ username, password });
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
        });
    }
}
exports.AuthController = AuthController;
