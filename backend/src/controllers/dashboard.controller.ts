import { Request, Response } from 'express';
import { prisma } from '../services/prisma';
import ExcelJS from 'exceljs';

export const getDashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const rsvps = await prisma.guest.count({ where: { isConfirmed: true } });
    const gifts = await prisma.gift.count({ where: { isPurchased: true } });
    const messagesCount = await prisma.message.count();

    const lastMessages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    res.json({
      rsvps,
      gifts,
      messagesCount,
      lastMessages,
      exportGuestsUrl: '/admin/dashboard/export-guests',
    });
    return; // Finaliza a execução da função
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao carregar o dashboard' });
    return; // Finaliza a execução da função
  }
};

export const exportGuests = async (_req: Request, res: Response): Promise<void> => {
  try {
    const guests = await prisma.guest.findMany();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Convidados');

    worksheet.columns = [
      { header: 'Nome', key: 'name', width: 30 },
      { header: 'E-mail', key: 'email', width: 30 },
      { header: 'Telefone', key: 'phone', width: 20 },
      { header: 'Confirmado?', key: 'rsvp', width: 15 },
      { header: 'Acompanhantes', key: 'plusOnes', width: 15 },
      { header: 'Observações', key: 'note', width: 30 },
    ];

    guests.forEach((guest) => {
      worksheet.addRow({
        name: guest.name,
        email: guest.email,
        phone: guest.phone,
        rsvp: guest.isConfirmed ? 'Sim' : 'Não',
        plusOnes: guest.companions || 0,
        note: guest.message || '',
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=convidados.xlsx',
    );

    await workbook.xlsx.write(res);
    res.end();
    return; // Finaliza a execução da função
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao exportar convidados' });
    return; // Finaliza a execução da função
  }
};