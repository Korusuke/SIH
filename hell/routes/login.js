const express = require('express');
const jwt = require('jsonwebtoken');  
const otpGenerator = require('otp-generator');
const router = express.Router(); 
const User = require('../models/user.model');


router.post('/login', (req, res) => {
    const Email = req.body.Email;
    const Password = req.body.Password;
    User.find({Email, Password})
        .then(user => {
            if(!user){
                res.status(200).json({loggedin: false});
                return;
            }
            console.log(Email);
            jwt.sign({Email}, process.env.KEY, { expiresIn: "30d" }, (er, token) => {
                if (er) {
                  console.log(er);
                  res.send(500);
                  return;
                }
                res.json({
                    loggedin: false,
                    msg: 'Passwords match',
                    token,
                });
              });
            
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/verify', (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    User.find({email, otp})
        .then(user => {
            if(user)
                res.status(200).json({verified: true});
            else 
                res.status(200).json({verified: false});       
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const otp = otpGenerator.generate(6, { specialChars: false });
    
    const newUser = new User({email, password, otp});

    newUser.save()
        .then(() => {
            const emailId = process.env.EMAIL;
            const password = process.env.PASSWORD; 
            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth:{
                    user: emailId,
                    pass: password
                },
                port: 465,
                secureConnection: true,
                });
            
            const team = "Team_Probably";
            var mailOptions = {
                from: emailId,
                to: member,
                subject: "Invitation code for SIH internal hackathon",
                html: `<html>
                <body>
                    <p>Hey,
                    <br>You have been invited by ${sender} to join the team ${team}.<br>
                    <br>Here is the code to join the team: ${code}</br>
                    </p>
                </body>
                </html>`
            }

            transporter.sendMail(mailOptions, function(err){
                if(err){
                    res.json({
                        'msg':'Failed to send mail'
                    });
                    throw(err);
                }
                console.log('Mail sent succesfully');
                res.json({
                    msg: 'Check your mail for otp'
                });
            });
            transporter.close();

            res.json('User added!')
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;

