'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import '@/styles/image-swiper.css';

const ImageSwiperWithThumbnails = ({images = {}}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)

    return (
        <section className='max-w-4xl h-full '>
            <div className='container'>
                <Swiper
                    loop={true}
                    spaceBetween={8}
                    navigation={true}
                    thumbs={{
                        swiper:
                            thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                    }}
                    modules={[FreeMode, Navigation, Thumbs]}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className='flex h-full w-full items-center justify-center'>
                                <Image
                                    src={image}
                                    width={800}
                                    height={600}
                                    alt={`imageswp-${index}`}
                                    className='h-full w-full'
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Thumbnail */}
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={8}
                    slidesPerView={images.length > 2 ? 3 : images.length}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className={`thumbs`}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <button className='flex h-full w-full items-center justify-center pt-4'>
                                <Image
                                    src={image}
                                    width={800}
                                    height={600}
                                    alt={`imageswp-${index}`}
                                    className={`aspect-video `}
                                />
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default ImageSwiperWithThumbnails;
