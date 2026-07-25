"use client"

import { useState } from "react"
import { subscribeEmail } from "@/actions/newsletter"


export default function TestPage() {

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)


  async function sendEmail() {

    // Check empty email
    if (!email.trim()) {
      setMessage("Please enter your email")
      return
    }


    // Check valid email format
    if (!email.includes("@") || !email.includes(".")) {
      setMessage("Please enter a valid email")
      return
    }


    setLoading(true)
    setMessage("Sending...")


    const result = await subscribeEmail(email)


    if (result.success) {

      setMessage("Email saved ✅")
      setEmail("")

    } else {

      setMessage(result.message || "Something went wrong")

    }


    setLoading(false)

  }



  return (

    <div className="min-h-screen bg-black flex items-center justify-center">


      <div className="flex flex-col gap-5">


       <input
  className="
  w-80
  rounded-xl
  border
  border-gray-700
  bg-white
  p-4
  text-black
  placeholder:text-gray-500
  "
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
/>


        <button

          onClick={sendEmail}

          disabled={loading}

          className="
          rounded
          bg-orange-500
          px-8
          py-4
          text-black
          font-bold
          disabled:opacity-50
          "

        >

          {loading ? "Sending..." : "Subscribe"}

        </button>



        <p className="text-white">

          {message}

        </p>


      </div>


    </div>

  )

}