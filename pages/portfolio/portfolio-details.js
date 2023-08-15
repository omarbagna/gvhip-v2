import React from 'react';
import Navbar from '@/components/Layout/Navigations/Navbar4';
import FooterFour from '@/components/Layout/Footer/FooterFour';
import PortfolioDetailsContent from '@/components/Portfolio/PortfolioDetailsContent';

const PortfolioDetails = () => {
	return (
		<>
			<Navbar />
			<div className="page-title-area">
				<div className="container">
					<div className="page-title-content">
						<h1>Finance Consulting</h1>
						<ul>
							<li>
								<a href="#">Home</a>
							</li>
							<li>
								<a href="#">Portfolio</a>
							</li>
							<li>Insurance Consulting</li>
						</ul>
					</div>
				</div>
			</div>
			<PortfolioDetailsContent />
			<FooterFour />
		</>
	);
};

export default PortfolioDetails;
