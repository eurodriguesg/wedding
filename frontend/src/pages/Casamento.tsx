// src/pages/Casamento.tsx
import React, { useEffect, useState } from 'react';

export default function Casamento() {
  const targetDate = new Date('2025-09-21T16:00:00'); // 21 de setembro de 2025, 16h

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Informações do Casamento</h1>
      <ul className="list-disc ml-6 mb-6">
        <li><strong>Data:</strong> 21 de setembro de 2025</li>
        <li><strong>Horário:</strong> 16h</li>
        <li><strong>Local:</strong> Mossoró-RN</li>
        <li><strong>Noivo:</strong> Eliseu Rodrigues</li>
        <li><strong>Noiva:</strong> Dagna Louiza</li>
      </ul>

      <div className="bg-pink-100 p-4 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold mb-2">⏳ Faltam:</h2>
        <div className="text-3xl font-bold">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
      </div>
    </div>
  );
}
