'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"

function Login() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [buttonDisable, setButtonDisable] = useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
      const route = axios.create({
        baseURL: process.env.DOMAIN,
        withCredentials: true,
      })
      const res = await route.post("/api/users/login", user)
      console.log(res.data)
      router.push("/profile")
    } catch (error:unknown) {
      if(error instanceof Error)
      console.log(`error in loggin in the user ${error.message}`)
  else console.log("Error in login")
  // toast.error(error.message)
  } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setButtonDisable(!user.email || !user.password)
  }, [user])

  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-900">
     <div className="flex flex-col items-center justify-center text-white px-4 w-full max-w-2xl p-4 border rounded-2xl border-gray-700">
      <h1 className="text-3xl font-semibold mb-6">{loading ? "Processing..." : "Login"}</h1>
      <hr className="border-gray-700 w-full mb-8" />


      <label htmlFor="email" className="text-gray-400 mb-2 w-full text-left">Email</label>
      <input
        className="bg-gray-800 border border-gray-700 text-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter your email"
      />

      <label htmlFor="password" className="text-gray-400 mb-2 w-full text-left">Password</label>
      <input
        className="bg-gray-800 border border-gray-700 text-gray-300 rounded-lg p-2 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 "
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter your password"
      />

      <button
        onClick={onLogin}
        disabled={buttonDisable}
        className={` w-full p-3 rounded-lg font-semibold text-white transition-all duration-300 ${buttonDisable ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
      >
        {buttonDisable ? "Fill all fields" : "Login"}
      </button>
    </div>
    Don&apos;t have an account?<Link href={"/signup"} className="text-blue-600 hover:underline">Create Account</Link>
   </div>
  )
}

export default Login
