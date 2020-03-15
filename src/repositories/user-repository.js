'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

//LISTANDO USUÁRIOS
exports.getUsers = async() => {

    var res = await User
    .find({});
    return res;
}

//CRIANDO USUÁRIOS
exports.createUsers = async(data) => {

    //AQUI GERAMOS UMA INSTÂNCIA DO MODEL E JUNTO RECEBEMOS OS DADOS DA NOSSA REQUSIÇÃO 
    //E GRAVAMOS NO BANCO DE FORMA ASSINCRONA
     var user = new User(data);
     await user.save();
}


//UPDATE USUÁRIO BANCO ASSINCRONO
exports.update = async(id, data) => {

    await User
     .findByIdAndUpdate(id, {
 
        $set:{
 
            name: data.name,
            email: data.email,
            password: data.password,
            roles: data.roles
        }
         
    })
}

//DELETE USUÁRIO BANCO ASSINCRONO
exports.delete = async(id) => {

    await User
    .findByIdAndRemove(id)
}

//AQUI ESTAMOS USANDO O REPOSITORY PARA TRAZER UM NOVO TOKEN DE USUÁRIO
exports.authenticate = async(data) => {

    var res = await User
    .findOne({
        email: data.email,
        password: data.password
    });
    return res;
}
