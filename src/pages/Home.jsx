import { faEdit, faSignOutAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import shopeople from '../assets/undraw_shopping_bags_noba (1).svg';

function Home() {
  const { id } = useParams();
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [productToDelete, setProductToDelete] = useState(null); // Para armazenar temporariamente o produto a ser excluído

  // Função para buscar os produtos do supermercado do backend
  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setProducts(response.data);
    } catch (err) {
      console.error(err);
      setMessage("Ocorreu um erro ao buscar os produtos.");
    }
  };

  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  // Redirecionar para a página de cadastro de produtos
  const handleGoToProductPage = () => {
    history.push("/cadastro-produtos");
  };

  // Função para abrir o modal de confirmação
  const openDeleteConfirmationModal = (product) => {
    setProductToDelete(product);
  };

  // Função para fechar o modal de confirmação
  const closeDeleteConfirmationModal = () => {
    setProductToDelete(null);
  };

 // ...
// Função para confirmar a exclusão do produto
const confirmDeleteProduct = async () => {
  if (productToDelete) {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
        Authorization: `Bearer ${token}`,
      }}
      const response = await axios.delete(`http://localhost:3001/delete/product/name`, config, {
        data: {
          name: productToDelete.name // Enviando o nome do produto no corpo da solicitação DELETE
        }
      });

      if (response.status === 204) {
        // Produto excluído com sucesso, você pode mostrar uma mensagem ou recarregar os produtos
        const updatedProducts = products.filter((product) => product.name !== productToDelete.name);
        setProducts(updatedProducts); // Atualizar o estado local de produtos
      }
    } catch (error) {
      console.error(error);
      // Trate erros de exclusão aqui
    }
  }

  closeDeleteConfirmationModal();
};

// ...


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/");
    } else {
      getProducts();
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
          {products.map((product) => (
            <div key={product.id} className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600">Preço: R$ {product.price}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleUpdateProduct(product.id)}
                  className="bg-blue-500 text-white rounded-full font-semibold py-2 px-3 mr-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => openDeleteConfirmationModal(product)}
                  className="bg-red-500 text-white rounded-full font-semibold py-2 px-3 hover:bg-red-600 focus:outline-none focus:bg-red-600"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="absolute top-2 right-2 text-red-500 hover:text-red-600 focus:outline-none"
        >
          <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
        </button>

        <button
          onClick={handleGoToProductPage}
          className="w-full bg-custom2 text-white rounded-2xl font-semibold py-2 px-4 hover:bg-darkGreen focus:outline-none focus:bg-darkGreen"
        >
          Cadastro de Produtos
        </button>
      </div>
      <ToastContainer />
      
      {/* Modal de confirmação de exclusão */}
      {productToDelete && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <p className="mb-4 text-center">Tem certeza de que deseja excluir o produto?</p>
            <div className="flex justify-center">
              <button
                onClick={confirmDeleteProduct}
                className="bg-red-500 text-white rounded-full font-semibold py-2 px-3 mr-2 hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                Confirmar
              </button>
              <button
                onClick={closeDeleteConfirmationModal}
                className="bg-blue-500 text-white rounded-full font-semibold py-2 px-3 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
