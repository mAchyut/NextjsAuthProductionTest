import mongoose from "mongoose";

const dbConnect = async ()=>{
    try {
        const connectionResponse = await mongoose.connect(process.env.MONGODB_URI! + "/nextjsbackend" )
        console.log(`Database connection successfull at port ${connectionResponse.connection.port}`)
        
        // mongoose.connection.on("connected", ()=>{
            
        // })
    } catch (error:any) {
        console.log(`Failed to connect with the Database ${error?.message}`);
        process.exit(1);
    }
}

export default dbConnect;