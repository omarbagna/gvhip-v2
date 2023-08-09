import React from 'react';

const Features = () => {
	return (
		<div className="features-area pt-100 pb-75">
			<div className="container">
				<div className="section-title">
					<span className="sub-title dark-green-color">Key Features</span>
					<h2 className="nunito-font">We provide the best for our clients</h2>
				</div>
				<div className="row justify-content-center">
					<div
						className="col-lg-4 col-md-6 col-sm-6"
						data-aos="fade-up"
						data-aos-duration="1200">
						<div className="single-features-item">
							<div className="icon">
								<i className="flaticon-beach-umbrella"></i>
							</div>
							<h3 className="nunito-font">More Coverage</h3>
							<p>
								Discover peace of mind on your journeys with our travel
								insurance enhanced coverage options, ensuring comprehensive
								protection against unforeseen events and empowering you to
								travel worry-free.
							</p>
						</div>
					</div>
					<div
						className="col-lg-4 col-md-6 col-sm-6"
						data-aos="fade-up"
						data-aos-duration="1200"
						data-aos-delay="100">
						<div className="single-features-item">
							<div className="icon">
								<i className="flaticon-ok"></i>
							</div>
							<h3 className="nunito-font">Hassle Free</h3>
							<p>
								Experience the joy of hassle-free insurance with our seamless
								and efficient services, providing you with the convenience and
								support you need to focus on making unforgettable memories on
								your journey.
							</p>
						</div>
					</div>
					<div
						className="col-lg-4 col-md-6 col-sm-6"
						data-aos="fade-up"
						data-aos-duration="1200"
						data-aos-delay="200">
						<div className="single-features-item">
							<div className="icon">
								<i className="flaticon-fast-time"></i>
							</div>
							<h3 className="nunito-font">Faster Benefits</h3>
							<p>
								Unlock a world of efficiency with our travel insurance, ensuring
								swift and streamlined claims processing, so you can quickly
								recover from unexpected setbacks and resume your adventures with
								confidence.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Features;
