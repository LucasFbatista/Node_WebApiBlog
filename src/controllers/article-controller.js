'use strict'; 

const mongoose = require('mongoose');
const repository = require('../repositories/article-repository');
const ValidationContract = require('../validators/fluent-validator');


//LIST ARTICLE
exports.get = async(req, res, next) => {

    //AQUI ESTAMOS PASSANDO NOSSA CAMANDA REPOSITORY METODO LIST E TRAZENDO OS DADOS TRABALHANDO DE FORMA ASSINCRONA
    try {
        var data = await repository.getArticles();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha na requisição tente novamente!'
        });
    }
}

//AQUI SERÁ CRIADO UM NOVO ARTIGO
exports.post = async(req, res, next) => {

    //AQUI ESTAMOS CRIANDO UM NOVO ARTIGO PASSANDO A RESPONSABILIDADE PARA O NOSSO REPOSITORIO
    try {
        await repository.createArticle({

            article:req.body.article,
            user:req.body.id

        });
        res.status(201).send({
            message: 'Artigo Criado com Sucesso!'
        });
    } catch (e) {
        res.status(500).send({

            message: 'Falha ao Criar Artigo, Tente Novamente!'
        });
    } 
};

//ATUALIZAR DE FORMA ASSINCRONO ARTIGO
exports.put = async(req, res, next) => {

    //PODEMOS ATUALIZAR UM ARTIGO DESSA FORMA OU USAR O DO EXEMPLO DO POST ACIMA, AQUI USAMOS TAMBÉM DE FORMA ASSINCRONA
    try {
        await repository.update(req.params.id, req.body)
        res.status(200).send({
            message: 'Artigo Atualizado com Sucesso!'
        });
    } catch (error) {
        //AQUI RETORNAMOS UM BAD REQUEST
        res.status(400).send({
            message: 'Falha ao Atualizar Artigo',
            data: e
        });
    }
};


//DELETAR ARTIGO ASSINCRONO
exports.delete = async(req, res, next) => {

    try {
        await  repository.delete(req.params.id)
        res.status(200).send({
            message: 'Artigo Removido com Sucesso!'
        });
    } catch (error) {
        //AQUI RETORNAMOS UM BAD REQUEST
        res.status(400).send({
            message: 'Falha ao Remover Artigo',
            data: e
        });
    }
}