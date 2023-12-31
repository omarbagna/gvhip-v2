import React from 'react';
import Image from 'next/image';

import teamImg7 from '@/public/images/team/team7.jpg';
import teamImg8 from '@/public/images/team/team8.jpg';
import teamImg9 from '@/public/images/team/team9.jpg';
import teamImg10 from '@/public/images/team/team10.jpg';

const TeamTwo = () => {
	return (
		<div className="team-area pb-75">
			<div className="container">
				<div className="row">
					<div
						className="col-lg-3 col-md-6 col-sm-6"
						data-aos="fade-up"
						data-aos-duration="1200">
						<div className="single-team-member bg1">
							<Image src={teamImg7} alt="member-image" />
							<div className="content">
								<h3>Franco Gino</h3>
								<ul className="social">
									<li>
										<a
											href="https://www.facebook.com/"
											target="_blank"
											rel="noreferrer">
											<i className="flaticon-facebook-app-symbol"></i>
										</a>
									</li>
									<li>
										<a
											href="https://www.twitter.com/"
											target="_blank"
											rel="noreferrer">
											<i className="flaticon-twitter"></i>
										</a>
									</li>
									<li>
										<a
											href="https://www.linkedin.com/"
											target="_blank"
											rel="noreferrer">
											<i className="flaticon-linkedin"></i>
										</a>
									</li>
									<li>
										<a
											href="https://www.instagram.com/"
											target="_blank"
											rel="noreferrer">
											<i className="flaticon-instagram"></i>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div
						className="col-lg-3 col-md-6 col-sm-6"
						data-aos="fade-up"
						data-aos-duration="1200"
						data-aos-delay="100">
						<div className="single-team-member bg2">
							<Image src={teamImg8} alt="member-image" />
							<div className="content">
								<h3>Emila Lucy</h3>
								<ul className="social">
									<li>
										<a
											href="https://www.facebook.com/"
											target="_blank"
											rel="noreferrer">
											<i className="flaticon-facebook-app-symbol"></i>
										</a>
									</li>
									<li>
										<a
											href="https://www.twitter.com/"
											target="_blank"
											rel="noreferrer">
											<i className="flaticon-twitter"></i>
										</a>
									</li>
									<li>
										<a
											href="https://www.linkedin.com/"
											target="_blank"
											rel="noreferrer">
											<i className="flaticon-linkedin"></i>
										</a>
									</li>
									<li>
										<a
											href="https://www.instagram.com/"
											target="_blank"
											rel="noreferrer">
											<i className="flaticon-instagram"></i>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div
						className="col-lg-3 col-md-6 col-sm-6"
						data-aos="fade-up"
						data-aos-duration="1200">
						<div className="single-team-member bg3">
							<Image src={teamImg9} alt="member-image" />
							<div className="content">
								<h3>Alina Smith</h3>
								<ul className="social">
									<li>
										<a
											href="https://www.facebook.com/"
											target="_blank"
											rel="noreferrer">
											<i className="flaticon-facebook-app-symbol"></i>
										</a>
									</li>
									<li>
										<a
											href="https://www.twitter.com/"
											target="_blank"
											rel="noreferrer">
											<i className="flaticon-twitter"></i>
										</a>
									</li>
									<li>
										<a
											href="https://www.linkedin.com/"
											target="_blank"
											rel="noreferrer">
											<i className="flaticon-linkedin"></i>
										</a>
									</li>
									<li>
										<a
											href="https://www.instagram.com/"
											target="_blank"
											rel="noreferrer">
											<i className="flaticon-instagram"></i>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div
						className="col-lg-3 col-md-6 col-sm-6"
						data-aos="fade-up"
						data-aos-duration="1200"
						data-aos-delay="100">
						<div className="single-team-member bg4">
							<Image src={teamImg10} alt="member-image" />
							<div className="content">
								<h3>Andrea Romeo</h3>
								<ul className="social">
									<li>
										<a
											href="https://www.facebook.com/"
											target="_blank"
											rel="noreferrer">
											<i className="flaticon-facebook-app-symbol"></i>
										</a>
									</li>
									<li>
										<a
											href="https://www.twitter.com/"
											target="_blank"
											rel="noreferrer">
											<i className="flaticon-twitter"></i>
										</a>
									</li>
									<li>
										<a
											href="https://www.linkedin.com/"
											target="_blank"
											rel="noreferrer">
											<i className="flaticon-linkedin"></i>
										</a>
									</li>
									<li>
										<a
											href="https://www.instagram.com/"
											target="_blank"
											rel="noreferrer">
											<i className="flaticon-instagram"></i>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeamTwo;
