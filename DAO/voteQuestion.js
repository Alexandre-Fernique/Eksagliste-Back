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
    var result = []
    const questions = await Question.getAll()
    const listes = await Liste.getAll()
    for(var i = 0; i<questions.length; i++){
        var voteQ = {
            question: questions[i].question,
            questionId: questions[i].id,
            listes: []
        }
        for(var j = 0; j < listes.length; j++){
            const nbVote = await countVote(questions[i].id, listes[j].id)
            voteQ.listes.push({
                liste: listes[j].title,
                id: listes[j].id,
                vote: nbVote
            })
        }
        result.push(voteQ)
    }
    return result
}


async function countVote(question, liste){
    const result = await prisma.voteQuestion.findMany({
        where: {
            questionId: question,
            listeId: liste
        }
    })
    return result.length
}

//question = question id
function voteUser(id, question){
    return prisma.voteQuestion.findUnique({
        where:{
            userId_questionId:{
                userId: id,
                questionId: question
            }
        },
        select:{
            listeId:true,
        }
    })
}
module.exports ={vote, getVoteQuestion, voteUser}