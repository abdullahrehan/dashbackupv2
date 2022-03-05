const Model = require("../../Model/Mongo")

const txtMessages = (req, res) => {

    Model.find({ email: req.body.email }, (err, data) => {
        const messages = data[0].messages.main
        res.send(messages[messages.findIndex(data => data.name === req.body.folder)])
    })

}

// -------------Upload Messages -------------
const uploadMessage = (req, res) => {

    const msg = { heading: req.body.heading, body: req.body.body, color: req.body.color }

    const messag = 'messages'
    console.log('enter uploadTxt')
    Model.findOneAndUpdate(
        { email: req.body.email, "messages.main.value": { heading: req.body.folder, body: req.body.folder } },
        { $push: { [`${messag}.main.$.value`]: msg } }, { new: true },
        (err, data) => { res.send(data) })

}

// -------------Update Message -------------
const UpdateMessage = (req, res) => {

    Model.find(
        { email: req.body.email },
        (err, data) => {
            const Data = data[0].messages.main
            const folderData = Data[Data.findIndex(data => data.name === req.body.currentFolder)]
            console.log(req.body.oldheading)
            const UpdatedValue = folderData.value.find(data => data.heading === req.body.oldheading)
            console.log(UpdatedValue)

            UpdatedValue.body = req.body.body
            UpdatedValue.heading = req.body.heading

            Model.findOneAndUpdate(
                { email: req.body.email },
                { $set: { messages: { main: Data } } },
                { new: true },
                (err, data) => { res.send("message updated") })

        })
}

const deleteMessage= (req, res) => {
    console.log(req.body.heading, req.body.body)
    Model.findOneAndUpdate(
        { email: req.body.email, 'messages.main.value': { heading: "MainFolder", body: "MainFolder" } },
        { $pull: { 'messages.main.$.value': { heading: req.body.heading, body: req.body.body } } },
        { new: true },
        (err, data) => { res.send("deleted"); console.log('deleted') })


}

module.exports={txtMessages,uploadMessage,UpdateMessage ,deleteMessage}
