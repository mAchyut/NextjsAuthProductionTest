"use client";
import axios from "axios";
import {  useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import toast from "react-hot-toast";

  function VerifyComponent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Extracts 'token' from query params
  console.log("verify route")
  const verifyUserEmail = async (token: string) => {
    try {
      const method = axios.create({
        baseURL: process.env.NEXT_PUBLIC_DOMAIN, // Adjusted environment variable name for client side
        withCredentials: true,
      });
      const res = await method.post("/api/users/verifyemail", { token });
      toast.success("Email verified successfully!");
      console.log("Verification response", res);
    }catch (error:unknown) {
      if(error instanceof Error)
      console.log(`error in verifying in the user ${error.message}`)
  else console.log("Error in verifying")
  }
  };

  useEffect(() => {
    if (token) {
      verifyUserEmail(token);
    }
  }, [token]);

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Verify Your Email
        </h1>
        <h2 className="text-center text-gray-600 mb-8">
          {token ? `Token: ${token}` : "No token found"}
        </h2>
        <p className="text-sm text-gray-500 text-center">
          We are processing your verification. Please wait...
        </p>
      </div>
    </div>
    
  );
}

export default function Verify(){
  return <Suspense fallback={<div>Loading...</div>}>
  <VerifyComponent />
</Suspense>
}