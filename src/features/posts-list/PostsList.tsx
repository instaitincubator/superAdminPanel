import { Swiper, SwiperSlide } from "swiper/react"

import { useGetPostsQuery } from "@/queries/allPosts/getPostsgenerated"
import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from "@/shared/motion-primitives/disclosure"
import { SortDirection } from "@/types"
import Image from "next/image"

export const PostsList = () => {
  const defaultPostPaginationParams = {
    pageSize: 10,
    sortBy: "createdAt",
    sortDirection: SortDirection.Asc,
    endCursorPostId: 1,
  }
  const { data, error, loading } = useGetPostsQuery({
    variables: defaultPostPaginationParams,
  })

  return (
    <div className="">
      {data?.getPosts.items.map(post => (
        <Disclosure key={post.id}>
          <DisclosureTrigger>
            <Swiper className="flex items-center custom-wrapper">
              {post.images?.map((img, index) => {
                return (
                  <SwiperSlide key={img.id} virtualIndex={index}>
                    <Image
                      alt={`image-${img.id}`}
                      src={img.url!}
                      height={img.height!}
                      width={img.width!}
                    />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </DisclosureTrigger>
          {/*<DisclosureContent></DisclosureContent>*/}
        </Disclosure>
      ))}
    </div>
  )
}
