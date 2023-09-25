import axios from 'axios';
import { useState } from 'react';
import blessbasket from '../assets/blessbasket-removebg-preview.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Login bem-sucedido!');
      } else {
        setError('Credenciais inválidas.');
      }
    } catch (error) {
      setError('Erro ao fazer login. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center custom-gradient">
      <img src={blessbasket} alt="Bless Basket" className="mb-4 w-54" />

      <div className="bg-white p-8 rounded-3xl shadow-md w-96 opacity-90"> {/* Estilizei o container aqui */}
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Bem-vindo ao Bless Basket
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-800 text-sm font-semibold mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-custom2 text-white rounded-2xl font-semibold py-2 px-4 hover:bg-custom focus:outline-none focus:bg-custom"
          >
            Entrar
          </button>
        </form>

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        <p className="mt-4 text-center text-gray-600">
          Não tem uma conta?{' '}
          <a href="/register" className="text-custom hover:underline">
            Registrar
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
