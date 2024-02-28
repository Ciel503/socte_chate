const express = require('express')
const path = require('path')
const socketIo = require('socket.io')

const app = express();


    app.use("/",express.static(path.join(__dirname,'public'))) //referencia a pasta public onde esta o index.html


const server = app.listen(3000,()=>{
    console.log("rodando servidr")
})
const arreyMenssagens = []

const io = socketIo(server)

//  socket.on === recebe do body 
// socket.emit === enviar pro body
// io.emit === enviar pro body global
// io.on === recebe do body global
io.on('connection', (socket) => {
    console.log('new_conection');
    socket.emit("update_mensagens",arreyMenssagens) //quando new_conection envia o esse arrei pro front_and
    
    socket.on ('new_menssage',(dado)=>{  // recebe os dados do input do front-end 
        arreyMenssagens.push(dado) // coloca os dados que foram recebidos do input no arrey
        io.emit("update_mensagens",arreyMenssagens) //envia os dados do arrey para o fronte_and la na div]
    })



});