'use client'

import { useEffect, useState } from "react"
import axios from "axios"
// import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

function Signup() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })
  const [loading, setLoading] = useState(false)
  const [buttonDisable, setButtonDisable] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const route = axios.create({
        baseURL: process.env.DOMAIN,
        withCredentials: true,
      })
      const res = await route.post("/api/users/signup", user)
      console.log(res.data)
      router.push("/login")
    } catch (error:unknown) {
      if(error instanceof Error)
      console.log(`error in signup user ${error.message}`)
  else console.log("Error in signup")
  } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setButtonDisable(!user.email || !user.password || !user.username)
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4 max-w-6xl">
      <h1 className="text-3xl font-semibold mb-6">{loading ? "Processing..." : "Sign Up"}</h1>
      <hr className="border-gray-700 w-full mb-8" />

      <label htmlFor="username" className="text-gray-400 mb-2 w-full text-left">Username</label>
      <input
        className="bg-gray-800 border border-gray-700 text-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Enter your username"
      />

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
        className="bg-gray-800 border border-gray-700 text-gray-300 rounded-lg p-2 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter your password"
      />

      <button
        onClick={onSignup}
        disabled={buttonDisable}
        className={`w-full p-3 rounded-lg font-semibold text-white transition-all duration-300 ${buttonDisable ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
      >
        {buttonDisable ? "Fill all fields" : "Sign Up"}
      </button>
      Already have an account?<Link href={"/login"} className="text-blue-600 hover:underline">Login</Link>
    </div>
  )
}

export default Signup
