const cron = require('node-cron');
const nodemailer = require('nodemailer');

const db = require("./Models")

const { User } = db;

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
    }
});


cron.schedule('0 9 * * *', () => {
    User.findAll().then(users => {
        users.map(user => {
            const trackingPixel = `<img src="http://yourdomain.com/track/${user.id}" width="1" height="1" style="display:none" />`;

            const emailContent = `<p> Dear User, <br> Please find attached the document you requested. ${trackingPixel} <p>`;

            let mailOptions = {
                from: 'youremail@gmail.com',
                to: user.email,
                subject: 'Daily Report',
                html: emailContent
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        })
      });
}
// {
//     scheduled: true,
//     timezone: "America/Sao_Paulo"
//   }
  );

