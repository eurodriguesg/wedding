// filepath: c:\Users\elise\OneDrive\DOCUMENTOS\PROJETO\wedding-site\src\controllers\message.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../services/prisma';

export const createMessage = async (req: Request, res: Response) => {
  const { name, content } = req.body;
  try {
    const message = await prisma.message.create({
      data: { name, content },
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar mensagem' });
  }
};

export const getPublicMessages = async (_: Request, res: Response) => {
  try {
    const messages = await prisma.message.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar mensagens públicas' });
  }
};

export const getAllMessages = async (_: Request, res: Response) => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar todas as mensagens' });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.message.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: 'Mensagem não encontrada' });
  }
};

export const approveMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const message = await prisma.message.update({
      where: { id },
      data: { approved: true },
    });
    res.json(message);
  } catch (err) {
    res.status(404).json({ error: 'Mensagem não encontrada' });
  }
};