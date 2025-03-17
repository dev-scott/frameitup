"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import "swiper/css/effect-cards";

import { EffectCards } from 'swiper/modules';

import "../styles/carousel.css"

const images = [
    {src:'/frame/frame1.jpg',alt:'image 1'},
    {src:'/frame/frame1.jpg',alt:'image 1'},
    {src:'/frame/frame1.jpg',alt:'image 1'},
    {src:'/frame/frame1.jpg',alt:'image 1'},
]

const Carousel = () => {
  return (
    <Swiper 
      effect="cards"
    grabCursor={true}
    modules={[EffectCards]}
    className="mySwiper "
    

    >
        
        {images.map((image , index)=>(
            <SwiperSlide key={index}>
                <img src={image.src} alt={image.alt}  className='w-full h-full object-cover  '  />
            </SwiperSlide>
        ))}


    </Swiper>
  )
}

export default Carousel