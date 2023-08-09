import React from 'react';
import Navbar from '@/components/Layout/Navigations/Navbar4';
import PricingContent from '@/components/Pricing/PricingContent';
import Features from '@/components/Pricing/Features';
import Faq from '@/components/Pricing/Faq';
import TestimonialOne from '@/components/Testimonials/TestimonialOne';
import GetStarted from '@/components/Common/GetStarted';
import FooterFour from '@/components/Layout/Footer/FooterFour';

const Pricing = () => {
	return (
		<>
			<Navbar />
			<div className="page-title-area">
				<div className="container">
					<div className="page-title-content">
						<span className="sub-title light-green-color">Insurance Plans</span>
						<h1>No Hidden Charge Applied, Choose Your Plan</h1>
					</div>
				</div>
			</div>
			<PricingContent />
			<Features />
			<Faq />
			<TestimonialOne />
			<GetStarted />
			<FooterFour />
		</>
	);
};

export default Pricing;
