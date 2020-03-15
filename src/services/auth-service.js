//AQUI SERÁ NOSSO SISTEMA DE AUTENTICAÇÃO COM JWT
'use strict';
const jwt = require('jsonwebtoken');


//AQUI IREMOS PASSAR OS DADOS DO USUÁRIO EXEMPLO: EMAIL, ROLES, NOME PARA QUE POSSA SER GERADO UM TOKEN
exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

//AQUI A GENTE RECEBE UM TOKEN RECEBE UMA DATA ASSIM VERIFICAMOS SE ESSE TOKEN JUNTO COM SALTA KEY É VALIDO
exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

//AQUI É AUTORIZE COM PAPEIS DE USUÁRIOS
exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                next();
            }
        });
    }
};


//VERIFICA SE O USUÁRIO É ADMIN
exports.isAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Token Inválido'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
        
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    res.status(403).json({
                        message: 'Esta funcionalidade é restrita para administradores'
                    });
                }
            }
        });
    }
};
