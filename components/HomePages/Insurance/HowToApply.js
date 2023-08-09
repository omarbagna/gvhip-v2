import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import arrowImg from '@/public/images/arrow.png';

const HowToApply = () => {
	return (
		<div className="how-to-apply-area ptb-100 bg-263238">
			<div className="container">
				<div className="section-title white-color">
					<span className="sub-title">Application Process</span>
					<h2 className="nunito-font">Get your travel insurance today</h2>
				</div>
				<div className="apply-arrow">
					<div className="arrow">
						<Image
							src={arrowImg}
							data-aos="fade-down"
							data-aos-duration="1200"
							data-aos-delay="400"
							alt="arrow"
						/>
					</div>
					<div className="row justify-content-center">
						<div
							className="col-lg-4 col-md-6 col-sm-6"
							data-aos="fade-up"
							data-aos-duration="1200">
							<div className="single-how-to-apply-box">
								<div className="number">1</div>
								<h3 className="nunito-font">Answer A Few Questions</h3>
								<p>
									Incorporating a user-friendly process loop, our website
									empowers clients to efficiently answer relevant questions,
									ensuring personalized coverage that meets their unique travel
									needs and preferences.
								</p>
							</div>
						</div>
						<div
							className="col-lg-4 col-md-6 col-sm-6"
							data-aos="fade-up"
							data-aos-duration="1200"
							data-aos-delay="100">
							<div className="single-how-to-apply-box">
								<div className="number">2</div>
								<h3 className="nunito-font">Receive Your Free Quotes</h3>
								<p>
									As part of our seamless process loop, clients enjoy the added
									benefit of receiving free, customized quotes on our website,
									allowing them to explore a range of coverage options and find
									the perfect plan that suits their travel requirements.
								</p>
							</div>
						</div>
						<div
							className="col-lg-4 col-md-6 col-sm-6"
							data-aos="fade-up"
							data-aos-duration="1200"
							data-aos-delay="200">
							<div className="single-how-to-apply-box">
								<div className="number">3</div>
								<h3 className="nunito-font">Purchase Your Plan</h3>
								<p>
									Finally, clients can confidently secure their travel insurance
									plan with ease, making the purchase on our website a smooth
									and worry-free experience.
								</p>
							</div>
						</div>
						<div
							className="col-lg-12 col-md-12 col-sm-12"
							data-aos="fade-up"
							data-aos-duration="1200"
							data-aos-delay="300">
							<div className="lets-start-box">
								<Link href="/form/get-quote">
									<a className="btn-style-one dark-green-color">
										Get a Quote <i className="bx bx-chevron-right"></i>
									</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HowToApply;
