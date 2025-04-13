import { Request, Response } from 'express'; // Importação dos tipos do Express
import { prisma }            from '../services/prisma'; // Importação do Prisma
import { sendEmail }         from '../services/email.service';
import { sendWhatsApp }      from '../services/whatsapp.service';

export const confirmPresence = async (req: Request, res: Response): Promise<void> => {
  const { guestId } = req.params;

  try {
    const guest = await prisma.guest.update({
      where: { id: guestId },
      data: { isConfirmed: true }, // Alterado para isConfirmed, conforme o modelo
    });

    // Email
    await sendEmail(
      guest.email,
      'Confirmação de Presença 🎉',
      `<p>Olá ${guest.name},<br/>Sua presença foi confirmada no nosso casamento! Estamos muito felizes! 💖</p>`
    );

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
    res.status(500).json({ error: 'Erro ao confirmar presença' });
  }
};