import mongoose from "mongoose";

const dbConnect = async ()=>{
    try {
        const connectionResponse = await mongoose.connect(process.env.MONGODB_URI! + "/nextjsbackend" )
        console.log(`Database connection successfull at port ${connectionResponse.connection.port}`)
        
        // mongoose.connection.on("connected", ()=>{
            
        // })
    } catch (error:unknown) {
        if(error instanceof Error)
        console.log(`error in connecting the Database ${error.message}`)
    else console.log("Error in db connection")
    process.exit(1)
    }
}

export default dbConnect;