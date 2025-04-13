// src/pages/Mensagens.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Ajuste o caminho conforme necessário
// import axios from 'axios';

interface Message {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

export default function Mensagens() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    api.get('http://localhost:3333/api/messages/')
      .then(res => setMessages(res.data))
      .catch(err => console.error('Erro ao carregar mensagens:', err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mensagens dos Convidados</h1>
      <ul className="space-y-4">
        {messages.map(msg => (
          <li key={msg.id} className="border p-4 rounded shadow">
            <p className="font-semibold">{msg.name}</p>
            <p className="text-gray-700">{msg.content}</p>
            <p className="text-sm text-gray-500">{new Date(msg.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}