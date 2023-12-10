import product from './routes/aws.mjs';
import express from 'express';
import { dirname } from 'path';
import {fileURLToPath} from 'url';
import log from './routes/log.mjs';
const server = express();

server.use('/product', product);

// const cors = require('cors');

// // const cassandra = require('cassandra');
// const whitelist = ["http://localhost:8080"]

// const corsOptions = {
//     origin: function (origin, callback) {
//       if (!origin || whitelist.indexOf(origin) !== -1) {
//         callback(null, true)
//       } else {
//         callback(new Error("Not allowed by CORS"))
//       }
//     },
//     credentials: true,
//   };

// server.use(cors(corsOptions));
const __dirname = fileURLToPath(new URL('.',import.meta.url));
console.log(import.meta.url);
server.use(express.json());
server.use(express.urlencoded({extended:true}));
// server.use('/js',express.static(path.join(__dirname,'js')));
// server.use(express.static(path.join(__dirname,'node_modules')));
const frontend_dir = fileURLToPath(new URL('./frontend/build' ,import.meta.url));
console.log(frontend_dir);
server.use(express.static(frontend_dir));
//server.use(express.static(path.join(__dirname,'/frontend-old/html')))
server.use('/product',product);
server.use('/log', log);

//Main Web Page
server.get('/',(req,res) => {

    res.sendFile(path.join(__dirname,'/frontend/build/index.html'));

});

server.post('/',(req,res)=>{
    console.log(req);
    res.sendStatus(403);
})


server.listen(8080,()=>{
    console.log('listening on port 8080');
});