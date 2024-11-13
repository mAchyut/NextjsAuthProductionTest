import { NextResponse } from "next/server";
import dbConnect from "@/dbConfig/dbConfig";


dbConnect()
.then(()=>{
    console.log(`DB connected for logout call`)
})


export async function GET(){
    try {
        const response = NextResponse.json({
            message: "User logged out successfully",
            success: true
        })

        // Clear the cookie by setting maxAge to 0
  response.cookies.set({
    name: "authToken",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0, // This immediately expires the cookie
  });

  return response;
    } catch (error:unknown) {
        if(error instanceof Error)
        console.log(`error in logging out the user ${error.message}`)
    else console.log("Error in logout")
    }
}