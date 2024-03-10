
const express = require('express')
const path = require('path')

const app = express();


    app.use("/",express.static(path.join(__dirname,'public'))) //referencia a pasta public onde esta o index.html


app.listen(3000,()=>{
    console.log("rodando servidr")
})