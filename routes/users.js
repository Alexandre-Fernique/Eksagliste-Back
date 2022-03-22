const express = require('express');
const router = express.Router();
const path = require('path');
const User = require(path.join(__dirname, '../DAO/user'))
const Test = require(path.join(__dirname, '../bin/Test'))
const Jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');



router.post('/login', function(req, res) {
  if(Test.email(req.body.email)) {
    User.login(req.body.email).then((query)=>{
      if (query != null && passwordHash.verify(req.body.password, query.password)) {
        let token = Jwt.sign({id: query.id}, process.env.SECRETKEY || "test")
        res.json({'acess_token':token})
      } else {
        res.sendStatus(400)
      }
    }).catch((e) => {
      console.log(e)
      res.send(
          'err');
    })
  }else {
    res.sendStatus(401)
  }
});

router.post('/create', function(req, res) {
  if(process.env.AUTHADMINKEY == req.headers.authorization){
    User.create(req.body.email,req.body.formation, req.body.annee).then(()=>{
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


module.exports = router;
