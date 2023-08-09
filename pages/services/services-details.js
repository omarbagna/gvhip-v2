import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Layout/Navigations/Navbar4';
import DetailsContent from '@/components/Services/DetailsContent';
import GetStarted from '@/components/Common/GetStarted';
import FooterFour from '@/components/Layout/Footer/FooterFour';

const ServicesDetails = () => {
	return (
		<>
			<Navbar />
			<div className="page-title-area">
				<div className="container">
					<div className="page-title-content">
						<h1>Android Apps Development</h1>
						<ul>
							<li>
								<Link href="/">
									<a>Home</a>
								</Link>
							</li>
							<li>
								<Link href="/services">
									<a>Services</a>
								</Link>
							</li>
							<li>Services Details</li>
						</ul>
					</div>
				</div>
			</div>
			<DetailsContent />
			<div className="pb-100">
				<GetStarted />
			</div>
			<FooterFour />
		</>
	);
};

export default ServicesDetails;
