import React from 'react';
import Navbar4 from '@/components/Layout/Navigations/Navbar4';
import PageTopTitle from '@/components/Common/PageTopTitle';
import Goal from '@/components/ServicesFour/Goal';
import Services from '@/components/ServicesFour/Services';
import WhatWeDo from '@/components/ServicesFour/WhatWeDo';
import TestimonialSix from '@/components/Testimonials/TestimonialSix';
import FooterFour from '@/components/Layout/Footer/FooterFour';

const Services4 = () => {
	return (
		<>
			<Navbar4 />
			<PageTopTitle
				subTitle="Our Services"
				title="Our work is delivered by the best team in the world"
			/>
			<Goal />
			<WhatWeDo />
			<Services />
			<TestimonialSix />
			<FooterFour />
		</>
	);
};

export default Services4;
