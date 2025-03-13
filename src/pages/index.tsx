import React from "react"

import { getLayout } from "@/app/layouts/mainLayout/Layout"
import { SignInForm } from "@/features/sign-in/SignInForm";

export default function Home() {
  return <div className={"border-10"}> <SignInForm/></div>
}

Home.getLayout = getLayout
