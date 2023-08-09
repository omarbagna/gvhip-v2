import React from 'react';
import Link from '@/utils/ActiveLink';
import Image from 'next/image';

import logo from '@/public/images/gsti_logo.jpeg';
import supportImg from '@/public/images/supportImg.jpg';
import learnImg from '@/public/images/learnImg.jpg';

const Navbar4 = () => {
	const [menu, setMenu] = React.useState(true);
	const toggleNavbar = () => {
		setMenu(!menu);
	};
	React.useEffect(() => {
		let elementId = document.getElementById('navbar');
		document.addEventListener('scroll', () => {
			if (window.scrollY > 170) {
				elementId.classList.add('is-sticky');
			} else {
				elementId.classList.remove('is-sticky');
			}
		});
	});

	const classOne = menu
		? 'collapse navbar-collapse mean-menu'
		: 'collapse navbar-collapse show';
	const classTwo = menu
		? 'navbar-toggler navbar-toggler-right collapsed'
		: 'navbar-toggler navbar-toggler-right';

	return (
		<div id="navbar" className="navbar-area">
			<div className="main-nav">
				<div className="container-fluid">
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<Link href="/">
							<a className="navbar-brand p-1">
								<Image src={logo} alt="site logo" className="rounded-2" />
							</a>
						</Link>

						<button
							onClick={toggleNavbar}
							className={classTwo}
							type="button"
							data-toggle="collapse"
							data-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation">
							<span className="icon-bar top-bar"></span>
							<span className="icon-bar middle-bar"></span>
							<span className="icon-bar bottom-bar"></span>
						</button>

						<div className={classOne} id="navbarSupportedContent">
							<ul className="navbar-nav">
								<li className="nav-item">
									<Link href="/" activeClassName="active">
										<a className="nav-link">Home</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link href="/about-us-2" activeClassName="active">
										<a className="nav-link">About Us</a>
									</Link>
									{/**
										<ul className="dropdown-menu">
											<li className="nav-item">
												<a href="#" className="dropdown-toggle nav-link">
													About Us
												</a>
												<ul className="dropdown-menu">
													<li className="nav-item">
														<Link href="/about-us" activeClassName="active">
															<a className="nav-link">IT Startup</a>
														</Link>
													</li>
													<li className="nav-item">
														<Link href="/about-us-2" activeClassName="active">
															<a className="nav-link">Insurance</a>
														</Link>
													</li>
												</ul>
											</li>
											<li className="nav-item">
												<Link href="/team" activeClassName="active">
													<a className="nav-link">Team</a>
												</Link>
											</li>
											<li className="nav-item">
												<Link href="/testimonials" activeClassName="active">
													<a className="nav-link">Testimonials</a>
												</Link>
											</li>
											<li className="nav-item">
												<a href="#" className="dropdown-toggle nav-link">
													Courses
												</a>
												<ul className="dropdown-menu">
													<li className="nav-item">
														<Link href="/courses" activeClassName="active">
															<a className="nav-link">Courses</a>
														</Link>
													</li>
													<li className="nav-item">
														<Link
															href="/courses/courses-details"
															activeClassName="active">
															<a className="nav-link">Courses Details</a>
														</Link>
													</li>
												</ul>
											</li>
											<li className="nav-item">
												<Link href="/pricing" activeClassName="active">
													<a className="nav-link">Pricing</a>
												</Link>
											</li>
											<li className="nav-item">
												<Link href="/features" activeClassName="active">
													<a className="nav-link">Features</a>
												</Link>
											</li>
											<li className="nav-item">
												<a href="#" className="dropdown-toggle nav-link">
													Services
												</a>
												<ul className="dropdown-menu">
													<li className="nav-item">
														<Link
															href="/services/services"
															activeClassName="active">
															<a className="nav-link">Services Style 01</a>
														</Link>
													</li>
													<li className="nav-item">
														<Link
															href="/services/services-2"
															activeClassName="active">
															<a className="nav-link">Services Style 02</a>
														</Link>
													</li>
													<li className="nav-item">
														<Link
															href="/services/services-3"
															activeClassName="active">
															<a className="nav-link">Services Style 03</a>
														</Link>
													</li>
													<li className="nav-item">
														<Link
															href="/services/services-4"
															activeClassName="active">
															<a className="nav-link">Services Style 04</a>
														</Link>
													</li>
													<li className="nav-item">
														<Link
															href="/services/services-details"
															activeClassName="active">
															<a className="nav-link">Services Details</a>
														</Link>
													</li>
												</ul>
											</li>
											<li className="nav-item">
												<Link href="/authentication" activeClassName="active">
													<a className="nav-link">Login/Register</a>
												</Link>
											</li>
											<li className="nav-item">
												<Link href="/lost-password" activeClassName="active">
													<a className="nav-link">Forgot Password</a>
												</Link>
											</li>
											<li className="nav-item">
												<Link href="/faq" activeClassName="active">
													<a className="nav-link">FAQ</a>
												</Link>
											</li>
											<li className="nav-item">
												<Link href="/privacy-policy" activeClassName="active">
													<a className="nav-link">Privacy Policy</a>
												</Link>
											</li>
											<li className="nav-item">
												<Link href="/terms-conditions" activeClassName="active">
													<a className="nav-link">Terms & Conditions</a>
												</Link>
											</li>
											<li className="nav-item">
												<Link href="/coming-soon" activeClassName="active">
													<a className="nav-link">Coming Soon</a>
												</Link>
											</li>
											<li className="nav-item">
												<Link href="/404" activeClassName="active">
													<a className="nav-link">404 Error Page</a>
												</Link>
											</li>
											<li className="nav-item">
												<Link href="/thank-you" activeClassName="active">
													<a className="nav-link">Thank You</a>
												</Link>
											</li>
										</ul>
									 */}
								</li>
								<li className="nav-item megamenu">
									<Link href="#">
										<a className="dropdown-toggle nav-link">Learn</a>
									</Link>
									<ul className="dropdown-menu">
										<li className="nav-item">
											<div className="container">
												<div className="row">
													<div className="col-12 col-sm-6 col-md-3 mtb-5">
														<a className="d-block p-2">
															<Image
																src={learnImg}
																alt="learn megamenu"
																className="rounded-3 overflow-hidden"
															/>
														</a>
													</div>

													<div className="col-12 col-sm-6 col-md-3 mtb-5" />

													<div className="col-12 col-sm-6 col-md-3 mtb-5">
														<ul className="megamenu-submenu">
															<li className="nav-item">
																<Link href="/features" activeClassName="active">
																	<a className="nav-link">Features</a>
																</Link>
															</li>
															<li className="nav-item">
																<Link href="/team" activeClassName="active">
																	<a className="nav-link">Team</a>
																</Link>
															</li>
															<li className="nav-item">
																<Link href="/pricing" activeClassName="active">
																	<a className="nav-link">Plans</a>
																</Link>
															</li>
															<li className="nav-item">
																<Link
																	href="/blogs/blog-grid"
																	activeClassName="active">
																	<a className="nav-link">Blog</a>
																</Link>
															</li>
														</ul>
													</div>

													<div className="col-12 col-sm-6 col-md-3 mtb-5">
														<ul className="megamenu-submenu">
															<li className="nav-item">
																<Link
																	href="/blogs/blog-grid"
																	activeClassName="active">
																	<a className="nav-link">Knowledge Center</a>
																</Link>
															</li>
															<li className="nav-item">
																<Link
																	href="/blogs/blog-grid"
																	activeClassName="active">
																	<a className="nav-link">Learn About Claims</a>
																</Link>
															</li>
															<li className="nav-item">
																<Link href="/faq" activeClassName="active">
																	<a className="nav-link">FAQ</a>
																</Link>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</li>
									</ul>
								</li>
								<li className="nav-item megamenu">
									<Link href="#">
										<a className="dropdown-toggle nav-link">Support</a>
									</Link>
									<ul className="dropdown-menu">
										<li className="nav-item">
											<div className="container">
												<div className="row">
													<div className="col-12 col-sm-6 col-md-3 mtb-5">
														<a className="d-block p-2">
															<Image
																src={supportImg}
																alt="support megamenu"
																className="rounded-3 overflow-hidden"
															/>
														</a>
													</div>

													<div className="col-12 col-sm-6 col-md-3 mtb-5" />

													<div className="col-12 col-sm-6 col-md-3 mtb-5">
														<ul className="megamenu-submenu">
															<li className="nav-item">
																<Link href="#" activeClassName="active">
																	<a className="nav-link">Manage your Policy</a>
																</Link>
															</li>
															<li className="nav-item">
																<Link href="/team" activeClassName="active">
																	<a className="nav-link">
																		Request Policy ID Card
																	</a>
																</Link>
															</li>
														</ul>
													</div>

													<div className="col-12 col-sm-6 col-md-3 mtb-5">
														<ul className="megamenu-submenu">
															<li className="nav-item">
																<Link href="#" activeClassName="active">
																	<a className="nav-link">
																		Find Doctors & Hospitals
																	</a>
																</Link>
															</li>
															<li className="nav-item">
																<Link href="#" activeClassName="active">
																	<a className="nav-link">Request a Quote</a>
																</Link>
															</li>
															<li className="nav-item">
																<Link href="/contact" activeClassName="active">
																	<a className="nav-link">Contact Us</a>
																</Link>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</li>
									</ul>
								</li>
							</ul>
						</div>

						<div className="others-option">
							<Link href="/pricing" activeClassName="active">
								<a className="btn-style-one crimson-color">Show Plans</a>
							</Link>
						</div>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Navbar4;
