import dbConnect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server"

dbConnect()
.then(()=>{
    console.log(`Database connected for email verification`)
})

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json() 
        const {token} = reqBody;
        console.log("TOKEN::",token)

       const user = await User.findOne({
        verifyToken:token,
        verifyTokenExpiry: {$gt: Date.now()}
        })
        if(!user){
            return NextResponse.json({error:"Invalid token"}, {status:400})
        }

       console.log("user in verification", user)
       user.isVerified = true;
       user.verifyToken = undefined;
       user.verifyTokenExpiry = undefined;

       await user.save()
       
       return NextResponse.json({
        message: "Email verified successfully",
        success: true
       }, {status: 200})

    } catch (error:unknown) {
        if(error instanceof Error)
        console.log(`error in verifying the user ${error.message}`)
    else console.log("Error in verifying")
    }
}