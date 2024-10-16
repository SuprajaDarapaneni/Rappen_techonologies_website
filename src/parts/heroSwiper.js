/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-boolean-value */
// eslint-disable-next-line react/no-array-index-key
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */

import React from 'react';

import { Fade } from 'react-awesome-reveal';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Navigation, Pagination, Scrollbar, A11y, Autoplay,
} from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HeroSwiper({ data }) {
    return (
        <section className="container mx-auto">
            <Fade direction="up">
                <h1 className="text-5xl text-theme-blue text-center font-bold">Testimonials</h1>
            </Fade>
            <Fade direction="up" delay={500}>
                <p className="font-light text-lg text-gray-400 text-center mb-3 sm:mb-3 xl:mb-4">
                    What they said about us.
                </p>
            </Fade>
            {/* eslint-disable-next-line react/jsx-max-props-per-line */}
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                className="mySwiper"
                loop={true}
                navigation={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
            >
                {data.map((item) => (
                    <SwiperSlide key={item.id}>
                        <section
                            className="relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat"
                        >
                            <div
                                className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
                            />

                            <div
                                className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
                            >
                                <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                                    <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
                                        Let us find your

                                        <strong className="block font-extrabold text-rose-500"> Forever Home. </strong>
                                    </h1>

                                    <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
                                        numquam ea!
                                    </p>

                                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                                        <a
                                            href="#"
                                            className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                                        >
                                            Get Started
                                        </a>

                                        <a
                                            href="#"
                                            className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
