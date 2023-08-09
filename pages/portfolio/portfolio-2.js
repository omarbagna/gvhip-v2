import React from 'react';
import Navbar from '@/components/Layout/Navigations/Navbar4';
import PortfolioStyle2 from '@/components/Portfolio/PortfolioStyle2';
import FooterFour from '@/components/Layout/Footer/FooterFour';

const Portfolio2 = () => {
	return (
		<>
			<Navbar />
			<div className="page-title-area">
				<div className="container">
					<div className="page-title-content">
						<span className="sub-title red-light-color">Portfolio</span>
						<h1>We&apos;ve done lot&apos; of work, Let&apos;s check some</h1>
					</div>
				</div>
			</div>
			<PortfolioStyle2 />
			<FooterFour />
		</>
	);
};

export default Portfolio2;
