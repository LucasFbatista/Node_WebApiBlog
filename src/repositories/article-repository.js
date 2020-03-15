'use strict';

const mongoose = require('mongoose');
const Article = mongoose.model('Article');

//LISTANDO ARTIGOS
exports.getArticles = async() => {

    var res = await Article
    .find({});
    return res;
}

//CRIANDO ARTIGO
exports.createArticle = async(data) => {

    //AQUI GERAMOS UMA INSTÂNCIA DO MODEL E JUNTO RECEBEMOS OS DADOS DA NOSSA REQUSIÇÃO 
    //E GRAVAMOS NO BANCO DE FORMA ASSINCRONA
     var article = new Article(data);
     await article.save();
}


//UPDATE ARTIGO BANCO ASSINCRONO
exports.update = async(id, data) => {

    await Article
     .findByIdAndUpdate(id, {
 
        $set:{
 
            article: data.article,
            user: data.user
        }
         
    })
}

//DELETE ARTIGO BANCO ASSINCRONO
exports.delete = async(id) => {

    await Article
    .findByIdAndRemove(id)
}


