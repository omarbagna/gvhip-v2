import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import bannerImg4 from '@/public/images/banner/banner4.png';
import shapeImg7 from '@/public/images/shape/shape7.png';
import shapeImg6 from '@/public/images/shape/shape6.png';

const Banner = () => {
	return (
		<div className="insurance-banner-area">
			<div className="container-fluid">
				<div className="row align-items-center">
					<div className="col-lg-6 col-md-12">
						<div className="insurance-banner-content">
							<span
								className="sub-title"
								data-aos="fade-up"
								data-aos-duration="1200">
								#Your gateway to a safe visit in Ghana
							</span>
							<h1
								data-aos="fade-up"
								data-aos-duration="1200"
								data-aos-delay="100"
								className="nunito-font">
								Welcome to the Ghana Safe Stay Programme
							</h1>
							<p
								data-aos="fade-up"
								data-aos-duration="1200"
								data-aos-delay="200">
								Ghana welcomes you with open arms! The Ghana Safe Stay Programme
								(GSSP) ensures that you have a seamless, safe, and medically
								secure trip within our beautiful country
							</p>
							<div
								className="btn-box"
								data-aos="fade-up"
								data-aos-duration="1200"
								data-aos-delay="300">
								<Link href="/form/get-quote">
									<a className="btn-style-one dark-green-color">
										Get a Quote <i className="bx bx-chevron-right"></i>
									</a>
								</Link>

								<Link href="/about-us-2">
									<a className="btn-style-one white-color">
										About Us <i className="bx bx-chevron-right"></i>
									</a>
								</Link>
							</div>
						</div>
					</div>

					<div className="col-lg-6 col-md-12">
						<div className="insurance-banner-image">
							<Image
								className="tw-rounded-lg tw-overflow-hidden"
								src={bannerImg4}
								data-aos="fade-up"
								data-aos-duration="1200"
								alt="banner-image"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
