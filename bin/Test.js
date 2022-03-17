
function email(email){
    return (email.length <= 200 || email.endsWith("@etu.umontpellier.fr"));


}
function text(text){
    return text.length <= 500;


}
function password(password){
    return password.length >= 8;


}

module.exports={email,password,text}