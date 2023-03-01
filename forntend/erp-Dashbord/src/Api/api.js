import axios from 'axios'
import Cookies from "universal-cookie";


const cookie = new Cookies();

const instance = axios.create({
    baseURL: `http://localhost:8000/api/${cookie.get('lable')}`,
    headers: {
        'Authorization' : 'Bearer ' + cookie.get('token')
    }
  });

  export default instance