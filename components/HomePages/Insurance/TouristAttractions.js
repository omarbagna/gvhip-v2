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
					pauseOnMouseEnter: false,
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
				<SwiperSlide>
					<div className="tw-relative tw-w-full tw-h-full tw-overflow-hidden tw-rounded-lg">
						<div className="tw-absolute tw-z-10 tw-top-0 tw-left-0 tw-bg-[#8e6abf]/30 tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center">
							<h3 className="nunito-font tw-text-center tw-text-white tw-text-2xl">
								Kakum National Park
							</h3>
						</div>
						<Image
							src={kakum}
							alt="kakum canopy walk"
							width={0}
							height={0}
							layout="fill"
							objectFit="cover"
							className="tw-rounded-lg"
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="tw-relative tw-w-full tw-h-full tw-overflow-hidden tw-rounded-lg">
						<div className="tw-absolute tw-z-10 tw-top-0 tw-left-0 tw-bg-[#8e6abf]/30 tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center">
							<h3 className="nunito-font tw-text-center tw-text-white tw-text-2xl">
								Elmina Castle
							</h3>
						</div>
						<Image
							src={elmina}
							alt="elmina castle"
							width={0}
							height={0}
							layout="fill"
							objectFit="cover"
							className="tw-rounded-lg"
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="tw-relative tw-w-full tw-h-full tw-overflow-hidden tw-rounded-lg">
						<div className="tw-absolute tw-z-10 tw-top-0 tw-left-0 tw-bg-[#8e6abf]/30 tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center">
							<h3 className="nunito-font tw-text-center tw-text-white tw-text-2xl">
								Boti Falls
							</h3>
						</div>
						<Image
							src={boti}
							alt="boti falls"
							width={0}
							height={0}
							layout="fill"
							objectFit="cover"
							className="tw-rounded-lg"
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="tw-relative tw-w-full tw-h-full tw-overflow-hidden tw-rounded-lg">
						<div className="tw-absolute tw-z-10 tw-top-0 tw-left-0 tw-bg-[#8e6abf]/30 tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center">
							<h3 className="nunito-font tw-text-center tw-text-white tw-text-2xl">
								Mole National Park
							</h3>
						</div>
						<Image
							src={mole}
							alt="mole national park"
							width={0}
							height={0}
							layout="fill"
							objectFit="cover"
							className="tw-rounded-lg"
						/>
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default TouristAttractions;
