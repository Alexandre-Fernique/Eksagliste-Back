const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()


function vote(uuid,liste){
    const date = new Date()
    return prisma.VoteDate.upsert({
        where:{
            userId_date:{
                userId: uuid,
                date: date.toISOString()
            }
        },
        update:{
            listeId:liste

        },
        create: {
            userId:uuid,
            listeId:liste

        }
    })
}
function countVote(){
    return prisma.VoteDate.groupBy({
        by:['listeId'],
        _count:{
            _all:true
        },
    })
}
module.exports ={vote,countVote}