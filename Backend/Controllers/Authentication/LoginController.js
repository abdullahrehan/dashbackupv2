const Model = require("../../Model/Mongo")

const jwt = require("jsonwebtoken");

const login=(req, res) => {

    console.log("/user/login")

    Model.find({ email: req.body.email }, (err, data) => {

        if (data[0] !== undefined) {
            
            console.log(data[0].password, req.body.password)

            if (data[0].password === req.body.password) {

                const jwtTokken = jwt.sign({ _id: req.body.email }, process.env.SECRET_KEY)
                res.cookie("jwt", jwtTokken, { maxAge: 1000 * 60 * 10 * 20000, httpOnly: false, secure: false })
                res.send(data[0])

            }
            else {
                res.send({ msg: 'password incorrect', data: [data[0].username, data[0].profile] })
            }
        }
        else { res.send({ msg: "invalid email" }); }
    })
}

const logouts = (req, res) => {
    res.clearCookie('jwt', { path: '/' })
    res.send('Cookie deleted 2')
    console.log('Cookie deleted 2')

}

const jwtFunc = (req, res) => {

    try {
        const tokken_id = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY)
        Model.find({ email: tokken_id }, (err, data) => { 
            res.send(data); 
            console.log(data[0].username, 'data'); 
            // user = data[0].username 
        })

    } catch (error) {
        res.send('error')
 
    }
}

const resetpassword = (req, res) => {

    console.log(req.body.accountPassword, 'as', req.body.folderPassword);

    if (req.body.accountPassword !== null && req.body.folderPassword !== null) {
        console.log('condition1');
        Model.findOneAndUpdate({ email: req.body.email }, { password: req.body.accountPassword }, (err, data) => { console.log(data); })
        Model.findOneAndUpdate({ email: req.body.email }, { folderPassword: req.body.folderPassword }, (err, data) => { console.log(data); })
    }
    else if (req.body.accountPassword !== null && req.body.folderPassword == null) {
        console.log('condition2');

        Model.findOneAndUpdate({ email: req.body.email }, { password: req.body.accountPassword }, (err, data) => { console.log(data); })
    }
    else if (req.body.accountPassword == null && req.body.folderPassword !== null) {
        console.log('condition3');

        Model.findOneAndUpdate({ email: req.body.email }, { folderPassword: req.body.folderPassword }, (err, data) => { console.log(data); })
    }
}


module.exports = {login,logouts,jwtFunc,resetpassword}