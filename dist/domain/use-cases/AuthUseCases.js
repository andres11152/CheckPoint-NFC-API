"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.AuthUseCases = void 0;
const uuid_1 = require("uuid");
const bcrypt = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const Admin_1 = require("../entities/Admin");
class AuthUseCases {
    // El caso de uso depende del puerto del repositorio, que se inyecta.
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    /**
     * Procesa el login de un administrador.
     */
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1. Buscar al administrador por su nombre de usuario.
            const admin = yield this.adminRepository.findByUsername(credentials.username);
            if (!admin) {
                return null; // Usuario no encontrado.
            }
            // 2. Comparar la contraseña enviada con el hash guardado en la base de datos.
            const isPasswordValid = yield bcrypt.compare(credentials.password, admin.password);
            if (!isPasswordValid) {
                return null; // Contraseña incorrecta.
            }
            // 3. Si las credenciales son válidas, generar un JSON Web Token (JWT).
            const payload = { id: admin.id, username: admin.username };
            const secret = process.env.JWT_SECRET || 'una-clave-secreta-por-defecto-muy-segura';
            const token = jwt.sign(payload, secret, {
                expiresIn: '8h', // El token expirará en 8 horas.
            });
            return { token };
        });
    }
    /**
     * (Método extra) Registra un nuevo administrador.
     * Útil para un script de configuración inicial.
     */
    registerAdmin(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            // Hashear la contraseña antes de guardarla.
            const hashedPassword = yield bcrypt.hash(credentials.password, 10);
            const adminId = (0, uuid_1.v4)();
            const newAdmin = new Admin_1.Admin(adminId, credentials.username, hashedPassword);
            return this.adminRepository.save(newAdmin);
        });
    }
}
exports.AuthUseCases = AuthUseCases;
