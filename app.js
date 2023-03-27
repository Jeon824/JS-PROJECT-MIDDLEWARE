const express = require('express');
const app = express();
const path = require('path');
// const cassandra = require('cassandra');

app.use('/js',express.static(path.join(__dirname,'js')));
// app.use(express.static(path.join(__dirname,'node_modules')));
app.use(express.static('frontend'));

app.get('/',(req,res) => {
    // res.sendFile(path.join(__dirname,'/threejstutorial.html'));
    res.sendFile(path.join(__dirname,'/frontend/html/product_info.html'));
});

app.listen(8080,()=>{
    console.log('listening on port 8080');
});