import { Request, Response } from 'express';
import { sendEmail } from '../services/email.service';
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
  console.log('Função confirmRsvp foi chamada'); // Adicione este log

  const { guestId } = req.params;
  console.log('guestId:', guestId); // Adicione este log para verificar o ID do convidado recebido

  // Verifica se o ID do convidado existe no banco de dados
  const guestExists = await prisma.guest.findUnique({ where: { id: guestId } });
  console.log('guestExists:', guestExists); // Adicione este log para verificar o convidado encontrado
  if (!guestExists) {
    res.status(404).json({ error: 'Convidado não encontrado' });
    return;
  }
  // Verifica se o convidado já confirmou presença
  if (guestExists.isConfirmed) {
    res.status(400).json({ error: 'Presença já confirmada' });
    return;
  }

  try {
    const guest = await prisma.guest.update({
      where: { id: guestId },
      data: { isConfirmed: true },
    });

    // Email
    await sendEmail(
      guest.email,
      'Confirmação de Presença 🎉',
      `<p>Olá ${guest.name},<br/>Sua presença foi confirmada no nosso casamento! Estamos muito felizes! 💖</p>`
    );
    console.log('Resposta do e-mail:', guest.email); // Adicione este log para verificar o e-mail enviado

    // WhatsApp
    // if (guest.phone) {
    //   await sendWhatsApp(
    //     guest.phone,
    //     `Olá ${guest.name}, sua presença foi confirmada no casamento de Eliseu & Dagna! 🎉`
    //   );
    // }

    res.json({ message: 'Presença confirmada e notificações enviadas' });
  } catch (error) {
    console.error(error);
    const isPrismaError = error instanceof Prisma.PrismaClientKnownRequestError;
    if (isPrismaError && error.code === 'P2025') {
      // Erro de não encontrado
      res.status(404).json({ error: 'Convidado não encontrado' });
      return;
    }
    // Outros erros
    res.status(500).json({ error: 'Erro ao confirmar presença' });
  }
};

export const deleteGuest = async (req: Request, res: Response) => {
  const { guestId } = req.params;
  try {
    await prisma.guest.delete({ where: { id: guestId } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar convidado' });
  }
};

export const updateGuest = async (req: Request, res: Response) => {
  const { guestId } = req.params;
  const { name, email, phone, companions, isConfirmed, message } = req.body;
  try {
    const guest = await prisma.guest.update({
      where: { id: guestId },
      data: { name, email, phone, companions, isConfirmed, message },
    });
    res.json(guest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar convidado' });
  }
};

// Cancela a confirmação de presença
export const cancelRsvp = async (req: Request, res: Response) => {
  console.log('Função cancelRsvp foi chamada'); // Adicione este log

  const { guestId } = req.params;
  try {
    const guest = await prisma.guest.update({
      where: { id: guestId },
      data: { isConfirmed: false },
    });
    res.json(guest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cancelar confirmação de presença' });
  }
};