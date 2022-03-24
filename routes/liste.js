const express = require('express');
const router = express.Router();
const path = require("path");
const Liste = require(path.join(__dirname, '../DAO/liste'))
const Auth = require(path.join(__dirname, '../bin/auth'))

/* GET home page. */
router.post('/vote', function(req, res) {
    Auth.decode(req).then((decoded)=>{
        Liste.vote(decoded.id,req.body.liste).then(()=>{
            res.status(200).send()
        }).catch((e)=>{
            console.log(e)
            res.sendStatus(400)
        })
    }).catch((e)=>{
        res.sendStatus(401)
    })
});
router.get('/count', function(req, res,) {
    Liste.countVote().then((query)=>{
        res.status(200).json(query)
    }).catch((e)=>{
        console.log(e)
        res.sendStatus(401)
    })

});
router.get('/voteUser', function(req, res,) {
    Auth.decode(req).then((decoded)=>{
        Liste.voteUser(decoded.id).then((query)=>{
            console.log(query)
            res.status(200).json(query)
        }).catch((e)=>{
            console.log(e)
            res.sendStatus(400)
        })
    }).catch((e)=>{

        res.sendStatus(401)
    })

});
router.get('/countJour', function(req, res,) {
    Liste.countJoursVote().then((query)=>{
        res.status(200).json(query)
    }).catch((e)=>{
        console.log(e)
        res.sendStatus(400)
    })
});




module.exports = router;
