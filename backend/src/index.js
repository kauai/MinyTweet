const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

//config socket.io
const server = require('http').Server(app)
const io = require('socket.io')(server)
//#socket config


mongoose.connect('mongodb://kauai2019:kauai2019@ds255253.mlab.com:55253/nodegoweek',{
    useNewUrlParser:true
})

// app.get('/',(req,res) => {
//     res.send('Welcome to express')
// })


app.use(cors())

//config socket io
app.use((req,res,next) => {
    //deixa o io disponivel globalmente criando e rebendo 
    //a variavel io
    req.io = io
    return next()
})

app.use(express.json())
app.use(require('./Routes'))

// app.listen(3000,() => {
//     console.log('servidor rodando nao porta 3000 ;)')
// })
//agora é usado server no lugar de app
server.listen(3001,() => {
        console.log('servidor rodando nao porta 3001 ;)')
})