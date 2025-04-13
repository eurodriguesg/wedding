import { Request, Response } from 'express';
import bcrypt                from 'bcryptjs';
import { prisma }            from '../services/prisma';
import { generateToken }     from '../utils/jwt';

export const register = async (req: Request, res: Response): Promise<void> => {

  const { name, email, password } = req.body;
  console.log('Register:', { name, email, password });
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.admin.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ message: 'Administrador criado com sucesso' });

    return; // Adicionado para garantir que a função termine aqui
  } catch (err) {

    res.status(400).json({ error: 'Erro ao criar administrador' });
    return; // Adicionado para garantir que a função termine aqui
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return; // Adicionado para garantir que a função termine aqui
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      res.status(401).json({ error: 'Senha incorreta' });
      return; // Adicionado para garantir que a função termine aqui
    }

    const token = generateToken({ id: admin.id, email: admin.email });
    res.json({ token });
    return; // Adicionado para garantir que a função termine aqui
  } catch (err) {
    res.status(500).json({ error: 'Erro no login' });
    return; // Adicionado para garantir que a função termine aqui
  }
};