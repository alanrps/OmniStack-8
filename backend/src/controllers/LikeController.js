const Dev = require('../models/Dev');

module.exports = {
    async store(req,res){
        const{user} = req.headers;
        const{devId} = req.params;
        

        //Usuario
        const loggedDev = await Dev.findById(user);
        //Alvo do like
        const targetDev = await Dev.findById(devId);

        //Verifica se o usuario alvo existe
        if(!targetDev){
            return res.status(400).json({error:'Dev not exists'});
        }
        //Verifica se o usuario alvo do like também já deu like no usuário logado
        if(targetDev.likes.includes(loggedDev._id)){
            console.log('Deu match');
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();



        return res.json({loggedDev})
    }
}