import React, { useEffect, useState } from "react"

import CustomLink from "@/features/SideBar/Custom-link/CustomLink"
import { AnimateUser } from "@/shared/animate-svg/AnimateUser"
import { Instagram } from "@/shared/animate-svg/Instagram"
import { Money } from "@/shared/animate-svg/Money"
import { Trending } from "@/shared/animate-svg/Trending"
import { useTranslation } from "@/shared/hooks/useTranslation"
import { useRouter } from "next/router"

export const SideBar = () => {
  const router = useRouter()
  const [activeLink, setActiveLink] = useState("/")
  const { t } = useTranslation()

  useEffect(() => {
    setActiveLink(router.pathname)
  }, [])

  return (
    <nav className="min-w-[230px] py-[73px] pl-[10px] bg-dark-700 flex flex-col h-full gap-6 my-auto items-center">
      <CustomLink
        activeLink={activeLink}
        alt={t.sidebar.myProfile}
        child1={<AnimateUser />}
        href="/users"
        setActiveLink={setActiveLink}
        title={t.sidebar.myProfile}
      />
      <CustomLink
        activeLink={activeLink}
        alt={t.sidebar.statistics}
        child1={<Trending />}
        href="/statistics"
        setActiveLink={setActiveLink}
        title={t.sidebar.statistics}
      />
      <CustomLink
        activeLink={activeLink}
        alt={t.sidebar.paymentsList}
        child1={<Money />}
        href="/payments"
        setActiveLink={setActiveLink}
        title={t.sidebar.paymentsList}
      />
      <CustomLink
        activeLink={activeLink}
        alt={t.sidebar.PostsList}
        child1={<Instagram />}
        href="/posts"
        setActiveLink={setActiveLink}
        title={t.sidebar.PostsList}
      />
    </nav>
  )
}
