'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'


type UserData = {
  username: string
  email: string
  isVerified: boolean
  isAdmin: boolean
  _id: string
}

function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const navigate = useRouter()


  useEffect(() => {
    (async () => {
      try {
        const method = axios.create({
          baseURL: process.env.DOMAIN,
          withCredentials: true
        })
        const res = (await method.post("/api/users/me")).data
        setUserData(res.data)
        console.log(res.data)
      } catch (error: any) {
        toast.error("Failed to fetch user data")
        console.error(error.message)
      }
    })()
  }, [])

  const handleLogout = async ()=>{
    const response = await axios.get("/api/users/logout")
    if(response){
      navigate.push("/login")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-indigo-400 mb-6">User Profile</h1>
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="font-semibold text-indigo-300">Username:</span> {userData?.username ?? "N/A"}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-indigo-300">Email:</span> {userData?.email ?? "N/A"} 
            <span className={`ml-2 px-2 py-1 rounded ${userData?.isVerified ? "bg-green-600" : "bg-red-600"} text-xs font-medium`}>
              {userData?.isVerified ? "Verified" : "Unverified"}
            </span>
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-indigo-300">User ID:</span> {userData?._id ?? "N/A"}
          </p>
        </div>
      </div>
      <Link href={`/profile/${userData?._id}`}>{userData? "Visit profile 2": "Nothing to show"}</Link>
      <button onClick={handleLogout} className='border border-gray-600 p-2 rounded-md absolute top-4 right-4'>Logout</button>
    </div>
  )
}

export default Profile
