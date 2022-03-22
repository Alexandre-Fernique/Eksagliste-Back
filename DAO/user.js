const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

function login(email){
    return prisma.user.findUnique({
        where: {email: email},
    })
}
function signin(email,password,formation,annee){
    return prisma.user.updateMany({
        where:{
            email,
            password: null
        },
        data: {
            password,
            formation,
            annee
        }
    })
}
function create(email){
    return prisma.user.create({
        data: {
            email
        }
    })
}
function update(uuid,password){
    return prisma.user.updateMany({
        where:{
            id : uuid,
            password: null
        },
        data:{
            password
        }
    })
}
module.exports ={login,signin,create,update}