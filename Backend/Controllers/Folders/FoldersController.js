const Model = require("../../Model/Mongo")

const folders=(req, res) => {

    const email = req.body.email
    const tab = req.body.tab
    Model.find(
        { email: email },
        (err, data) => {

            const folder = data[0][tab].main
            const sendData = folder.map((data) => { return { name: data.name, secure: data.secure } })
            res.send(sendData);
        })
}


const folderStatus=(req, res) => {

    const email = req.body.email
    const tab = req.body.currentTab
    const folderName = req.body.currentFolder

    Model.find(
        { email: email },
        (err, data) => {

            const folder = data[0][tab].main.find(data => data.name === folderName).secure
            res.send(folder);


        })
}



const createfolder=(req, res) => {

    const tab = req.body.MainfolderName
    const files = { defaultName: req.body.newfolderName, editedName: req.body.newfolderName }
    const text = { heading: req.body.newfolderName, body: req.body.newfolderName }

    const insertedValue = tab === 'textDoc' || tab === 'messages' ? text : files

    Model.findOneAndUpdate(
        { email: req.body.email, [`${tab}.main.name`]: "MainFolder" },
        { $push: { [`${tab}.main`]: { name: req.body.newfolderName, value: [insertedValue], secure: false } } },
        { new: true },
        (err, data) => {
            // res.send(data)
        })

}



// -------------Delete Folders  -------------
const deleteFolder=(req, res) => {

    if (req.body.folderName !== 'MainFolder') {

        const tab = req.body.currentTab
 
        Model.findOneAndUpdate(
            { email: req.body.email, [`${tab}.main.name`]: "MainFolder" },
            { $pull: { [`${tab}.main`]: { name: req.body.folderName } } },
            { new: true },
            (err, data) => {
                // res.send(data)
            })

    
    }
}


const folderPassword = (req, res) => {

    const folder_Password = Model.findOneAndUpdate({ email: req.body.email },
        { $set: { folderPassword: req.body.folderPassword } }, (err, data) => { console.log(data) })

}
const setFoldertoSecure = (req, res) => {
    const tab = req.body.tab

    Model.findOneAndUpdate(
        { email: req.body.email, [`${tab}.main.name`]: req.body.currentFolder },
        { $set: { [`${tab}.main.$.secure`]: req.body.secure } },
        { new: true },
        (err, data) => { res.send('ok') })

}


module.exports={folders,folderStatus,createfolder,deleteFolder,folderPassword,setFoldertoSecure}
