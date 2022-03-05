const Model = require("../../Model/Mongo")


const ViewAllMode =(req, res) => {


    Model.find(
        { email: req.body.email },
        (err, data) => {

            const senddata = data[0].viewAllImages

            res.send(senddata)

        })
}

const setViewAllMode =(req, res) => {

    console.log("setViewAllMode", req.body.email, req.body.data)

    Model.findOneAndUpdate(
        { email: req.body.email },
        { viewAllImages: req.body.data },
        (err, data) => {

            res.send('ok')

        })
}
module.exports={ViewAllMode,setViewAllMode}