const express = require('express');
const router = express.Router();
const cassandra_driver = require('cassandra-driver');
//const upload = multer({dest: 'uploads/'});
const {SHA256, enc} = require('crypto-js');
const path = require('path');
const { restart } = require('nodemon');

const node1 = '***.***.***.***';//Cassandra-node2 IP address
const node2 = '***.***.***.***';//Cassandra-node1 IP address
const node3 = '***.***.***.***';//Cassandra-node3 IP address

router.get('/',(req,res)=>{
    //res.sendFile(path.join(__dirname,'../frontend-old/html/product_info.html'));
})

router.get('/:keyword',(req,res) => {
    
    const client = new cassandra_driver.Client({
        contactPoints:[node1, node2, node3],
        localDataCenter:'datacenter1',
        keyspace:'korea'
    });

    const query_keyword = req.params.keyword;//'*keyword*'
    console.log(query_keyword);

    const query = 'SELECT company_name, product_name, file_name, version, upload_date FROM products WHERE product_name = ?';
    
    client.execute(query, [ query_keyword ]).
    then((result)=>{
        var data_length = result.rows.length;
        if(data_length<1){
            res.send('No matching products exist');
        }
        else{
            res.json(result.rows);
        }   

    })
    .catch((errors)=>{
        console.log(errors);
        res.send('No matching products exist');
    });

    
});
 

router.post('/upload', (req,res) => {
    console.log(req.body);
    const arrived_file = req.body.file
    const company_name = req.body.company_name;
    const product_name = req.body.product_name;
    const file_name = req.body.file_name;
    const country = 'korea'//checkAccountCountry();
    const keyspace = country;//how to deside keyspace
    const version = req.body.version;
    const str = company_name + product_name + version;
    //const id = SHA256(str).toString(CryptoJS.enc.Hex);
    const upload_date = new Date();
    const upload_date_iso = new Date(upload_date.toISOString());


    const client = new cassandra_driver.Client({
        contactPoints:[node1, node2, node3],
        localDataCenter:'datacenter1',
        keyspace:'korea'
    });

    const query = 'INSERT INTO products (company_name, product_name, file_name, version, upload_date) VALUES(?,?,?,?,?)';
    const params = [company_name, product_name, file_name, version, upload_date_iso];
    client.execute(query, params).
    then((result)=>{
        // res.sendStatus(200).send('cassandra-connector request receieved');
        console.log('successfully send data');

    })
    .catch((errors)=>{
        console.log(errors)
    });
    

    
})

module.exports = router;
