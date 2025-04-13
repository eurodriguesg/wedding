// pages/Login.tsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    // console.log('Componente Login renderizado'); // Adicione este log
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const res = await axios.post('http://localhost:3333/api/auth/login', {
            email, password
          });
          login(res.data.token);
          navigate('/dashboard');
        } catch (error) {
          console.error('Erro ao fazer login:', error); // Adicione este log
          alert('Erro ao fazer login. Verifique suas credenciais.');
        }
      };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    );
  }
