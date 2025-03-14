import React, {useRef} from 'react';
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";

import Image from "next/image";
import {Navigation, Pagination} from "swiper/modules";

type Props = {
    images?: Array<{ __typename?: 'ImagePost', url?: string | null, width?: number | null, height?: number | null, fileSize?: number | null, id?: number | null, createdAt?: any | null }> | null
}

const PostSlider = (props:Props) => {

    const swiperRef = useRef<SwiperRef>(null)

    const rightHandleClick = () => {
        swiperRef?.current?.swiper.slideNext()
    }
    const leftHandleClick = () => {
        swiperRef?.current?.swiper.slidePrev()
    }

    return (
        <>
            <Swiper
                modules={[Pagination, Navigation]}
                pagination
                ref={swiperRef}
            >
                {props.images?.map((img) => {
                    return (
                        <SwiperSlide key={img.id}>
                            <Image
                                alt={`image-${img.id}`}
                                src={img.url!}
                                className='w-full'
                                height={img.height!}
                                width={img.width!}
                            />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <div className="flex justify-between px-6">
                <Image
                    alt="ArrowLeft"
                    className="absolute top-1/2 transform -translate-y-1/2 left-2 cursor-pointer z-10 "
                    height={24}
                    onClick={leftHandleClick}
                    src="/arrowLeftSlider.svg"
                    width={24}
                />
                <Image
                    alt="ArrowRight"
                    className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer z-10"
                    height={24}
                    onClick={rightHandleClick}
                    src="/arrowRightSlider.svg"
                    width={24}
                />
            </div>
        </>
    );
};

export default PostSlider;