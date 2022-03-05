const Model = require("../../Model/Mongo")


const sendMultipleFiles = (req, res) => {

    const tab = req.body.currentTab
    const mapData = req.body.file

    mapData.map(data => {

        Model.findOneAndUpdate(
            { email: req.body.email, [`${tab}.main.value`]: { defaultName: req.body.folder, editedName: req.body.folder } },
            { $push: { [`${tab}.main.$.value`]: { Url: data.Url, defaultName: data.defaultName, editedName: data.editedName, publicId: data.publicId } } },
            { new: true }, (err, data) => { })

        Model.findOneAndUpdate(
            { email: req.body.email, [`${tab}.main.value`]: { defaultName: req.body.currentFolder, editedName: req.body.currentFolder } },
            { $pull: { [`${tab}.main.$.value`]: { defaultName: data.defaultName, editedName: data.editedName } } },
            { new: true },
            (err, data) => { console.log('removed') })

    })

    res.send('Transfered Files')
}

const sendMultipleFilesNotes = (req, res) => {

    const tab = req.body.currentTab
    const mapData = req.body.file

    mapData.map(data => {

        Model.findOneAndUpdate(
            { email: req.body.email, [`${tab}.main.value`]: { heading: req.body.folder, body: req.body.folder } },
            { $push: { [`${tab}.main.$.value`]: { heading: data.heading, body: data.body } } },
            { new: true }, (err, data) => { })

        Model.findOneAndUpdate(
            { email: req.body.email, [`${tab}.main.value`]: { heading: req.body.currentFolder, body: req.body.currentFolder } },
            { $pull: { [`${tab}.main.$.value`]: { heading: data.heading, body: data.body } } },
            { new: true },
            (err, data) => { console.log('removed') })


    })

    res.send('Transfered Files')
}


const deleteMultipleFiles = (req, res) => {

    const tab = req.body.currentTab
    const mapData = req.body.file

    mapData.map(data => {


        Model.findOneAndUpdate(
            { email: req.body.email, [`${tab}.main.value`]: { defaultName: req.body.currentFolder, editedName: req.body.currentFolder } },
            { $pull: { [`${tab}.main.$.value`]: { Url: data.Url, defaultName: data.defaultName, editedName: data.editedName, publicId: data.publicId } } },
            { new: true },
            (err, data) => {
                console.log('removed')
            })

    })
    res.send('deleted Files')

    mapData.map(data => {
        try { cloudinary.uploader.destroy(data.publicId) }
        catch (error) { console.log(error) }
    })

}

const sendtofolders = (req, res) => {

    const tab = req.body.currentTab

    Model.findOneAndUpdate(
        { email: req.body.email, [`${tab}.main.value`]: { defaultName: req.body.folder, editedName: req.body.folder } },
        { $push: { [`${tab}.main.$.value`]: { Url: req.body.file.Url, defaultName: req.body.file.defaultName, editedName: req.body.file.editedName, publicId: req.body.file.publicId } } },
        { new: true }, (err, data) => { res.send('File Send') })

    Model.findOneAndUpdate(
        { email: req.body.email, [`${tab}.main.value`]: { defaultName: req.body.currentFolder, editedName: req.body.currentFolder } },
        { $pull: { [`${tab}.main.$.value`]: { Url: req.body.file.Url, defaultName: req.body.file.defaultName, editedName: req.body.file.editedName, publicId: req.body.file.publicId } } },
        { new: true },
        (err, data) => { console.log('removed') })

}

module.exports={sendMultipleFiles,sendMultipleFilesNotes,deleteMultipleFiles,sendtofolders}




