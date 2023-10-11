import React from 'react';
import kakum from '@/public/images/kakum.jpg';
import elmina from '@/public/images/elmina.jpg';
import mole from '@/public/images/mole.webp';
import boti from '@/public/images/boti.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, A11y, EffectCreative, Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SwiperNavButtons } from '../Swiper/SwiperNavBtns';

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

const AttractionsBanner = () => {
	return (
		<div className="testimonials-area with-top-border o-hidden ptb-100 !tw-bg-[#fffbfb] tw-px-8 lg:tw-px-14">
			<div className="tw-flex tw-justify-between tw-items-center tw-gap-6">
				<div className="insurance-banner-content tw-w-1/2">
					<h1
						data-aos="fade-up"
						data-aos-duration="1200"
						className="nunito-font tw-capitalize"
						data-aos-delay="100">
						Top five tourist destinations in ghana
					</h1>
				</div>

				<div className="tw-w-1/2">
					<Swiper
						spaceBetween={25}
						centeredSlides={true}
						effect={'creative'}
						creativeEffect={{
							prev: {
								shadow: true,
								translate: [0, 0, -400],
							},
							next: {
								translate: ['100%', 0, 0],
							},
						}}
						pagination={{
							clickable: true,
						}}
						autoplay={{
							delay: 8000,
							pauseOnMouseEnter: true,
							disableOnInteraction: false,
						}}
						loop={true}
						className="[&_.swiper-pagination-bullet-active]:tw-bg-[#8e6abf] tw-flex tw-flex-col tw-gap-4 tw-justify-center tw-items-center"
						modules={[Pagination, Autoplay, A11y, EffectCreative, Navigation]}>
						{attractions.map((attraction, index) => (
							<SwiperSlide key={index}>
								<Link href={attraction.url} passHref>
									<div className="tw-group tw-relative tw-w-full tw-h-[50vh] tw-overflow-hidden tw-rounded-lg tw-cursor-pointer">
										<div className="tw-transition-all tw-duration-300 tw-ease-in-out tw-absolute tw-z-10 tw-top-0 tw-left-0 tw-bg-[#8e6abf]/30 tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center tw-cursor-pointer">
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
						<SwiperNavButtons />
					</Swiper>
				</div>
			</div>
		</div>
	);
};

export default AttractionsBanner;
