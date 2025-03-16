import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import { useGetPostsQuery } from "@/queries/allPosts/getPostsgenerated"
import { useTranslation } from "@/shared/hooks/useTranslation"
import { Input } from "@/shared/ui/Input/Input"
import { SortDirection } from "@/types"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { PostImageWithSwiper } from "@/features/posts-list/ui/PostImageWithSwiper"
import { PostDescription } from "@/features/posts-list/ui/PostDescription"

export const PostsList = () => {
  const [searchInput, setSearchInput] = useState("")
  const { t } = useTranslation()

  const savedCursorId =
    typeof window !== "undefined"
      ? localStorage.getItem("endCursorPostId")
      : null

  const [postsPaginationParams, setPostsPaginationParams] = useState({
    pageSize: 16,
    sortBy: "createdAt",
    sortDirection: SortDirection.Asc,
    searchTerm: "",
    endCursorPostId: savedCursorId ? Number(savedCursorId) : 1,
  })
  const { data, fetchMore } = useGetPostsQuery({
    variables: postsPaginationParams,
  })
  const posts = data?.getPosts?.items || []
  const lastPostId = posts.length > 0 ? posts[posts.length - 1]?.id : null
  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = setTimeout(() => {
      setPostsPaginationParams(prevState => ({
        ...prevState,
        searchTerm: searchInput,
      }))
    }, 500)

    return () => clearTimeout(handler)
  }, [searchInput])

  const onSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    if (!observerRef.current || !lastPostId) {
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          localStorage.setItem("endCursorPostId", String(lastPostId))

          void fetchMore({
            variables: {
              endCursorPostId: lastPostId,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return prev
              }

              return {
                getPosts: {
                  ...fetchMoreResult.getPosts,
                  items: [
                    ...prev.getPosts.items,
                    ...fetchMoreResult.getPosts.items,
                  ],
                },
              }
            },
          })
        }
      },
      { threshold: 1.0 }
    )

    observer.observe(observerRef.current)

    return () => observer.disconnect()
  }, [lastPostId])

  return (
    <div className="flex gap-4 p-8 flex-wrap">
      <Input
        type="search"
        placeholder={t.sidebar.search}
        fullWidth
        value={searchInput}
        onChange={e => onSearchTermChange(e)}
      />
      {data?.getPosts.items.map((post, index) => {
        const isLastPost = index === posts.length - 1

        return (
          <div
            ref={isLastPost ? observerRef : null}
            className="h-[362px] w-[290px] relative overflow-hidden"
            key={post.id}
          >
            <PostImageWithSwiper images={post.images!} key={post.id} />
            <PostDescription
              key={post.id}
              postOwnerId={post.ownerId}
              description={post.description}
              postOwnerUsername={post.postOwner.userName}
              updatedAt={post.updatedAt}
              postOwnerAvatars={post.postOwner.avatars!}
            />
          </div>
        )
      })}
    </div>
  )
}
