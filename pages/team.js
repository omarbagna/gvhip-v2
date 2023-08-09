import React from 'react';
import Navbar from '@/components/Layout/Navigations/Navbar4';
import TeamOne from '@/components/Team/TeamOne';
import TeamTwo from '@/components/Team/TeamTwo';
import FooterFour from '@/components/Layout/Footer/FooterFour';

const Team = () => {
	return (
		<>
			<Navbar />
			<div className="page-title-area">
				<div className="container">
					<div className="page-title-content">
						<span className="sub-title">Our Capable Team</span>
						<h1>Our team believes you deserve only the best</h1>
					</div>
				</div>
			</div>
			<TeamOne />
			<TeamTwo />
			<FooterFour />
		</>
	);
};

export default Team;
