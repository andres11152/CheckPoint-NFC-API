"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_source_1 = require("../../config/data-source"); // Importa tu data-source
const AdminTypeOrmRepository_1 = require("../../persistence/repositories/AdminTypeOrmRepository");
const AuthUseCases_1 = require("../../../domain/use-cases/AuthUseCases");
const AuthController_1 = require("../controllers/AuthController");
const router = (0, express_1.Router)();
// --- Inyección de Dependencias Manual ---
// 1. Se crea una instancia del Repositorio
const adminRepository = new AdminTypeOrmRepository_1.AdminTypeOrmRepository(data_source_1.AppDataSource);
// 2. Se inyecta el Repositorio en el Caso de Uso
const authService = new AuthUseCases_1.AuthUseCases(adminRepository);
// 3. Se inyecta el Caso de Uso en el Controlador
const authController = new AuthController_1.AuthController(authService);
// --- Definición de la Ruta ---
router.post('/login', (req, res) => authController.login(req, res));
exports.default = router;
