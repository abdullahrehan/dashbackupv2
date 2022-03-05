const { OAuth2Client } = require('google-auth-library'); const client = new OAuth2Client('419594361812-33f51cf3fkmlg1ca69h0r8g4v2sk5lkf.apps.googleusercontent.com');
const Model = require("../Model/Mongo.js")
const validator = require('email-validator')
var passport = require('passport');
const express = require("express")
const Multer = require('../utils/multer')
const route = express.Router()


const LoginController=require("../Controllers/Authentication/LoginController")
const {login,logouts,jwtFunc,resetpassword}=LoginController

const GoogleAuthController=require("../Controllers/SignUpWithGoogle/GoogleAuthController")
const {googleLogin}=GoogleAuthController

const SigninController=require("../Controllers/Authentication/SigninController")
const {SignIn,sendConfirmation,userSignupAccess,nameverify,emailverify,deleteUserAccount}=SigninController

const NotesController=require("../Controllers/Notes/NotesController")
const {notes,uploadNotes,deleteNotes,notesImages,notesUpdate,sendtoFoldersNotes}=NotesController

const RecentFoldController=require("../Controllers/RecentFolders/RecentFoldController")
const {recentFoldersData,recentFolders,setrecentFolders,deletRecentFolders}=RecentFoldController

const FoldersController=require("../Controllers/Folders/FoldersController")
const {folders,folderStatus,createfolder,deleteFolder,folderPassword,setFoldertoSecure}=FoldersController

const MessageController=require("../Controllers/TextMessage/MessageController")
const {txtMessages,uploadMessage,UpdateMessage ,deleteMessage}=MessageController

const ImagesController=require("../Controllers/Images/ImagesController")
const {ImageData,ProfilePicture,uploadValue,uploads,editedImageName,uploadProfile,deleteImage}=ImagesController

const SendFilesController=require("../Controllers/SendFiles/SendFilesController")
const {sendMultipleFiles,sendMultipleFilesNotes,deleteMultipleFiles,sendtofolders}=SendFilesController

const ViewAllController=require("../Controllers/ViewAll/ViewAllController")
const {ViewAllMode,setViewAllMode}=ViewAllController

var user = null;
var uploadFolderTab = null;
var uploadFolder = null;
var htmlDocx = require('html-docx-js');


// ----------------------------SignIn Apis------------------------------- //

route.post("/user/sendConfirmation",sendConfirmation )
route.post("/user/signupaccess",userSignupAccess )
route.post("/user/SignIn",SignIn)
route.post("/nameverify",nameverify)
route.post("/emailverify",emailverify)
route.post("/user/deleteAccount",deleteUserAccount)


// ----------------------------Google LogIn Apis------------------------- //

route.post("/google",googleLogin)

// ----------------------------LogIn Apis------------------------------- //

route.post("/user/login",login) 
route.get("/logouts", logouts)
route.get("/jwt",jwtFunc)
route.post("/user/resetpassword",resetpassword)
// ----------------------------Notes Apis------------------------------- //

route.post("/notes",notes)
route.post("/upload/notes",uploadNotes)
route.post("/delete/notes",deleteNotes)
route.post("/notesImages",notesImages)
route.post("/notes/update",notesUpdate)
route.post("/notes/update",sendtoFoldersNotes)

// ----------------------RecentFolders Apis---------------------------- //

route.post("/recentFoldersData",recentFoldersData)
route.post("/recentFolders",recentFolders)
route.post("/setrecentFolders",setrecentFolders)
route.post("/deletRecentFolders",deletRecentFolders)

// ----------------------- Folders Apis -------------------------------- //


route.post("/folders",folders)
route.post("/folderStatus",folderStatus)
route.post("/createfolder",createfolder)
route.post("/deleteFolder",deleteFolder)
route.post("/folderPassword",folderPassword)
route.post("/setFoldertoSecure",setFoldertoSecure)

// ----------------------- Messages Apis -------------------------------- //

route.post("/txt",txtMessages)
route.post("/uploadTxt",uploadMessage)
route.post("/txt/update",UpdateMessage)
route.post("/delete/txt",deleteMessage)


// ----------------------- Images Apis -------------------------------- //


route.post("/ImageData",ImageData)
route.post("/ProfilePicture",ProfilePicture)
route.post("/uploadValue",uploadValue)
route.post("/uploads",Multer.array("uploadedFile", 10),uploads)
route.post("/editedImageName",editedImageName)
route.post("/uploadProfile", Multer.single("uploadedFile"),uploadProfile)
route.post("/delete", deleteImage)


// ----------------------- Sending Files Apis -------------------------------- //

route.post("/sendMultipleFiles",sendMultipleFiles)
route.post("/sendMultipleFiles/notes",sendMultipleFilesNotes)
route.post("/deleteMultipleFiles",deleteMultipleFiles)
route.post("/sendtofolders",sendtofolders)


// ----------------------- View All Apis -------------------------------- //

route.post("/ViewAllMode",ViewAllMode)
route.post("/setViewAllMode",setViewAllMode) 


// ----------------------- Main Api -------------------------------- //

route.get("/", async(req, res) => {
    
    Model.find((err, data) => { 
        res.send(data);
    })

})
 
// ----------------------- Set Folders Api -------------------------------- //


route.post("/setMainfolder", (req, res) => {

    // const main_Folder = { name: 'MainFolder', value: [], secure: false }
    // console.log(req.body.email, 'req.body.email');
    // Model.findOneAndUpdate({ email: req.body.email }, { $set: { textDoc: { main: { name: 'MainFolder', value: [{ heading: "MainFolder", body: "MainFolder" }], secure: false } } } }, { upsert: true }, (err, data) => { console.log(data) })
    // Model.findOneAndUpdate({ email: req.body.email }, { $set: { messages: { main: { name: 'MainFolder', value: [{ heading: "MainFolder", body: "MainFolder" }], secure: false } } } }, { upsert: true }, (err, data) => { })
    // Model.findOneAndUpdate({ email: req.body.email }, { $set: { imagefolder: { main: { name: 'MainFolder', value: [{ defaultName: "MainFolder", editedName: "MainFolder" }], secure: false } } } }, { upsert: true }, (err, data) => { })
    // Model.findOneAndUpdate({ email: req.body.email }, { $set: { wordfolder: { main: { name: 'MainFolder', value: [{ defaultName: "MainFolder", editedName: "MainFolder" }], secure: false } } } }, { upsert: true }, (err, data) => { })
    // Model.findOneAndUpdate({ email: req.body.email }, { $set: { pdffolder: { main: { name: 'MainFolder', value: [{ defaultName: "MainFolder", editedName: "MainFolder" }], secure: false } } } }, { upsert: true }, (err, data) => { console.log(data) })

    // Model.findOneAndUpdate(
    //     { email: req.body.email },

    //     {
    //         $push: {
    //             recentFolders:
    //             {
    //                 $each: [
    //                     { name: 'imagefolder', value: [] },
    //                     { name: 'wordfolder', value: [] },
    //                     { name: 'pdffolder', value: [] },
    //                     { name: 'messages', value: [] },
    //                     { name: 'textDoc', value: [] }]
    //             }
    //         }
    //     },

    //     { upsert: true }, (err, data) => { console.log(data) })
})



module.exports = route 