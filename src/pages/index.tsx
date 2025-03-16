import React, { useEffect, useState } from "react"
import { getLayout } from "@/app/layouts/mainLayout/Layout"
import { SignInForm } from "@/features/sign-in/SignInForm"
import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLogin = localStorage.getItem("isLoggedIn")
      if (storedLogin) {
        setIsLoggedIn(true)
        void router.replace("/posts")
      }
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return null
  }
  if (isLoggedIn) {
    return null
  }

  return (
    <div className={"border-10"}>
      <SignInForm />
    </div>
  )
}

Home.getLayout = getLayout
