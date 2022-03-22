const express = require('express');
const router = express.Router();
const path = require('path');
const Question = require(path.join(__dirname, '../DAO/question'))
const VoteQuestion = require(path.join(__dirname, '../DAO/voteQuestion'))
const Auth = require(path.join(__dirname, '../bin/auth'))
const Jwt = require('jsonwebtoken');


router.post('/add', function (req, res) {
    console.log(req.body)
    //if(process.env.AUTHADMINKEY == req.headers.authorization) {
        Question.create(req.body.question).then(() => {
            res.status(200).json("OK")
        }).catch((e) => {
            console.log(e)
            res.sendStatus(400)
        })
    //}
});

router.get('/vote', function(req, res,) {
    VoteQuestion.getVoteQuestion().then((query)=>{
        res.status(200).json(query)
    }).catch((e)=>{
        console.log(e)
        res.sendStatus(401)
    })

});

router.post('/vote', function(req, res) {
    Auth.decode(req).then((decoded)=>{
        VoteQuestion.vote(decoded.id,req.body.question, req.body.liste).then(()=>{
            res.status(200).send()
        }).catch((e)=>{
            console.log(e)
            res.sendStatus(400)
        })
    }).catch((e)=>{
        console.log(e)
        res.sendStatus(401)
    })
});

router.get('/voteUser', function(req, res,) {
    Auth.decode(req).then((decoded)=>{
        VoteQuestion.voteUser(decoded.id, req.body.question).then((query)=>{
            res.status(200).json(query)
        }).catch((e)=>{
            console.log(e)
            res.sendStatus(401)
        })
    }).catch((e)=>{
        console.log(e)
        res.sendStatus(401)
    })

});
module.exports = router;
