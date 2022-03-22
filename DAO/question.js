const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()


function create(question){
    return prisma.question.create({
        data:{
            question
        }
    })
}



module.exports ={create}