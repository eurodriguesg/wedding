import { Router } from 'express';
import { sendEmail } from '../services/email.service';

const router = Router();

router.post('/test-email', async (req, res) => {
  const { to } = req.body;

  try {
    await sendEmail(
      to,
      'Teste de E-mail ✔️',
      `<h2>Funcionou!</h2><p>Este é um teste do sistema de notificações do site de casamento de Eliseu & Dagna 🎉</p>`
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao enviar e-mail' });
  }
});

export default router;
