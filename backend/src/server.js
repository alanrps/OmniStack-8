//dependencias
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

//criar server
const server = express();

//conexao com o banco de dados
mongoose.connect('mongodb+srv://alanpatriarca:alan241198@cluster0-wpvjw.mongodb.net/omnistack8?retryWrites=true&w=majority',
{useNewUrlParser : true});

server.use(cors());
//Mostrar ao express que ele deve ler json
server.use(express.json())
//função utilziada para usar configurações de outros arquivos no servidor
server.use(routes);

//setar a porta que o servidor irá utiliziar
server.listen(3306);