//forma mais fácil de importar dependências
const {Schema,model} = require('mongoose');

const DevSchema = new Schema({
    name:{
    type: String,
    required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar:{
        type: String,
        required: true,
    },
    //Como chaves estrangeiras de likes e dislikes
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
},
{
    //createdAt
    //updateAt
    //Salva a data de criação e atualização de cada registro
    timestamps:true,
});

//nome do modulo/Schema
module.exports = model('Dev',DevSchema);