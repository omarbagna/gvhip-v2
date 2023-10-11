import React from 'react';
import Navbar4 from '@/components/Layout/Navigations/Navbar4';
import FooterFour from '@/components/Layout/Footer/FooterFour';
import AttractionsBanner from '@/components/TouristAttractions/AttractionsBanner';
import kakum from '@/public/images/kakum.jpg';
import elmina from '@/public/images/elmina.jpg';
import mole from '@/public/images/mole.webp';
import boti from '@/public/images/boti.jpeg';
import AttractionsGrid from '@/components/TouristAttractions/AttractionsGrid';

const attractions = [
	{
		id: 1,
		name: 'Kakum National Park',
		image: kakum,
		alt: 'kakum canopy walk',
		url: '/tourist-attractions/kakum',
		location: 'central region',
	},
	{
		id: 2,
		name: 'Elmina Castle',
		image: elmina,
		alt: 'elmina castle',
		url: '/tourist-attractions/elmina',
		location: 'central region',
	},
	{
		id: 3,
		name: 'Boti Falls',
		image: boti,
		alt: 'boti falls',
		url: '/tourist-attractions/boti',
		location: 'eastern region',
	},
	{
		id: 4,
		name: 'Mole National Park',
		image: mole,
		alt: 'mole national park',
		url: '/tourist-attractions/mole',
		location: 'savannah region',
	},
];

const TouristSites = () => {
	return (
		<>
			<Navbar4 />
			<AttractionsBanner />
			<div className="tw-w-full tw-py-14 md:tw-py-24 tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-4">
				<div className="tw-w-full tw-px-8 lg:tw-px-14 tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-6">
					<h3 className="tw-capitalize tw-text-2xl lg:tw-text-4xl tw-w-full tw-text-center tw-font-medium">
						list of tourist attractions in ghana
					</h3>

					<AttractionsGrid attractions={attractions} />
				</div>
			</div>
			<FooterFour />
		</>
	);
};

export default TouristSites;
