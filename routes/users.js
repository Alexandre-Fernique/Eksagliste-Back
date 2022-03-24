const express = require('express');
const router = express.Router();
const path = require('path');
const User = require(path.join(__dirname, '../DAO/user'))
const Test = require(path.join(__dirname, '../bin/Test'))
const Jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
const Email = require(path.join(__dirname, '../bin/email'))



router.post('/login', function(req, res) {
  if(Test.email(req.body.email)) {

    User.login(req.body.email.toLowerCase()).then((query) => {
      if (query != null && passwordHash.verify(req.body.password, query.password) && query.activate == true) {
        let token = Jwt.sign({id: query.id}, process.env.SECRETKEY || "test")
        res.status(200).json({'acess_token':token})
      } else {
        res.sendStatus(401)
      }
    }).catch((e) => {
      console.log(e)
      res.sendStatus(503)
    })
  }else {
    res.sendStatus(401)
  }
});

router.post('/signin', function(req, res) {
  if(Test.email(req.body.email) && Test.password(req.body.password) && Test.formation(req.body.formation,req.body.annee)){
    const hashedPassword = passwordHash.generate(req.body.password);
    User.signin(req.body.email.toLowerCase(),hashedPassword,req.body.formation, req.body.annee).then((query)=>{
      if (query.count == 1) {
        console.log(query)
        User.login(req.body.email).then((query)=>{
          Email.sendEmail(req.body.email,query.id).then(()=>{
            res.status(200).send()
          }).catch((e)=>{
            console.log(e)
            res.sendStatus(503)
          })
        }).catch((e)=>{
          console.log(e)
          res.sendStatus(401)
        })

      } else {
        res.sendStatus(401)
      }

    }).catch((e)=>{
      console.log(e)
      res.sendStatus(401)
    })
  }
});
router.post('/create', function(req, res) {
  if(req.headers.authorization == process.env.AUTHKEY){
    User.create(req.body.email).then(()=>{
      res.status(200).send("OK")
    }).catch((e)=>{
      console.log(e)
      res.sendStatus(401)
    })
  }
});

router.put('/updatePassword/:uuid', function(req, res) {
  if(Test.password(req.body.password)){
    const hashedPassword = passwordHash.generate(req.body.password);
    User.update(req.params.uuid, hashedPassword).then((query) => {
      if (query.count == 1) {
        res.sendStatus(200)
      } else {
        res.sendStatus(401)
      }
    }).catch((e) => {
      console.log(e)
      res.sendStatus(401)
    })
  }
  else {
    res.sendStatus(401)
  }
});
router.put('/activate/:uuid', function(req, res) {
    User.activate(req.params.uuid).then((query)=>{
      if (query.count == 1) {
        let token = Jwt.sign({id: query.id}, process.env.SECRETKEY || "test")
        res.status(200).json({'acess_token':token})
      } else {
        res.sendStatus(400)
      }
    }).catch((e)=>{
      console.log(e)
      res.sendStatus(401)
    })

});


module.exports = router;
