import { NextRequest } from "next/server";
import jwt, { JwtPayload } from  "jsonwebtoken"

export const getDataFromToken = (request: NextRequest)=>{
 try {
   const token = request.cookies.get("authToken")?.value || ""
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload
  return decodedToken.id
 } catch (error:unknown) {
   if(error instanceof Error)
   console.log(`error in getting token from cookies ${error.message}`)
else console.log("Error in getting token from cookies")
}
}