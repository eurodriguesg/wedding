// src/pages/Presentes.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Corrigido para usar o arquivo de configuração do Axios
// import axios from 'axios';

interface Gift {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
  isPurchased: boolean;
  purchaser: string;
}

export default function Presentes() {
  const [gifts, setGifts] = useState<Gift[]>([]);

  useEffect(() => {
    api.get('http://localhost:3333/api/gifts/')
      .then(res => setGifts(res.data))
      .catch(err => console.error('Erro ao carregar presentes:', err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Presentes</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gifts.map(gift => (
          <li key={gift.id} className="border p-4 rounded shadow">
            <img src={gift.imageUrl} alt={gift.description} className="w-full h-40 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{gift.description}</h2>
            <p>Link: <a href={gift.link} target="_blank" className="text-blue-600 underline">{gift.link}</a></p>
            <p>Status: {gift.isPurchased ? `Comprado por ${gift.purchaser}` : 'Disponível'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}