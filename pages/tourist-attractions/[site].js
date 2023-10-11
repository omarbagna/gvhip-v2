import { useRouter } from 'next/router';
import React from 'react';
import Navbar4 from '@/components/Layout/Navigations/Navbar4';
import FooterFour from '@/components/Layout/Footer/FooterFour';
import mole from '@/public/images/mole.webp';
import SiteBanner from '@/components/TouristSite/SiteBanner';
import Link from 'next/link';
import { AiOutlinePhone } from 'react-icons/ai';
import { TbWorldWww } from 'react-icons/tb';
import ActivitiesGrid from '@/components/TouristSite/ActivitiesGrid';

const Site = () => {
	const router = useRouter();
	const location = router.query;

	const attraction = {
		id: 'mole',
		name: 'mole national park',
		image: mole,
		alt: 'mole national park',
		desc: 'Mole National Park is the largest and oldest national park in Ghana, and it offers a variety of activities and experiences for tourists interested in wildlife and nature.',
		phone: '0244316777',
		website: 'https://molenationalpark.org/',
		activities: [
			{
				id: 1,
				name: 'safari tours',
				image:
					'https://images.unsplash.com/photo-1694684613445-73fc374cd6df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
				alt: 'safari tour',
			},
			{
				id: 2,
				name: 'Walking Safaris',
				image:
					'https://images.unsplash.com/photo-1580737204647-c30845d38436?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
				alt: 'Walking Safaris',
			},
			{
				id: 3,
				name: 'Bird Watching',
				image:
					'https://images.unsplash.com/photo-1616468005477-71733ff5d4b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2882&q=80',
				alt: 'Bird Watching',
			},
			{
				id: 4,
				name: 'Cultural Experiences',
				image:
					'https://images.unsplash.com/photo-1497271679421-ce9c3d6a31da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2942&q=80',
				alt: 'Cultural Experiences',
			},
			{
				id: 5,
				name: 'Visit the Mole Motel',
				image:
					'https://images.unsplash.com/photo-1616285677522-8cf9274a0e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80',
				alt: 'Visit the Mole Motel',
			},
			{
				id: 6,
				name: 'Nature Walks',
				image:
					'https://images.unsplash.com/photo-1598608019675-4458f81be46c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
				alt: 'Nature Walks',
			},
		],
	};

	return (
		<>
			<Navbar4 />
			<SiteBanner
				name={attraction?.name}
				alt={attraction?.alt}
				image={attraction?.image}
			/>
			<div className="tw-w-full tw-py-14 md:tw-py-24 tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-4">
				<div className="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-text-xs tw-py-1 tw-px-5 tw-rounded-full tw-bg-[#FFECF4] tw-text-[#8D69BF] tw-font-medium">
					<Link href="/">
						<a className="hover:tw-text-[#8D69BF]">Home</a>
					</Link>
					/
					<Link href="/tourist-attractions">
						<a className="hover:tw-text-[#8D69BF]">Tourist Attractions</a>
					</Link>
					/<span className="tw-capitalize">{location?.site}</span>
				</div>
				<div className="tw-w-full tw-px-8 lg:tw-px-14 tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-6">
					<h3 className="tw-capitalize tw-text-2xl lg:tw-text-4xl tw-w-full tw-text-center tw-font-medium">
						Welcome to the {attraction?.name}
					</h3>
					<p
						data-aos="fade-up"
						data-aos-duration="1200"
						className="lg:tw-w-2/3 tw-text-center tw-text-base lg:tw-text-lg">
						{attraction?.desc}
						<br className="tw-hidden lg:tw-block" /> Here are some things
						tourists can do at{' '}
						<strong className="tw-capitalize tw-font-normal">
							{attraction?.name}
						</strong>
						:
					</p>

					<ActivitiesGrid activities={attraction?.activities} />

					<p
						data-aos="fade-up"
						data-aos-duration="1200"
						className="lg:tw-w-2/3 tw-text-center tw-text-base lg:tw-text-lg">
						Before visiting{' '}
						<strong className="tw-capitalize tw-font-normal">
							{attraction?.name}
						</strong>
						, it&apos;s advisable to check for any updated regulations, entry
						fees, and guided tour options. Additionally, hiring a knowledgeable
						guide is often recommended to enhance your viewing and overall
						experience.
					</p>
					<div className="tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-1">
						<p
							data-aos="fade-up"
							data-aos-duration="1200"
							className="lg:tw-w-2/3 tw-text-center tw-text-base lg:tw-text-lg">
							For booking and enquiries contact{' '}
							<strong className="tw-capitalize tw-font-normal">
								{attraction?.name}
							</strong>{' '}
							with the information below:
						</p>

						<div
							data-aos="fade-up"
							data-aos-duration="1200"
							className="tw-w-fit tw-flex tw-flex-col md:tw-flex-row tw-items-start tw-justify-center md:tw-items-center tw-gap-3 md:tw-gap-6 tw-shrink-0">
							{attraction?.phone ? (
								<a
									href={`tel:${attraction?.phone}`}
									className="tw-group tw-flex tw-justify-center tw-items-center tw-shrink-0 tw-gap-2 tw-text-[#8D69BF] hover:tw-text-[#8D69BF] tw-text-base">
									<span className="tw-transition-all tw-duration-200 tw-ease-in-out tw-p-1 tw-rounded-md tw-bg-[#FFECF4] tw-text-[#8D69BF] group-hover:tw-bg-[#8D69BF] group-hover:tw-text-white">
										<AiOutlinePhone className="tw-text-2xl" />
									</span>{' '}
									{attraction?.phone}
								</a>
							) : null}

							{attraction?.website ? (
								<a
									href={attraction?.website}
									target="_blank"
									rel="noreferrer"
									className="tw-group tw-flex tw-justify-center tw-items-center tw-shrink-0 tw-gap-2 tw-text-[#8D69BF] hover:tw-text-[#8D69BF] tw-text-base">
									<span className="tw-transition-all tw-duration-200 tw-ease-in-out tw-p-1 tw-rounded-md tw-bg-[#FFECF4] tw-text-[#8D69BF] group-hover:tw-bg-[#8D69BF] group-hover:tw-text-white">
										<TbWorldWww className="tw-text-2xl" />
									</span>{' '}
									Official website
								</a>
							) : null}
						</div>
					</div>
				</div>
			</div>
			<FooterFour />
		</>
	);
};

export default Site;
