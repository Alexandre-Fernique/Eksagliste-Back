const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const path = require('path');
const Question = require(path.join(__dirname, './question'))
const Liste = require(path.join(__dirname, './liste'))

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

async function getVoteQuestion(){
    var result = {
        vote: []
    }
    const questions = await Question.getAll()
    const listes = await Liste.getAll()
    for(var i = 0; i<questions.length; i++){
        var voteQ = {
            question: questions[i].question,
            listes: []
        }
        for(var j = 0; j < listes.length; j++){
            const nbVote = await countVote(questions[i].id, listes[j].id)
            voteQ.listes.push({
                liste: listes[j].title,
                vote: nbVote
            })
        }
        console.log(voteQ)
        result.vote.push(voteQ)
    }
    console.log(result)
    return result
}


async function countVote(question, liste){
    console.log(question, liste)
    const result = await prisma.voteQuestion.findMany({
        where: {
            questionId: question,
            listeId: liste
        }
    })
    console.log(result.length)
    return result.length
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
module.exports ={vote, getVoteQuestion, countVote,voteUser,countJoursVote}