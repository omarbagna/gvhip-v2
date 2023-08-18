import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import logo from '@/public/images/gsti_logo.jpeg';
import thankYouImg from '@/public/images/thank-you.png';

const ThankYou = () => {
	return (
		<div className="thank-you-area">
			<div className="d-table">
				<div className="d-table-cell">
					<div className="container">
						<div className="thank-you-content">
							<Link href="/">
								<a className="tw-p-1 tw-flex tw-justify-center tw-items-center tw-gap-2">
									<Image
										height={90}
										width={100}
										src={logo}
										alt="site logo"
										className="rounded-2"
									/>
								</a>
							</Link>
							{/*<Image src={thankYouImg} alt="thank-you" />*/}
							<h3>Successful Registration</h3>
							<p>
								Policy created, please check your inbox for your login
								credentials.
							</p>

							<Link href="/authentication">
								<a className="btn-style-one red-light-color">
									Click here to login <i className="bx bx-chevron-right"></i>
								</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ThankYou;
