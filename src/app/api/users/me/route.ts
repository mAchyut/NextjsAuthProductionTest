import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/dataFromToken";
import User from "@/models/userModel";

dbConnect()
.then(()=>{
    console.log("me route hit, db connected")
})

export async function POST(request: NextRequest){
    const userId = await getDataFromToken(request)
    const userData = await User.findById(userId).select("-password -verifytoken")
    if(!userData){
        return NextResponse.json({error: "User with the given id does not exist"}, {status: 400})
    }
    return NextResponse.json({
        message: "user details fetched successfully",
        success: true,
        data: userData
    },
{status:200})
}