import React from 'react';
import Navbar from '@/components/Layout/Navigations/Navbar4';
import RightSidebarContent from '@/components/Blog/RightSidebarContent';
import FooterFour from '@/components/Layout/Footer/FooterFour';
import Partner from '@/components/HomePages/BigData/Partner';

const BlogRightSidebar = () => {
	return (
		<>
			<Navbar />
			<div className="page-title-area">
				<div className="container">
					<div className="page-title-content">
						<span className="sub-title red-light-color">
							Blog right sidebar
						</span>
						<h1>Our latest articles & resources</h1>
					</div>
				</div>
			</div>
			<RightSidebarContent />
			<div className="pt-100 bg-f9f9f9">
				<Partner />
			</div>
			<FooterFour />
		</>
	);
};

export default BlogRightSidebar;
