const express = require('express')
const port = process.env.PORT || 3001;
const axios = require('axios')

const app = express();

const func=async()=>{
    let result = await axios.get("http://localhost:8000/api/student/classes/1")
    console.log(result.data)
    result = result.data
    result.forEach(element => {
        console.log(element.class_name)
    });
    // result.data.data.map((elem)=>{
        // console.log(elem.class_name);
    // })
}

func()

app.listen(port,()=>{
    console.log('app successfully started');
})