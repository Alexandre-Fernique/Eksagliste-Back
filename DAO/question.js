const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()


function create(question){
    return prisma.question.create({
        data:{
            question
        }
    })
}

function getAll() {
    return prisma.question.findMany({
        select: {
            id: true,
            question: true
        }
    });
}

module.exports ={create, getAll}