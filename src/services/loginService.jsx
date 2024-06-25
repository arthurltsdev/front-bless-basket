import { API_BASE_URL } from '../config';

const loginService = {
  login: (data) => {
      return fetch("http://localhost:3001/login",
      {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
      })
  }, 
  createUser: () => {

  },

  getUser: (data) => {
        return fetch(`${API_BASE_URL}/login`,
      {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token")

          },
          body: JSON.stringify(data)
      })  
  }
}
export default loginService;