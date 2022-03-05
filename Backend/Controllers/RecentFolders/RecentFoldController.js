const Model = require("../../Model/Mongo")

const recentFoldersData=(req, res) => {
    Model.find(
        { email: req.body.email },
        (err, data) => {
        const folder = data[0].recentFolders.find(data => data.name === req.body.currentTab).value

            res.send(folder)

        })
}


const recentFolders=(req, res) => {

    const tab = req.body.currentTab
    const folder = req.body.folderName
    const secure = req.body.secure
    const push = { name: folder, secure: secure }

    Model.find({ email: req.body.email }, (err, data) => {
        const recentFolderData = data[0].recentFolders
        const Data = recentFolderData[recentFolderData.findIndex(data => data.name === tab)].value


        const condition = Data.find(data => data.name === folder) === undefined

        if (condition) {

            const folders = [...Data, push]
            folders.length >= 5 ? folders.shift() : folders
            const filterArray = folders.filter(data => data.name !== 'MainFolder')

            Model.findOneAndUpdate(
                { email: req.body.email, "recentFolders.name": tab },
                { $set: { [`recentFolders.$.value`]: filterArray } },
                { new: true },
                (err, data) => {
                    res.send(data.recentFolders[data.recentFolders.findIndex(data => data.name === tab)].value)
                })
        }

    })
}


const setrecentFolders=(req, res) => {

    const tab = req.body.currentTab

    Model.findOneAndUpdate(
        { email: req.body.email, "recentFolders.name": tab },
        { $set: { [`recentFolders.$.value`]: req.body.newList } },
        { new: true },
        (err, data) => {
            res.send('ok')
        })


}
const deletRecentFolders=(req, res) => {

    const tab = req.body.currentTab
    const folder = req.body.folderName


    Model.findOneAndUpdate(
        { email: req.body.email, "recentFolders.name": tab },
        { $pull: { [`recentFolders.$.value`]: { name: folder } } },
        { new: true },
        (err, data) => {
            // res.send(data)
        })


}
module.exports={recentFoldersData,recentFolders,setrecentFolders,deletRecentFolders}
