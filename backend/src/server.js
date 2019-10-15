const express = require('express'); // 
const mongoose = require('mongoose'); // 
const cors = require('cors'); // 
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes') // ele reconhece a extensão do arquivo .js

const app = express();
const server = http.Server(app);
const io = socketio(server);


mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-y9nq3.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connectedUsers = {};


io.on('connection', socket => {
    
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});
// chamar o next para dar continuidade ao código
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})

//req = pega todas informações que o user envia para requisição
//res = devolve uma resposta para requisição
// get = metodo para buscar informação do backend
// post = para criar  uma nova informação do backend
// put = editar uma informação do backend
// delete = deletar uma informação do backend
// req.query = Acessar query params ( para Filtros )
// req.params = Acessar route params ( para edição e delete)
// req.body = Acessar corpoda requisição ( para criação e edição)
app.use(cors()); //define a permissão de quem pode usar a api da aplicação
app.use(express.json()); // app usar formato json como se fosse um plugin
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333); // config. porta da aplicação localhost:3333

