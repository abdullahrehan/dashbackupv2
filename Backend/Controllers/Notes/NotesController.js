const Model = require("../../Model/Mongo")


const notes=(req, res) => {

    Model.find({ email: req.body.email }, (err, data) => {
        const notes = data[0].textDoc.main;
        const notesfolder=notes[notes.findIndex(data => data.name === req.body.folder)]
        res.send(notesfolder)
    })

}

const uploadNotes=(req, res) => {

    Model.findOneAndUpdate(
        { email: req.body.email, "textDoc.main.value": { heading: req.body.folder, body: req.body.folder } },
        { $push: { 'textDoc.main.$.value': { heading: req.body.header, body: req.body.data } } }, { new: true },
        (err, data) => { res.send(data) })

}

const deleteNotes=(req, res) => {
    Model.findOneAndUpdate(
        { email: req.body.email, "textDoc.main.value": { heading: req.body.folder, body: req.body.folder } },
        { $pull: { 'textDoc.main.$.value': { heading: req.body.header, body: req.body.data } } }, { new: true },
        (err, data) => { res.send(data) })

}



// route.post("/convert", async (req, res) => {

//     const docx = htmlDocx.asBlob('<h2>Hello</h2>');
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.setHeader('Content-Disposition', `attachment; filename=demo.doc`);
//     res.setHeader('Content-Length', 2);
//     res.send(docx);
//     console.log(docx)

// })



const notesImages=(req, res) => {


}

// -------------Update Notes -------------

const notesUpdate=(req, res) => {

    Model.find(
        { email: req.body.email },
        (err, data) => {
            const Data = data[0].textDoc.main
            const folderData = Data[Data.findIndex(data => data.name === req.body.currentFolder)]
            const UpdatedValue = folderData.value.find(data => data.heading === req.body.oldheading)

            UpdatedValue.body = req.body.body
            UpdatedValue.heading = req.body.heading
            console.log(req.body.heading, UpdatedValue)
            Model.findOneAndUpdate(
                { email: req.body.email },
                { $set: { textDoc: { main: Data } } },
                { new: true },
                (err, data) => { res.send('updated') })

        })
}


const sendtoFoldersNotes=(req, res) => {

    const tab = req.body.currentTab
    console.log(tab, req.body.folder,)

    Model.findOneAndUpdate(
        { email: req.body.email, [`${tab}.main.value`]: { heading: req.body.folder, body: req.body.folder } },
        { $push: { [`${tab}.main.$.value`]: { heading: req.body.header, body: req.body.body } } },
        { new: true }, (err, data) => { res.send('File Send') })

}

module.exports = {notes,uploadNotes,deleteNotes,notesImages,notesUpdate,sendtoFoldersNotes}