import axios from "axios";
import Cookies from 'universal-cookie'

const cookies = new Cookies();

axios.defaults.baseURL = 'http://localhost:8000/api'


const csrf = axios.create();

const set_CSRF=async()=>{
    try {
        await csrf.get('http://localhost:8000/sanctum/csrf-cookie')
        return true
    } catch (err) {
        return false
    }
}


let auth = axios.create()
auth.defaults.withCredentials = true

    const login=async(formValue)=>{
        try {
            await set_CSRF()
            const rslt = await auth.post("/login",formValue);
            cookies.set('token',rslt.data.token);
            return true
        } catch (error) {
        if(error){
            console.log(error);
            return false
        }
        }
    }

    const register=async(formValue)=>{
        try {
            await set_CSRF()
            const rslt = await auth.post("/register",formValue)
            cookies.set('token',rslt.data.token)
            return true
        } catch (error) {
            console.log(error);
            return false;
        }
    }


export {login,register}