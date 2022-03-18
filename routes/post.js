const express = require('express');
const router = express.Router();

const path = require("path");
const Post = require(path.join(__dirname, '../DAO/post'))
const Auth = require(path.join(__dirname, '../bin/auth'))
const Test = require(path.join(__dirname, '../bin/Test'))
/* GET home page. */

router.post('/create', function(req, res) {
    if(Test.text(req.body.text)){
        Auth.decode(req).then((decoded)=>{
            Post.create(decoded.id,req.body.text).then(()=>{
                res.status(200).send()
            }).catch((e)=>{
                console.log(e)
                res.sendStatus(401)
            })
        }).catch((e)=>{
            console.log(e)
            res.sendStatus(401)
        })
    }else{
        res.sendStatus(401)
    }
});




module.exports = router;
