const Model = require("../../Model/Mongo")
const cloudinary = require('../../utils/cloudinary')


const ImageData = (req, res) => {

    const email = req.body.email
    const tab = req.body.currentTab
    const folderName = req.body.currentFolder

    Model.find(
        { email: email },
        (err, data) => {

            const folder = data[0][tab].main.find(folder => folder.name === folderName).value
            res.send(folder);


        })
}

const ProfilePicture = (req, res) => {

    Model.find(
        { email: req.body.email },
        (err, data) => {

            const folder = data[0].profile
            // console.log(folder)
            // console.log(data[0])
            res.send(folder);


        })
}

// ---------------Image upload----------------

const uploadValue = (req, res) => {
    uploadFolderTab = req.body.tab
    uploadFolder = req.body.folder
    res.send('ok')
}




const uploads = async (req, res) => {



    const tab = req.body.tab

    req.files.map(async (data, index) => {


        const result = await cloudinary.uploader.upload(data.path)

        const filename = { defaultName: data.originalname, editedName: '', publicId: result.public_id, Url: result.secure_url }


        Model.findOneAndUpdate(
            { email: req.body.email, [`${tab}.main.value`]: { defaultName: req.body.folder, editedName: req.body.folder } },
            { $push: { [`${tab}.main.$.value`]: filename } },
            { new: true },
            (err, data) => {
                //    console.log('data')
                if (index === req.files.length - 1) {
                    res.send('uploaded')
                }
            })
        //  res.send("uploaded")

    })


}


const editedImageName = (req, res) => {



    Model.find({ email: req.body.email }, (err, data) => {

        const folderArray = data[0][req.body.tab].main
        const findarray = folderArray.find(findData => findData.name == req.body.folder)
        const findImage = findarray.value.find(findData => findData.defaultName === req.body.imagename)
        findImage.editedName = req.body.newName

        const Folderdata = [...folderArray]

        Model.findOneAndUpdate({ email: req.body.email }, { $set: { [req.body.tab]: { main: Folderdata } } }, { new: true }, (err, data) => {

            res.send('name Changed')
        })
    })

}

const uploadProfile =async(req, res) => {

    const result = await cloudinary.uploader.upload(req.file.path)

    Model.findOneAndUpdate({ email: req.body.email }, { $set: { profile: { defaultName: req.file.originalname, url: result.secure_url, imageId: result.public_id } } }, (err, data) => {

        res.send(result.secure_url)
    })

}

const deleteImage =async(req, res) => {

    const tab = req.body.currentTab
    console.log(req.body.file)
    Model.findOneAndUpdate(
        { email: req.body.email, [`${tab}.main.value`]: { defaultName: req.body.currentFolder, editedName: req.body.currentFolder } },
        { $pull: { [`${tab}.main.$.value`]: { publicId: req.body.file } } },
        { new: true },
        (err, data) => { res.send("Deleted") })

    try {
        await cloudinary.uploader.destroy(req.body.file)

    } catch (error) {
        console.log(error)
    }

}

module.exports={ImageData , ProfilePicture, uploadValue, uploads, editedImageName, uploadProfile, deleteImage }
