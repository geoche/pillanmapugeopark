"use client";
import Image from "next/image";
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '@/styles/carousel.css';

// import required modules
import {Autoplay, Pagination, Navigation} from 'swiper/modules';
import ReusableButton from "@components/ReusableButton";

const Carousel = () => {
    const images = [
        "/assets/images/stakeholders/centro-us.png",
        "/assets/images/stakeholders/crdp-maule.jpg",
        "/assets/images/stakeholders/descurbe-el-maule.png",
        "/assets/images/stakeholders/fcb.png",
        "/assets/images/stakeholders/geoparques.png",
        "/assets/images/stakeholders/umayor-geologia.jpg",
    ];

    return (
        <div className="relative flex items-center h-1/3 max-w-screen-xl mx-auto sm:py-4 sm:px-12 px-5">
            <Swiper
                slidesPerView={3}
                width={1280}
                centeredSlidesBounds={true}
                spaceBetween={30}
                centeredSlides={false}
                autoplay={{
                    delay: 2500,
                    pauseOnMouseEnter: true
                }}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
                breakpoints={{
                    // when window width is >= 640px
                    344: {
                        width: 304,
                        slidesPerView: 1,
                        autoplay: false
                    },
                    360: {
                        width: 320,
                        slidesPerView: 1,
                        autoplay: false
                    },
                    375: {
                        width: 330,
                        slidesPerView: 1,
                        autoplay: false
                    },
                    390: {
                        width: 350,
                        slidesPerView: 1,
                        autoplay: false
                    },
                    412: {
                        width: 372,
                        slidesPerView: 1,
                        autoplay: false
                    },
                    430: {
                        width: 390,
                        slidesPerView: 1,
                        autoplay: false
                    },
                    540: {
                        width: 500,
                        slidesPerView: 1,
                        autoplay: false
                    },
                    768: {
                        width: 672,
                        slidesPerView: 1,
                        autoplay: false
                    },
                    820: {
                        width: 707,
                        slidesPerView: 1,
                        autoplay: false
                    },
                    853: {
                        width: 740,
                        slidesPerView: 1,
                        autoplay: false
                    },
                    // when window width is >= 768px
                    900: {
                        width: 800,
                        slidesPerView: 2
                    },
                    912: {
                        width: 816,
                        slidesPerView: 2
                    },
                    1024: {
                        width: 911,
                        slidesPerView: 2
                    },
                    1280: {
                        width: 1184,
                        slidesPerView: 3
                    }
                }
                }
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Image src={image} alt={"logo"} fill
                               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                               className="sm:p-4 p-2 object-contain"/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Carousel;
