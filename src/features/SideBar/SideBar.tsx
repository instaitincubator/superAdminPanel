import React, { useEffect, useState } from "react"

import CustomLink from "@/features/SideBar/Custom-link/CustomLink"
import { useTranslation } from "@/shared/hooks/useTranslation"
import { useRouter } from "next/router"

import {
  Trending,
  Profile,
  ProfileFill,
  Card,
  CardFill,
  Picture,
  PictureFill,
} from "./../../../public"

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
        child1={<Profile />}
        child2={<ProfileFill />}
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
        child1={<Card />}
        child2={<CardFill />}
        href="/payments"
        setActiveLink={setActiveLink}
        title={t.sidebar.paymentsList}
      />
      <CustomLink
        activeLink={activeLink}
        alt={t.sidebar.PostsList}
        child1={<Picture />}
        child2={<PictureFill />}
        href="/posts"
        setActiveLink={setActiveLink}
        title={t.sidebar.PostsList}
      />
    </nav>
  )
}
