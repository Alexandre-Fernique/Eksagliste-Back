const Jwt = require("jsonwebtoken");

function decode(req){
    return new Promise((resolve, reject) => {
        const token = req.headers.authorization.substring(7)
        try {
            const decoded = Jwt.verify( token,process.env.SECRETKEY || "test");
            resolve(decoded)
        } catch(err) {
            console.log(err)
            reject(err)
        }
    })
}
module.exports={decode}