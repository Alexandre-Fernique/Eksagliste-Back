const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()


function vote(email){
    return prisma.voteDate.create({
        data: {
            email,
        }
    })
}
function countVote(liste){
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
module.exports ={vote}