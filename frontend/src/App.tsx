// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Casamento from './pages/Casamento';
import Presentes from './pages/Presentes';
import Mensagens from './pages/Mensagens';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="casamento" element={<Casamento />} />
          <Route path="presentes" element={<Presentes />} />
          <Route path="mensagens" element={<Mensagens />} />
        </Route>
      </Routes>
    </Router>
  );
}
