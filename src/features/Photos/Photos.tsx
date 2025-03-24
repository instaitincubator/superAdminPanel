import React, {useEffect, useRef, useState} from 'react';
import {
    GetUserPhotosQuery,
    useGetUserPhotosLazyQuery,
    useGetUserPhotosQuery
} from "@/queries/userPhotos/userPhotosgenerated";
import {useRouter} from "next/router";
import Image from "next/image";

export const Photos = () => {

    const router = useRouter()
    const [photosPaginationParams, setPhotosPaginationParams] = useState({
        userId: Number(router.query?.id) as number,
    })
    const {data, fetchMore} = useGetUserPhotosQuery({
        variables:  photosPaginationParams
    })

    const posts = data?.getPostsByUser.items || []
    const lastId = posts.length > 0 ? posts[posts.length - 1].id : null
    const observerRef = useRef<HTMLDivElement | null>(null)
    console.log(lastId)
    useEffect(() => {
        if (!observerRef.current || !lastId) {
            return
        }

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {

                    void fetchMore({
                        variables: {
                            userId: Number(router.query.id),
                            endCursorId: lastId,
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) {
                                return prev
                            }

                            return {
                                getPostsByUser: {
                                    ...fetchMoreResult.getPostsByUser,
                                    items: [
                                        ...prev.getPostsByUser.items,
                                        ...fetchMoreResult.getPostsByUser.items,
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
    }, [lastId])

    return (
        <div className="flex gap-4 p-8 flex-wrap mt-4">
            {!!posts.length && posts.map((post, index) => {
                const isLastPost = index === posts.length - 1

                return (
                    <div
                        ref={isLastPost ? observerRef : null}
                        className="h-[362px] w-[290px] relative overflow-hidden"
                        key={post.id}
                    >
                        <Image alt='image' src={post.url as string} width={post.width as number} height={post.height as number}  />
                    </div>
                )
            })}
        </div>
    )
};
