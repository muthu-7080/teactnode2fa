const DBconnection = require('../config/db');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { Novu } = require("@novu/node");

const APIKEY = new Novu("<YOUR_API_KEY>");



module.exports = {
    register: async (data, res) => {

        let checkuserExists = `SELECT email FROM users WHERE email = '${data.email}' LIMIT 1 `

        if (checkuserExists) {
            let bcryptPassword = bcrypt.hashSync(data.password, 10)
            let query = `INSERT INTO users (name, email, mobile, password) 
            VALUES ("${data.name}", "${data.email}", "${data.mobile}", "${bcryptPassword}")`
            console.log(query)
            await DBconnection.query(
                query
            )
            res.status(200).json({
                status: "success"
            })
        } else {
            res.status(200).json({
                status: "failed",
                message: "user already exists"
            })
        }


    },

    sendmail: async (req, res, next) => {
        console.log(req.body, "request mail")
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            port: 587,
            auth: {
                user: 'petchisathesh98@gmail.com',
                pass: 'yxucxtiqqkddszua                          '
            }
        })
        let mailOption = {
            from: 'petchisathesh98@example.com',
            to: req.body.email,
            subject: 'RESET PASSWORD',
            html: '<a href="http://localhost:3001/forgotpassword">RESET PASSWORD LINK</a>'
        }

        transporter.sendMail(mailOption).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    },


    login: async (req, res, next) => {
        let email = req.body.email;
        let query = `SELECT * FROM users WHERE email = "${email}" LIMIT 1`;

        let check = await DBconnection.query(query, (error, results) => {
            if (error) {
                res.status(400).json({
                    suucess: false,
                    message: "Error Occured"
                })
            } else {
                let check = JSON.parse(JSON.stringify(results))[0];
                console.log(check)
                const match = bcrypt.compare(req.body.password, check.password)
                if (match) {
                    res.status(200).json({
                        message: "Login success"
                    })

                } else {
                    res.status(401).json({
                        suucess: false,
                        message: "Invalid Password"
                    })
                }
            }
        })
    },

    sendSms: async (req, res) => {
        try {
            const generateCode = () => Math.random().toString(36).substring(2, 12);
            const accountSid = 'TWILIO_ACCOUNT_SID';
            const authToken = 'TWILIO_AUTH_TOKEN';
            const client = require('twilio')(accountSid, authToken);

            client.messages
                .create({ from:'sender mobile', body: `OTP for Two factor verification is ${generateCode}`, to: req.body.mobile })
                .then(message => console.log(message.sid));

        } catch (err) {
            console.error(err);
        }
    },

    verifycode:async(req,res) =>{
        if (generateCode=== req.body.generateCode) {
            return res.json({ message: "You're verified successfully" });
        }
        res.json({
            error_message: "Incorrect credentials",
        });
    },

    forgotPassword: async (req, res, next) => {
        let query = `SELECT * FROM users WHERE email = "${req.body.email}" LIMIT 1`;
        let check = await DBconnection.query(query)

        if (check !== null) {
            const hashpassword = bcrypt.hashSync(req.body.confirmpassword, 10)
            let query = `UPDATE users SET password = "${hashpassword}" LIMIT 1`;
            let update = await DBconnection.query(query)
            if (update) {
                res.status(200).json({
                    status: "success",
                    "message": "Password Reset successfully"
                })
            } else {
                res.status(400).json({
                    status: "failed",
                    "message": "password reset failed"
                })
            }
        } else {
            res.status(400).json({
                status: "failed",
                "message": "user not exist"
            })
        }
        res.status(200).json({
            status: "success"
        })
    }


}