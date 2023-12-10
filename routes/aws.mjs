import {DynamoDB} from '@aws-sdk/client-dynamodb';
import express from 'express';

const router = express.Router();

router.get('/:keyword', (req, res)=>{
    console.log('requested get method')
    let message = 'keyword is ' + req.params.keyword;
    res.send(message);

});

export default router;


