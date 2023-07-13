const express = require('express');
const app = express();
const path = require('path');
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

// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/js',express.static(path.join(__dirname,'js')));
// app.use(express.static(path.join(__dirname,'node_modules')));
app.use(express.static(path.join(__dirname,'/frontend/build')));
app.use(express.static(path.join(__dirname,'/frontend-old/html')))
const product = require('./routes/cassandra-connector');

app.use('/product',product);

//Main Web Page
app.get('/',(req,res) => {

    res.sendFile(path.join(__dirname,'/frontend/build/index.html'));

});

app.post('/',(req,res)=>{
    console.log(req);
    res.sendStatus(403);
})



app.listen(8080,()=>{
    console.log('listening on port 8080');
});