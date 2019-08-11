//Responsável pela lógica,receber as requisições,as rotas vão chamar os controllers 

const axios = require('axios');
const Dev = require('../models/Dev')
module.exports = {
    async index(req,res){
        const{user} = req.headers;

        const loggedDev = await Dev.findById(user);
        const users = await Dev.find({
            $and:[
                {_id:{$ne:user}}, //ne = não seja igual
                {_id:{$nin:loggedDev.likes}},//Excluindo todos os usuários que ja deu like
                {_id:{$nin:loggedDev.dislikes}},
            ],
        })
        return res.json(users);
    },

    //Em uma função assincrona se utiliza o wait e o async para esperar o resultado da função
    async store(req,res){
        const{username} = req.body;

        const response = await axios.get(`https://api.github.com/users/${username}`);

        //Verifica se já ha o usuario inserido e o retorna
        const userExist = await Dev.findOne({user:username});
        if(userExist){
            return res.json(userExist);
        }

        //Passos para fazer a criação de usuario
        const{name,bio,avatar_url : avatar} = response.data;
        //data = variavél onde o axios retorna os dados
        //dados referentes a model
        const dev = await Dev.create({
            name,
            user : username,
            bio,
            avatar 
        });

        return res.json(dev);
    }
};