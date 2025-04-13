// pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import api from '../services/api'; // usa a instância com o token

interface DashboardData {
  rsvps: number;
  gifts: number;
  messagesCount: number;
  lastMessages: {
    id: string;
    name: string;
    content: string;
    createdAt: string;
  }[];
  exportGuestsUrl: string;
}

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await api.get('/admin/dashboard'); // aqui é a mudança principal
        setDashboard(res.data);
      } catch (err) {
        console.error('Erro ao carregar o dashboard', err);
      }
    }
    fetchDashboard();
  }, []);

  if (!dashboard) return <p>Carregando...</p>;

  return (
    <div style={{ display: 'flex' }}>
      {/* Menu lateral */}
      <aside style={{ width: '200px', background: '#f5f5f5', padding: '1rem' }}>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/casamento">Casamento</a></li>
            <li><a href="/presentes">Presentes</a></li>
            <li><a href="/mensagens">Mensagens</a></li>
          </ul>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main style={{ flex: 1, padding: '2rem' }}>
        <h1>Bem-vindo ao Painel</h1>
        <section>
          <h2>Resumo do Casamento</h2>
          <p><strong>Convidados confirmados:</strong> {dashboard.rsvps}</p>
          <p><strong>Presentes comprados:</strong> {dashboard.gifts}</p>
          <p><strong>Mensagens recebidas:</strong> {dashboard.messagesCount}</p>
          <a
            href={`http://localhost:3333${dashboard.exportGuestsUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            📥 Exportar convidados
          </a>
        </section>

        <section>
          <h2>Últimas mensagens</h2>
          <ul>
            {dashboard.lastMessages.map((msg) => (
              <li key={msg.id}>
                <strong>{msg.name}:</strong> {msg.content}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
