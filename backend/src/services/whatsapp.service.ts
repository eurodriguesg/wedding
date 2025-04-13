import twilio from 'twilio';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

export const sendWhatsApp = async (to: string, message: string) => {
  return client.messages.create({
    body: message,
    from: `whatsapp:${process.env.TWILIO_FROM}`,
    to: `whatsapp:${to}`,
  });
};
