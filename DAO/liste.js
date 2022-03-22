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
            _count: {
                select: {
                    vote: true
                }
            }
        }
    })
}
function countJoursVote(){
    return prisma.VoteDate.groupBy({
        by:["date","listeId"],
        orderBy: {
            date: 'desc',
        },
        select:{
            date:true,

            listeId:true,


        },
        _count: {
            userId: true,
        },





    })
}
function voteUser(id){
    const date = new Date()
    return prisma.VoteDate.findUnique({
        where:{
            userId_date:{
                userId: id,
                date: date.toISOString()
            }
        },
        select:{
            listeId:true,


        }

    })
}

function getAll() {
    return prisma.Liste.findMany({
        select: {
            id: true,
            title: true
        }
    });
}
module.exports ={vote,countVote,voteUser,countJoursVote, getAll}