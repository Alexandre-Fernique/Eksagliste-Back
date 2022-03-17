const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

function login(email){
    return prisma.user.findUnique({
        where: {email: email},
    })
}
function create(email){
    return prisma.user.create({
            data: {
                email,
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
module.exports ={login,create,update}