import dbConnect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";

dbConnect().then(()=>{
    console.log(`Database connected for signup call`)
})

export async function POST(request: NextRequest) {
    console.log(request)
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "User already exists"}, {status:400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt)

        const newUser = await User.create({
            username,
            email,
            password: hashPassword
        })
        if(!newUser){
            return NextResponse.json({error: "failed to create the user"}, {status: 500})
        }
        const createdUser = await User.findById(newUser._id).select("-password")
         
        console.log(newUser);
        //send verification email
        await sendEmail({email,emailType:"VERIFY", userId:newUser._id })
        
        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            createdUser
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500})
        
    }
}