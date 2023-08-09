import React from 'react';
import Navbar4 from '@/components/Layout/Navigations/Navbar4';
import PageTopTitle from '@/components/Common/PageTopTitle';
import WhyChooseUs from '@/components/ServicesThree/WhyChooseUs';
import Services from '@/components/ServicesThree/Services';
import TestimonialFour from '@/components/Testimonials/TestimonialFour';
import PartnerStyle1 from '@/components/Partners/PartnerStyle1';
import FooterFour from '@/components/Layout/Footer/FooterFour';

const Services3 = () => {
	return (
		<>
			<Navbar4 />
			<PageTopTitle
				subTitle="Our Services"
				title="Our work is delivered by the best team in the world"
			/>
			<WhyChooseUs />
			<Services />
			<TestimonialFour />
			<div className="bg-f9f9f9 br-bottom-100">
				<PartnerStyle1 />
			</div>
			<FooterFour />
		</>
	);
};

export default Services3;
