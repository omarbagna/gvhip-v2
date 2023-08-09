import React from 'react';
import Navbar4 from '@/components/Layout/Navigations/Navbar4';
import Content from '@/components/Courses/Content';
import AppDownload from '@/components/Courses/AppDownload';
import FooterFour from '@/components/Layout/Footer/FooterFour';

const Index = () => {
	return (
		<>
			<Navbar4 />
			<div className="page-title-area style-two">
				<div className="container">
					<div className="page-title-content">
						<span className="sub-title yellow-color">
							Learn at your own pace
						</span>
						<h1>Abev Popular Courses</h1>
					</div>
				</div>
			</div>
			<Content />
			<AppDownload />
			<FooterFour />
		</>
	);
};

export default Index;
