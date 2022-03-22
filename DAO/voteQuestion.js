const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()


function vote(uuid, question, liste){
    return prisma.voteQuestion.upsert({
        where:{
            userId_questionId:{
                userId: uuid,
                questionId: question
            }
        },
        update:{
            listeId:liste
        },
        create: {
            userId:uuid,
            questionId: question,
            listeId:liste
        }
    })
}



function countVote(){
    return prisma.voteQuestion.groupBy({
        by: ["questionId","listeId"],
        select:{
            questionId:true,
            questionVoted: {
                select: {
                    question: true
                }
            },
            listeVoted: {
                select: {
                    title: true
                }
            },
            _count: {
                select: {
                    _all: true
                }
            }
        }
    })
}
function countJoursVote(){
    return prisma.VoteDate.groupBy({
        by:["date","listeId"],
        orderBy: {
            question: 'asc',
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
module.exports ={vote,countVote,voteUser,countJoursVote}