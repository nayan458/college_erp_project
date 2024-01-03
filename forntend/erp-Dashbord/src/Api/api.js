import axios from 'axios'
import Cookies from "universal-cookie";

    const cookie = new Cookies();

    axios.defaults.withCredentials = true

    const instance = axios.create({
        baseURL: `http://localhost:8000/api/`,
        headers: {
            'Authorization' : 'Bearer ' + cookie.get('token')
        }
    });

    instance.defaults.baseURL = 'http://localhost:8000/api/'

    instance.interceptors.request.use(
        function(request){
            let {baseURL}=request
            if(baseURL !== 'http://localhost:8000/api/')
                request.baseURL = 'http://localhost:8000/api/'
            return request
        }
    )

    const adminInstance = axios.create({
        baseURL: `http://localhost:8000/api/`
    })

    adminInstance.interceptors.request.use(
        function(request){
            let {baseURL} = request
            if(baseURL !== 'http://localhost:8000/api/')
                request.baseURL =  'http://localhost:8000/api/'
            return request
        }
    )

  export default instance

  export {adminInstance}