/******************************************
 *  AQUI ESTÁ TODA NOSSA CONFIGURAÇÃO     *
 *  DO SERVIDOR COMO PORTAS DE EXECUTAÇÃO *
 *  E LÓGICA REQUEST SERVER 500           *
 ******************************************/

'use strinct'

const app = require('../src/app');
const debug = require('debug')('nodeblog:server');
const http = require('http');


//VARIAVEIS DE CONEXÃO COM UMA PORTA FIXA
const port = normalizePort(process.env.PORT || '8000');
app.set('port', port);

//AQUI ESTAMOS CRIANDO NOSSO SERVIDOR BASEADO NA app EXPRESS
const server = http.createServer(app);


//AQUI SETAMOS A NOSSA PORTA E PRINTAMOS NO CONSOLE
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log('API rodando na porta ' + port);

//AQUI IREMOS NORMALIZAR A NOSSA PORTA PARA QUE MINHAS PORTAS NÃO SEJA UMA PORTA FIXA
//E CASO ELA ESTEJA OCUPADA NÃO OCORRA ALGUM ERRO
function normalizePort(val){

    const port = parseInt(val, 10);

    if(isNaN(port)){
        return val;
    }

    if(port >= 0){
        return port;
    }

    return false;

}


//AQUI ESTAMOS TRATANDO OS ERROS CASO TENHA DE  PERMISSÃO OU PORTA OCUPADA
function onError(error) {

    if(error.syscall !== 'listen'){

        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port : 
        'Port ' + port;

    switch(error.code){

        case 'EACCES':
            console.error(bind + 'Requer Privilegios de Adminstrador');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'Essa porta está em uso');
            process.exit(1);
            break;
        default:
            throw error;
    }

}

//FUNÇÃO DEBUG
function onListening() {

    const addr = server.address();
    const bind = typeof addr === 'string'
    ? 'pipe' + addr
    : 'port' + addr.port;
    debug('Listening on' + bind);

}



