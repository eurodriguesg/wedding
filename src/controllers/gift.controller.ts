import { Request, Response } from 'express';
import { prisma } from '../services/prisma';
import { Prisma } from '@prisma/client';

export const createGift = async (req: Request, res: Response) => {
    const { name, description, imageUrl, link, isPurchased, purchaser } = req.body;
    try {
      const gift = await prisma.gift.create({
        data: { name, description, imageUrl, link, isPurchased, purchaser },
      });
      res.status(201).json(gift);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        // Erro de duplicidade no campo único
        res.status(400).json({
          error: `Já existe um presente com o nome: ${name}`,
        });
        return;
      }
      res.status(500).json({ error: 'Erro ao criar presente' });
    }
  };

export const getAllGifts = async (_: Request, res: Response) => {
  try {
    const gifts = await prisma.gift.findMany();
    res.json(gifts);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar presentes' });
  }
};

// TODO: Verificar se o presente já foi comprado antes de permitir a compra
export const purchaseGift = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { purchaser } = req.body;
  try {
    const gift = await prisma.gift.update({
      where: { id },
      data: {
        isPurchased: true,
        purchaser,
      },
    });
    res.json(gift);
  } catch (err) {
    res.status(404).json({ error: 'Presente não encontrado' });
  }
};

export const updateGift = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, imageUrl, link } = req.body;
  try {
    const gift = await prisma.gift.update({
      where: { id },
      data: { name, description, imageUrl, link },
    });
    res.json(gift);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar presente' });
  }
};