import axios from "axios";

function Conn(){
    axios.defaults.baseURL = 'http://localhost:8000/api'
}

export default Conn
