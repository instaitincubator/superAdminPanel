import React, {ChangeEvent, useEffect, useRef, useState} from "react";

import {transition} from "@/features/posts-list/CONSTs";
import PostSlider from "@/features/PostSlider/PostSlider";
import {useGetPostsQuery} from "@/queries/allPosts/getPostsgenerated"
import {useTranslation} from "@/shared/hooks/useTranslation";
import {Disclosure, DisclosureContent, DisclosureTrigger,} from "@/shared/motion-primitives/disclosure"
import {Input} from "@/shared/ui/Input/Input";
import {formatDate} from "@/shared/utils/formatDate";
import {SortDirection} from "@/types"
import Image from "next/image"

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import {noImage} from '../../../public'


export const PostsList = () => {
    const [searchInput, setSearchInput] = useState("")
    const {t} = useTranslation()

    const [postsPaginationParams, setPostsPaginationParams] = useState({
            pageSize: 10,
            sortBy: "createdAt",
            sortDirection: SortDirection.Asc,
            searchTerm: "",
            endCursorPostId: 1,
        }
    )
    const {data, fetchMore} = useGetPostsQuery({
        variables: postsPaginationParams,
    })
    const posts = data?.getPosts?.items || [];
    const lastPostId = posts.length > 0 ? posts[posts.length - 1]?.id : null;
    const observerRef = useRef<HTMLDivElement | null>(null);


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
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    void fetchMore({
                        variables: {
                            endCursorPostId: lastPostId, // Загружаем следующую порцию данных
                        },
                        updateQuery: (prev, {fetchMoreResult}) => {
                            if (!fetchMoreResult) {
                                return prev;
                            }

                            return {
                                getPosts: {
                                    ...fetchMoreResult.getPosts,
                                    items: [...prev.getPosts.items, ...fetchMoreResult.getPosts.items],
                                },
                            };
                        },
                    });
                }
            },
            {threshold: 1.0}
        );

        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [lastPostId]);

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
                const isLastPost = index === posts.length - 1; // Проверяем, последний ли это элемент

                return (
                    <div
                        ref={isLastPost ? observerRef : null}
                        className='h-[362px] w-[290px] relative overflow-hidden'
                        key={post.id}
                    >
                        {post?.images?.length! > 1 ? (
                            <PostSlider key={post.id} images={post.images} />
                        ) : (<Image
                            alt={'SlideImage'}
                            className="w-full"
                            height={290}
                            width={290}
                            src={post?.images?.length && post.images[0].url ? post.images[0].url : noImage}
                        />)}
                        <Disclosure
                            className='absolute bottom-0 left-0 right-0 z-10'

                            transition={transition}
                        >
                            <DisclosureTrigger>
                                <div className='flex flex-col px-4 py-2 justify-center gap-2 bg-dark-700'>
                                    <div className='text-regular-14'>фотка + {post.postOwner.userName}</div>
                                    <div
                                        className='text-medium-14 text-light-900 flex justify-between'>
                                        <div>{formatDate(post.updatedAt)}</div>
                                        {post.description.length > 0 && (<div
                                            className='opacity-50'>{t.admin.userList.postsList.openDescription}</div>)}
                                    </div>
                                </div>
                            </DisclosureTrigger>
                            <DisclosureContent>
                                {post.description.length > 0 && (
                                    <div className='flex flex-col pb-4 text-[13px] bg-dark-700 '>
                                        {post.description}
                                    </div>)}
                            </DisclosureContent>
                        </Disclosure>
                    </div>
                )
            })}
        </div>
    )
}
