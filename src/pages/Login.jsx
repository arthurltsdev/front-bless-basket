import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import blessbasket from '../assets/blessbasket-removebg-preview.png';
import loginService from '../services/loginService';

function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};

    for (const [key, value] of formData) {
      data[key] = value;
    }

    try {
      const response = await loginService.login(data);
      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("token", result["Access-Token"]);
        history.push("/home");
      } else {
        toast("Erro no login. Verifique suas credenciais.");
      }
    } catch (err) {
      toast("Erro desconhecido");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center custom-gradient">
      <img src={blessbasket} alt="Bless Basket" className="mb-4 w-54" />

      <div className="bg-white p-8 rounded-3xl shadow-md w-96 opacity-90">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Bem-vindo à<br /> Bless Basket
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Digite seu email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-800 text-sm font-semibold mb-2">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Digite sua senha"
              />
              <span
                className="absolute top-2 right-2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'} Senha
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              Lembrar-me
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-custom2 text-white rounded-2xl font-semibold py-2 px-4 hover:bg-darkGreen focus:outline-none focus:bg-darkGreen"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Não tem uma conta?{' '}
          <span
            className="text-darkGreen cursor-pointer"
            onClick={() => history.push("/register")}
          >
            Registrar
          </span>
        </p>
        <p className="mt-2 text-center text-custom2">
          <span
            className="cursor-pointer"
            onClick={() => history.push("/forgot-password")}
          >
            Esqueceu a senha?
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
