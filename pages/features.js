import React from 'react';
import Navbar from '@/components/Layout/Navigations/Navbar4';
import FeatureOne from '@/components/Features/FeatureOne';
import FeatureTwo from '@/components/Features/FeatureTwo';
import FeaturesThree from '@/components/Features/FeaturesThree';
import Goal from '@/components/Features/Goal';
import FooterFour from '@/components/Layout/Footer/FooterFour';

const Features = () => {
	return (
		<>
			<Navbar />
			<div className="page-title-area">
				<div className="container">
					<div className="page-title-content">
						<span className="sub-title">Our Features</span>
						<h1>Most probably included best features ever</h1>
					</div>
				</div>
			</div>
			<FeatureOne />
			<FeatureTwo />
			<FeaturesThree />
			<Goal />
			<FooterFour />
		</>
	);
};

export default Features;
