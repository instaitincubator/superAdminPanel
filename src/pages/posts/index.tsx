import React from "react"

import { getSidebarLayout } from "@/app/layouts/sidebarLayout/sidebarLayout"
import { PostsList } from "@/features/posts-list/PostsList"

export default function Posts() {
  return <PostsList />
}

Posts.getLayout = getSidebarLayout
