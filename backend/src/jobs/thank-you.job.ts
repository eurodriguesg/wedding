import cron from 'node-cron';
import { prisma } from '../services/prisma';
import { sendEmail } from '../services/email.service';

export const thankYouJob = cron.schedule('0 10 22 9 *', async () => {
  // Alterado de rsvp para isConfirmed
  const guests = await prisma.guest.findMany({ where: { isConfirmed: true } });

  for (const guest of guests) {
    await sendEmail(
      guest.email,
      'Obrigado por estar conosco! 💖',
      `<p>${guest.name},<br/>Agradecemos por fazer parte do nosso grande dia. Foi inesquecível! 💍</p>`
    );
  }

  console.log('E-mails de agradecimento enviados.');
});