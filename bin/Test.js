
function email(email =""){
    if(email.length <= 200 || email.endsWith("@etu.umontpellier.fr")){
        return true
    }
    return false

}

module.exports={email}