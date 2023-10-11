import React from 'react';
import kakum from '@/public/images/kakum.jpg';
import elmina from '@/public/images/elmina.jpg';
import mole from '@/public/images/mole.webp';
import boti from '@/public/images/boti.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, A11y, EffectCoverflow } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import Image from 'next/image';
import Link from 'next/link';

const attractions = [
	{
		id: 1,
		name: 'Kakum National Park',
		image: kakum,
		alt: 'kakum canopy walk',
		url: '/tourist-attractions/kakum',
	},
	{
		id: 2,
		name: 'Elmina Castle',
		image: elmina,
		alt: 'elmina castle',
		url: '/tourist-attractions/elmina',
	},
	{
		id: 3,
		name: 'Boti Falls',
		image: boti,
		alt: 'boti falls',
		url: '/tourist-attractions/boti',
	},
	{
		id: 4,
		name: 'Mole National Park',
		image: mole,
		alt: 'mole national park',
		url: '/tourist-attractions/mole',
	},
];

const TouristAttractions = () => {
	return (
		<div className="testimonials-area with-top-border o-hidden ptb-100 !tw-bg-[#fffbfb]">
			<div
				className="section-title"
				data-aos="fade-up"
				data-aos-duration="1200">
				<span className="sub-title dark-green-color">Attractions</span>
				<h2 className="nunito-font">
					Here are some populor tourist attractions in Ghana
				</h2>
			</div>
			<Swiper
				effect={'coverflow'}
				spaceBetween={25}
				centeredSlides={true}
				coverflowEffect={{
					rotate: 50,
					stretch: 0,
					depth: 70,
					modifier: 1,
					slideShadows: true,
				}}
				pagination={{
					clickable: true,
				}}
				autoplay={{
					delay: 3000,
					pauseOnMouseEnter: true,
					disableOnInteraction: false,
				}}
				breakpoints={{
					1: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 2,
					},
				}}
				className="testimonials-slides-four tw-h-[50vh]"
				modules={[Pagination, Autoplay, A11y, EffectCoverflow]}>
				{attractions.map((attraction, index) => (
					<SwiperSlide key={index}>
						<Link href={attraction.url} passHref>
							<div className="tw-group tw-relative tw-w-full tw-h-full tw-overflow-hidden tw-rounded-lg tw-cursor-pointer">
								<div className="tw-transition-all tw-duration-300 tw-ease-in-out tw-absolute tw-z-10 tw-top-0 tw-left-0 tw-bg-[#8e6abf]/30 group-hover:tw-bg-[#8e6abf]/60 tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center tw-cursor-pointer">
									<h3 className="nunito-font tw-transition-all tw-duration-300 tw-ease-in-out tw-text-center tw-text-white tw-text-2xl tw-cursor-pointer group-hover:tw-scale-150">
										{attraction.name}
									</h3>
								</div>
								<Image
									src={attraction.image}
									alt={attraction.alt}
									width={0}
									height={0}
									layout="fill"
									objectFit="cover"
									className="tw-rounded-lg tw-cursor-pointer tw-transition-all tw-duration-300 tw-ease-in-out group-hover:tw-scale-125 group-hover:tw-rotate-6"
								/>
							</div>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default TouristAttractions;
