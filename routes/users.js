const express = require('express');
const router = express.Router();
const path = require('path');
const User = require(path.join(__dirname, '../DAO/user'))
const Test = require(path.join(__dirname, '../bin/Test'))
const Jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');



router.post('/login', function(req, res, next) {
  if(Test.email(req.body.email)) {
    User.login(req.body.email).then((query) => {
      console.log(query)
      if (passwordHash.verify(req.body.password, query.password)) {
        let token = Jwt.sign({id: query.id}, process.env.SECRETKEY || "test")
        console.log(token)
        res.cookie("token", token, {secure: true, httpOnly: true,})
        res.send('respond with a resource');
      } else {
        res.send("wrong user")
      }
    }).catch((e) => {
      console.log(e)
      res.send('err');
    })
  }else {
    res.sendStatus(401)
  }
});

router.post('/create', function(req, res, next) {
  console.log(req.body)

  User.create(req.body.email).then((res)=>{
    console.log(res)
  }).catch((e)=>{
    console.log(e)
  })

  res.send('respond with a resource');
});

router.put('/updatePassword/:uuid', function(req, res, next) {
    const hashedPassword = passwordHash.generate(req.body.password);
    User.update(req.params.uuid,hashedPassword).then((query)=>{
      if (query.count == 1){
        res.sendStatus(200)
      }else {
        res.sendStatus(401)
      }
    }).catch((e)=>{
      console.log(e)
      res.sendStatus(401)
    })
});


module.exports = router;
