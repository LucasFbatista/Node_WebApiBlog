//ESSE ARQUIVO IRÁ CONTER NOSSSA ROTA INDEX GENERICA PARA TESTAR NOSSA API EM 
//PRODUÇÃO OU PARA VE SE A MESMA ESTÁ FUNCIONANDO

'use strict';

const express = require('express');
const router = express.Router();

//AQUI ESTAMOS CRIANDO A ROTA PARA ACESSAR VIA ENDPOINT GET
const route = router.get('/', (req, res, next) => {

    res.status(200).send({

        title: "BLOG API",
        version: "0.0.2",
        "Server": "API em Funcionamento"
    });

});


//AQUI ESTAMOS EXPORTANDO QUALQUER COISA QUE ESTEJA NESSA CLASSE
module.exports = router;