
const googleLogin=(req,Res)=>{

    const {tokenId}=req.body
    client.verifyIdToken({idToken:tokenId,audience:'419594361812-33f51cf3fkmlg1ca69h0r8g4v2sk5lkf.apps.googleusercontent.com'})
    .then((res)=>{

    Model.find({email:`${email}`},(err,data)=>{
    if(data[0]==undefined){

        const inserting=Model({
        username:name,
        email:email,
        filename:[""],
        messages:[""],
        token:tokenId,
        })
        inserting.save() 
    }

    else{console.log("User Already existed");res.send("User Already existed")}})
    Res.json(res.payload)})
}


module.exports={googleLogin}