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
								Comprehensive Medical Coverage tailored for our international
								guests.
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
								Efficient Claims Process to ensure you get the required support
								promptly.
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
							<h3 className="nunito-font">Best Price</h3>
							<p>
								Clear and Fair Pricing based on your age and duration of stay.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Features;
