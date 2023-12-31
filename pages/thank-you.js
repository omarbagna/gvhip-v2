import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'pages/api/axios';
import { useQuery } from 'react-query';
import { Backdrop, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';

import logo from '@/public/images/gsti_logo.jpeg';

const ThankYou = () => {
	const router = useRouter();

	const paymentQuery = router.query;

	const registerUserRequest = async () => {
		const response = await axios.post(`/register/${paymentQuery?.uid}`);

		return response;
	};

	const registerUser = useQuery('register-user', registerUserRequest, {
		enabled: paymentQuery?.uid ? true : false,
	});

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

			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={registerUser.isLoading}>
				<div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-5">
					<CircularProgress color="inherit" />
					<p className="tw-text-white tw-font-medium tw-text-center tw-text-lg tw-w-2/3">
						Please wait
					</p>
				</div>
			</Backdrop>
		</div>
	);
};

export default ThankYou;
