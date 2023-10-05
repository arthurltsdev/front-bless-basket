import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import shopeople from '../assets/undraw_shopping_bags_noba (1).svg';
import loginService from '../services/loginService';

function Home() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  // Função para buscar os produtos do supermercado do backend
  const fetchProducts = async () => {
    try {
      const response = await loginService.getProducts(); // Use o serviço de produtos
      setProducts(response);
    } catch (err) {
      console.error(err);
      setMessage("Ocorreu um erro ao buscar os produtos.");
    }
  };

  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/"); // Redireciona para a página de login
  };

  // Redirecionar para a página de cadastro de produtos
  const handleGoToProductPage = () => {
    history.push("/cadastro-produtos");
  };

  useEffect(() => {
    // Verificar se o usuário está autenticado (tem um token)
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/"); // Redireciona para a página de login se não houver token
    } else {
      // Buscar os produtos quando a página for carregada
      fetchProducts();
    }
  }, [history]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center custom-gradient">
      <div className="bg-white p-8 rounded-3xl shadow-md w-96 opacity-90">
      <img src={shopeople} alt="Bless Basket" className="mb-4 w-54" />

        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Produtos do Supermercado
        </h1>

        {message && <p className="text-red-500 mb-4 text-center">{message}</p>}

        <div className="mb-8">
          {/* Renderizar a lista de produtos */}
          {products.map((product) => (
            <div key={product.id} className="mb-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">Preço: R$ {product.price}</p>
              {/* Outras informações do produto */}
            </div>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="absolute top-2 left-2 bg-red-500 text-white rounded-full font-semibold py-2 px-4 hover:bg-red-600 focus:outline-none focus:bg-red-600"
        >
          Logout
        </button>

        <button
          onClick={handleGoToProductPage}
          className="w-full bg-custom2 text-white rounded-2xl font-semibold py-2 px-4 hover:bg-darkGreen focus:outline-none focus:bg-darkGreen"
        >
          Cadastro de Produtos
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
