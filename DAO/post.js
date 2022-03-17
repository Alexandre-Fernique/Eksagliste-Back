const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()


function create(uuid,text){
    return prisma.post.create({
        data:{
            text,
            authorId:uuid
        }
    })
}

module.exports ={create}