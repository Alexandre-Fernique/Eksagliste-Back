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
            password: null,
            active:false
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
function activate(uuid){
    return prisma.user.updateMany({
        where:{
            id : uuid,
            active: false
        },
        data:{
            active:true
        }
    })
}
module.exports ={login,signin,create,update,activate}