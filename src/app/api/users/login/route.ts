import User from "@/models/userModel";
import { NextResponse,NextRequest } from "next/server";
import dbConnect from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";

dbConnect()
.then(()=>{
    console.log(`DB connected for login call`)
})

// function generateToken(userId:string){
//   if(!userId) return;
  
// }

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;

        const user = await User.findOne({
            email
        })
        if(!user){
            return NextResponse.json({error: "User with provided email or username does not exist", success: false}, {status: 400})
        }
        
        const passwordVerification = await bcryptjs.compare(password, user.password)
        if(!passwordVerification){
            return NextResponse.json({error: "Incorrect password", success: false}, {status: 400})
        }

        const tokenData = {
            id: user._id,
            username: user.username
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "User logged in successfully",
            success: true,
            user
        },
        {
            status: 200
        }
    )
    response.cookies.set({
        name: "authToken",
        value: token,
        httpOnly: true, // Only accessible by the server
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        path: "/", // Accessible on the whole site
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return response;
    } catch (error:unknown) {
        if(error instanceof Error)
        console.log(`error in loggin in the user ${error.message}`)
    else console.log("Error in login")
    }
}