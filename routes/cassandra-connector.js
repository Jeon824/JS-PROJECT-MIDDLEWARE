const express = require('express');
const router = express.Router();
const cassandra_driver = require('cassandra-driver');
//const upload = multer({dest: 'uploads/'});
const CryptoJS = require('crypto-js');
const path = require('path');
const exp = require('constants');

const node1 = '192.168.23.131';//Cassandra-node2 IP address
const node2 = '192.168.23.129';//Cassandra-node1 IP address
const node3 = '192.168.23.130';//Cassandra-node3 IP address

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend-old/html/product_info.html'));
})

router.get('/:keyword',(req,res) => {
    console.log(req.body);

    
    const client = new cassandra_driver.Client({
        contactPoint:[node1, node2, node3],
        localDataCenter:'datacenter1',
        keyspace:'korea'
    });

    const query_keyword = '*' + req.params.keyword + '*';//'*keyword*'

    const query = 'SELECT id, company_name, product_name, file_name, version FROM products WHERE product_name = ?';
    
    var data_be_delivered;

    client.execute(query, [ query_keyword ]).
    then((result)=>{
        var page_num = 1;
        var data_length = result.rows.length;
        if(data_length <= 11){
            data_be_delivered = result.rows.slice(data_length + 1);
        }
        else{
            data_be_delivered = result.rows.slice(1+((page_num-1)*10),page_num*10 +1);
        }   


    })
    .catch((errors)=>{

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
    const id = 'P'//CryptoJS.MD5(JSON.stringify({str})).toString(CryptoJS.enc.Utf8);
    const upload_date = Date().toString();

    const client = new cassandra_driver.Client({
        contactPoints:[node1, node2, node3],
        localDataCenter:'datacenter1',
        keyspace:'korea'
    });

    const query = 'INSERT INTO products (id, company_name, product_name, file_name, version, upload_date) VALUES(?,?,?,?,?,?)';
    const params = [id, company_name, product_name, file_name, version, upload_date];
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
