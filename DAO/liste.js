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
    return prisma.liste.findMany({
        select:{
            id:true,
            title:true,
            image:true,
            _count:{
                select:{
                    vote:true
                }
            }

        }

    })
}
module.exports ={vote,countVote}