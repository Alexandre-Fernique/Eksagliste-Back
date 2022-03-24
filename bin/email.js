const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
});

function sendEmail(destination,uuid){
    return new Promise((resolve, reject) => {
        console.log(destination)
        try {
            transporter.sendMail({
                from: '"Support Eksagliste 👻" <'+process.env.MAIL_USER+'>', // sender address
                to: destination, // list of receivers
                subject: "Activation de compte", // Subject line
                text: "Hello, \nClique sur le lien suivant pour activer ton compte \nhttps://eksagliste.me/activate/"+uuid, // plain text body
                html: "<p style='font-size: 12px;color: black;'>Hello,<br>Clique sur le lien suivant pour activer ton compte<br><a href='https://eksagliste.me/activate/"+uuid+"'>https://eksagliste.me/activate/"+uuid+"</a></p><table class=\"sc-gPEVay eQYmiW\" style=\"border-collapse: collapse; font-size: medium; font-family: Arial;\" cellspacing=\"0\" cellpadding=\"0\">\n" +
                    "<tbody>\n" +
                    "<tr>\n" +
                    "<td style=\"padding: 0px;\">\n" +
                    "<table class=\"sc-gPEVay eQYmiW\" style=\"border-collapse: collapse; font-size: medium; font-family: Arial;\" cellspacing=\"0\" cellpadding=\"0\">\n" +
                    "<tbody>\n" +
                    "<tr>\n" +
                    "<td style=\"padding: 0px; vertical-align: middle;\" width=\"150\"><span class=\"sc-kgAjT cuzzPp\" style=\"margin-right: 20px; display: block;\"><img class=\"sc-cHGsZl bHiaRe\" style=\"max-width: 130px;\" src=\"https://eksagliste.me/assets/eksagliste.png\" width=\"130\" /></span></td>\n" +
                    "<td style=\"padding: 0px; vertical-align: middle;\">\n" +
                    "<h3 class=\"sc-fBuWsC eeihxG\" style=\"margin: 0px; font-size: 18px; color: #000000;\">Alexandre Fernique</h3>\n" +
                    "<p class=\"sc-fMiknA bxZCMx\" style=\"margin: 0px; color: #000000; font-size: 14px; line-height: 22px;\">Web</p>\n" +
                    "<p class=\"sc-dVhcbM fghLuF\" style=\"margin: 0px; font-weight: 500; color: #000000; font-size: 14px; line-height: 22px;\">Eksagliste</p>\n" +
                    "</td>\n" +
                    "<td style=\"padding: 0px;\" width=\"30\">\n" +
                    "<div style=\"width: 30px;\"> </div>\n" +
                    "</td>\n" +
                    "<td class=\"sc-jhAzac hmXDXQ\" style=\"padding: 0px; width: 1px; border-bottom: none; border-left: 1px solid #f2547d;\" width=\"1\"> </td>\n" +
                    "<td style=\"padding: 0px;\" width=\"30\">\n" +
                    "<div style=\"width: 30px;\"> </div>\n" +
                    "</td>\n" +
                    "<td style=\"padding: 0px; vertical-align: middle;\">\n" +
                    "<table class=\"sc-gPEVay eQYmiW\" style=\"border-collapse: collapse; font-size: medium; font-family: Arial;\" cellspacing=\"0\" cellpadding=\"0\">\n" +
                    "<tbody>\n" +
                    "<tr style=\"vertical-align: middle;\">\n" +
                    "<td style=\"padding: 0px; vertical-align: middle;\" width=\"30\">\n" +
                    "<table class=\"sc-gPEVay eQYmiW\" style=\"border-collapse: collapse; font-size: medium; font-family: Arial;\" cellspacing=\"0\" cellpadding=\"0\">\n" +
                    "<tbody>\n" +
                    "<tr>\n" +
                    "<td style=\"padding: 0px; vertical-align: bottom;\"><span class=\"sc-jlyJG bbyJzT\" style=\"display: block; background-color: #f2547d;\"><img class=\"sc-iRbamj blSEcj\" style=\"display: block; background-color: #f2547d;\" src=\"https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/email-icon-2x.png\" width=\"13\" /></span></td>\n" +
                    "</tr>\n" +
                    "</tbody>\n" +
                    "</table>\n" +
                    "</td>\n" +
                    "<td style=\"padding: 0px;\"><a class=\"sc-gipzik iyhjGb\" style=\"text-decoration: none; color: #000000; font-size: 12px;\" href=\"mailto:support@eksagliste.me\">support@eksagliste.me</a></td>\n" +
                    "</tr>\n" +
                    "<tr style=\"vertical-align: middle;\">\n" +
                    "<td style=\"padding: 0px; vertical-align: middle;\" width=\"30\">\n" +
                    "<table class=\"sc-gPEVay eQYmiW\" style=\"border-collapse: collapse; font-size: medium; font-family: Arial;\" cellspacing=\"0\" cellpadding=\"0\">\n" +
                    "<tbody>\n" +
                    "<tr>\n" +
                    "<td style=\"padding: 0px; vertical-align: bottom;\"><span class=\"sc-jlyJG bbyJzT\" style=\"display: block; background-color: #f2547d;\"><img class=\"sc-iRbamj blSEcj\" style=\"display: block; background-color: #f2547d;\" src=\"https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/link-icon-2x.png\" width=\"13\" /></span></td>\n" +
                    "</tr>\n" +
                    "</tbody>\n" +
                    "</table>\n" +
                    "</td>\n" +
                    "<td style=\"padding: 0px;\"><a class=\"sc-gipzik iyhjGb\" style=\"text-decoration: none; color: #000000; font-size: 12px;\" href=\"//eksagliste.me\">eksagliste.me</a></td>\n" +
                    "</tr>\n" +
                    "</tbody>\n" +
                    "</table>\n" +
                    "</td>\n" +
                    "</tr>\n" +
                    "</tbody>\n" +
                    "</table>\n" +
                    "</td>\n" +
                    "</tr>\n" +
                    "<tr>\n" +
                    "<td style=\"padding: 0px;\">\n" +
                    "<table class=\"sc-gPEVay eQYmiW\" style=\"border-collapse: collapse; font-size: medium; font-family: Arial; width: 100%;\" cellspacing=\"0\" cellpadding=\"0\">\n" +
                    "<tbody>\n" +
                    "<tr>\n" +
                    "<td style=\"padding: 0px;\" height=\"30\"> </td>\n" +
                    "</tr>\n" +
                    "<tr>\n" +
                    "<td class=\"sc-jhAzac hmXDXQ\" style=\"padding: 0px; width: 100%; border-bottom: 1px solid #f2547d; border-left: none; display: block;\" height=\"1\"> </td>\n" +
                    "</tr>\n" +
                    "<tr>\n" +
                    "<td style=\"padding: 0px;\" height=\"30\"> </td>\n" +
                    "</tr>\n" +
                    "</tbody>\n" +
                    "</table>\n" +
                    "</td>\n" +
                    "</tr>\n" +
                    "<tr>\n" +
                    "<td style=\"padding: 0px;\">\n" +
                    "<table class=\"sc-gPEVay eQYmiW\" style=\"border-collapse: collapse; font-size: medium; font-family: Arial; width: 100%;\" cellspacing=\"0\" cellpadding=\"0\">\n" +
                    "<tbody>\n" +
                    "<tr>\n" +
                    "<td style=\"padding: 0px; text-align: right; vertical-align: top;\">\n" +
                    "<table class=\"sc-gPEVay eQYmiW\" style=\"border-collapse: collapse; font-size: medium; font-family: Arial; display: inline-block;\" cellspacing=\"0\" cellpadding=\"0\">\n" +
                    "<tbody>\n" +
                    "<tr style=\"text-align: right;\">\n" +
                    "<td style=\"padding: 0px;\"><a class=\"sc-hzDkRC kpsoyz\" style=\"display: inline-block; padding: 0px; background-color: #6a78d1;\" href=\"https://www.instagram.com/eksagliste/\"><img class=\"sc-bRBYWo ccSRck\" style=\"background-color: #6a78d1; max-width: 135px; display: block;\" src=\"https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/instagram-icon-2x.png\" alt=\"instagram\" height=\"24\" /></a></td>\n" +
                    "<td style=\"padding: 0px;\" width=\"5\">\n" +
                    "<div> </div>\n" +
                    "</td>\n" +
                    "</tr>\n" +
                    "</tbody>\n" +
                    "</table>\n" +
                    "</td>\n" +
                    "</tr>\n" +
                    "</tbody>\n" +
                    "</table>\n" +
                    "</td>\n" +
                    "</tr>\n" +
                    "</tbody>\n" +
                    "</table>", // html body
            });
            resolve("ok")
        }catch (e){
            reject(e)
        }
    })
}
module.exports={sendEmail}