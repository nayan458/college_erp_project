import axios from 'axios'
import Cookies from "universal-cookie";


const cookie = new Cookies();

axios.defaults.withCredentials = true

// await axios.get('http://localhost:8000/sanctum/csrf-cookie');

const instance = axios.create({
    baseURL: `http://localhost:8000/api/`,
    headers: {
        'Authorization' : 'Bearer ' + cookie.get('token')
    }
  });

  export default instance
