const Model = require("../../Model/Mongo")
const code = Math.floor(Math.random() * (1000 - 9999 + 1)) + 9999
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");



// ---------------------------------------------------------Login SignIn Apis----------------------------------------------------------------------
const sendConfirmation=(req, res) => {

    console.log(code)
    console.log("/user/sendConfirmation");

    let emailsent=false;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "dashappv1@gmail.com",
            pass: "123@qwerty",
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const mailoption = {
        from: "dashappv1@gmail.com",
        to: `${req.body.email}`,
        subject: "DataShare Verification",
        text: `Hello ${req.body.name} ! We are happy to know that you want to create account in our website . And you are only one step far . Write this confirmation code :  ${code}`
    }

    transporter.sendMail(mailoption, function(error, res){
      
        if (error){ return console.log(error); }
            
        return res.send('ok')

    })
    if(emailsent){
        return console.log("success");
    }
    else{
        return res.status(500).send({message: "Failed"})
    }

}

const userSignupAccess=(req, res) => {
    console.log('data[0]')

    Model.find({ email: req.body.email }, (err, data) => {

        res.send(data[0])
        console.log('data[0]')

    })
}


const SignIn=(req, res) => {

    console.log(req.body.confirmation_Code, code);
    console.log("----------------")
    console.log(req.body.confirmation_Code.toString() == code)
    if (req.body.confirmation_Code == code) {
        console.log('Acess');
        console.log(process.env.SECRET_KEY)
        Model.find({ email: req.body.email }, (err, data) => {

            if (data[0] == undefined) {

                const jwtTokken = jwt.sign({ _id: req.body.email }, process.env.SECRET_KEY)

                const insertNewUserModel = Model({
                    username: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    messages: [{ 'main': [] }],
                    imagefolder: [{ 'main': [] }],
                    wordfolder: [{ 'main': [] }],
                    pdffolder: [{ main: [] }],
                    viewAllImages: false,
                    textDoc: [{ main: [] }],
                    token: 'tokken',
                    jwt: jwtTokken,
                    folderPassword: '',
                    recentFolders: [],
                    profile: '',
                })
                insertNewUserModel.save()
                res.cookie("jwt", jwtTokken)
                res.send("Data Inserted")


console.log("Data Inserted")

            }
            else { res.send("User Already exisit")
        console.log("User Already exisit") }
        })

    } else {
        res.send("Incorrect")
        console.log("denied");
    }

}


const nameverify=(req, res) => {

    console.log("/nameverify", req.body.name)

    Model.find(
        { username: req.body.name },
        (err, data) => {
            if (data.length !== 0) {
                res.send('not available')

            }
            else {
                res.send('available');
                console.log("available name")
            }

        })

}

const emailverify=(req, res) => {

    console.log("/nameverify", req.body.email)

    Model.find(
        { email: req.body.email },
        (err, data) => {
            try {
                if (data === []) { res.send('not available') }
                else { res.send('available');console.log("available email") }
            }
            catch (error) { console.log(error) }
        })

}

const deleteUserAccount = (req, res) => {

    Model.findOneAndRemove({ email: req.body.email }, { new: true }, (err, data) => { res.send(data); })

    res.clearCookie('jwt', { domain: 'localhost', path: '/' })

}


module.exports = {SignIn,sendConfirmation,userSignupAccess,nameverify,emailverify,deleteUserAccount}