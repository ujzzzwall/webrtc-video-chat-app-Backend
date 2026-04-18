import express from 'express';
import http from 'http';
import serverConfig from './config/server-config'


const app = express();

const server = http.createServer(app);

server.listen( serverConfig.PORT ,()=>{
    console.log(`server is up at PORT : ${serverConfig.PORT}`)
});