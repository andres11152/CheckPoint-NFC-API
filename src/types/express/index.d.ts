// src/types/express/index.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
        roles?: string[];
        // puedes agregar otras propiedades según tu token JWT
      };
    }
  }
}
