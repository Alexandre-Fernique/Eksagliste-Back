const formationInge =["IG","MI","MSI","EGC","STE","SE","MEA","MAT","DO","GBA"]
function email(email){
    return (email.length <= 200 || email.endsWith("@etu.umontpellier.fr"));


}
function text(text){
    return text.length <= 500;


}
function password(password){
    return password.length >= 8;
}
function formation(formation,annee){
    if(formationInge.includes(formation) && (annee == 3||annee == 4 || annee == 5)){
        return true
    }
    else if(formation=="PEIP" && (annee == 1||annee == 2 )){
        return true
    }
    else {
        return false
    }

}

module.exports={email,password,text,formation}