import { Request, Response } from 'express';
import { prisma } from '../services/prisma';
import { Prisma } from '@prisma/client';

export const createGuest = async (req: Request, res: Response) => {
  const { name, email, phone, companions, isConfirmed, message } = req.body;
  try {
    const guest = await prisma.guest.create({
      data: { name, email, phone, companions, isConfirmed, message },
    });
    res.status(201).json(guest);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      // Erro de duplicidade no campo único
      res.status(400).json({
        error: `Já existe um convidado com o email: ${email}`,
      });
      return;
    }
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar convidado' });
  }
};

export const getAllGuests = async (_: Request, res: Response) => {
  try {
    const guests = await prisma.guest.findMany();
    res.json(guests);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar convidados' });
  }
};

export const confirmRsvp = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const guest = await prisma.guest.update({
      where: { id },
      data: { isConfirmed: true },
    });
    res.json(guest);
  } catch (err) {
    res.status(404).json({ error: 'Convidado não encontrado' });
  }
};