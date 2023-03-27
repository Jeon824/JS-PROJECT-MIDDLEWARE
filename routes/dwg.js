const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest : 'uploads/'});
// Middleware for obtaining a token for each request.

router.post('/upload',upload.single('avatar'),(req, res) => {
    //check file correct
    
    return res.status(200).json({success : true, result : `the ${req.file.originalname} file has been uploaded`});
});


router.delete('/',(req,res)=>{
    
});

router.put('/',(req,res)=>{

});

module.exports = router;