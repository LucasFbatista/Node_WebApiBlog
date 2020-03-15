'use strict';

//AQUI ESTAMOS GERANDO NOSSA SCHEMA QUE IRÁ GERAR ESSA COLLECTION NO NOSSO BANCO DE DADOS
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    
    article: {
        type: String,
        required: true  
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Article', schema);