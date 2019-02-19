export function sendEmail(auth_user: string, auth_password: string, mailOptions_from: string, mailOptions_to: any, pug_htm: any) {
    const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: auth_user,
            pass: auth_password
        }
    });
    let mailOptions = {
        from: mailOptions_from,
        to: mailOptions_to,
        subject: 'Successfull Registration',
        html: pug_htm
    };

    transporter.sendMail(mailOptions, function(error: Error, info: any){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}