import { Request, Response, NextFunction } from 'express';
import { verifyToken }                     from '../utils/jwt';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Token não informado' });
    return; // Garante que a função termine aqui
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    (req as any).admin = decoded; // Anexa os dados decodificados ao objeto `req`
    next(); // Passa para o próximo middleware ou rota
  } catch (err) {
    res.status(403).json({ error: 'Token inválido ou expirado' });
    return; // Garante que a função termine aqui
  }
};