const express = require('express');
const router = express.Router();
const path = require('path');
const User = require(path.join(__dirname, '../DAO/user'))
const Test = require(path.join(__dirname, '../bin/Test'))
const Jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');



router.post('/login', function(req, res) {
  if(Test.email(req.body.email)) {
  console.log(req.body)
    User.login(req.body.email).then((query) => {
      console.log(query)
      if (passwordHash.verify(req.body.password, query.password)) {
        let token = Jwt.sign({id: query.id}, process.env.SECRETKEY || "test")
        res.json({'acess_token':token})
      } else {
        res.send("wrong user")
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
  console.log(req.body)
  User.create(req.body.email,req.body.formation, req.body.annee).then((res)=>{
    console.log(res)
  }).catch((e)=>{
    console.log(e)
  })

  res.send('respond with a resource');
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
