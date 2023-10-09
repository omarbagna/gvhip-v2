import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import {
	Pagination,
	Autoplay,
	Navigation,
	A11y,
	EffectCoverflow,
} from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';

const TouristAttractions = () => {
	return (
		<div className="testimonials-area with-top-border o-hidden ptb-100">
			<div
				className="section-title"
				data-aos="fade-up"
				data-aos-duration="1200">
				<span className="sub-title dark-green-color">Attractions</span>
				<h2 className="nunito-font">
					Here are some populor tourist attractions in Ghana
				</h2>
			</div>
			<div className="tw-w-screen">
				<Swiper
					effect={'coverflow'}
					spaceBetween={25}
					centeredSlides={true}
					navigation
					coverflowEffect={{
						rotate: 50,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: true,
					}}
					pagination={{
						clickable: true,
					}}
					autoplay={{
						delay: 3000,
						pauseOnMouseEnter: true,
					}}
					breakpoints={{
						1: {
							slidesPerView: 1,
						},
						768: {
							slidesPerView: 2,
						},
					}}
					className="testimonials-slides-four tw-bg-green-500 tw-h-[50vh]"
					modules={[Pagination, Autoplay, Navigation, A11y, EffectCoverflow]}>
					<SwiperSlide className="tw-bg-yellow-400">
						<div className="tw-bg-red-400 tw-w-full tw-h-full" />
					</SwiperSlide>
					<SwiperSlide>Slide 2</SwiperSlide>
					<SwiperSlide>Slide 3</SwiperSlide>
					<SwiperSlide>Slide 4</SwiperSlide>
				</Swiper>
			</div>
		</div>
	);
};

export default TouristAttractions;
