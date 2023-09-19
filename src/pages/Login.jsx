export default function Login(){
    return(
        <>
       <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4 text-center text-black">Login</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Digite seu email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Digite sua senha"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center">
          Não tem uma conta? <a href="/register" className="text-blue-500 hover:underline">Registrar</a>
        </p>
      </div>
    </div> 
        </>
    )
}