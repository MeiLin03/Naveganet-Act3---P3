const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json({limit: "25mb"}));
app.use(express.urlencoded({limit: "25mb"}))
app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin","*");
    next();
});

function sendEmail({email,subject,message}){
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "meicastillo290@gmail.com",
                pass: "lmuf spva ljid lrxq"
            }
        });

        const mail_configs = {
            from: "meicastillo290@gmail.com",
            to: email,
            subject: subject,
            text: message,
        };

        transporter.sendMail(mail_configs, function (error, info){
            if(error){
                console.log(error);
                return reject({message: 'an error ocurred'})
            }

            return resolve({message: "Email sent successfully"});
        })
    })
}


app.get("/",(req, res) => {
    sendEmail(req.query)
    .then((response)=> response.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
    console.log('nodemailer is listening at http://localhost:${port}');
})