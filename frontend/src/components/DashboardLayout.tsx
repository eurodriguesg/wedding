// components/DashboardLayout.tsx
import { Link, Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Painel</h2>
        <nav className="space-y-2">
          <Link to="/dashboard">Início</Link>
          <Link to="/dashboard/casamento">Casamento</Link>
          <Link to="/dashboard/presentes">Presentes</Link>
          <Link to="/dashboard/mensagens">Mensagens</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
