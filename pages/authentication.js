import React from 'react';
import Navbar from '@/components/Layout/Navigations/Navbar4';
import Login from '@/components/Authentication/Login';
import { FaAppStoreIos } from 'react-icons/fa';
import { BsGooglePlay } from 'react-icons/bs';
//import Signup from '@/components/Authentication/Signup';
//import FooterFour from '@/components/Layout/Footer/FooterFour';

const Authentication = () => {
	return (
		<>
			<Navbar />
			<div className="page-title-area">
				<div className="container">
					<div className="page-title-content">
						<span className="sub-title">Login</span>
						<h1>Welcome</h1>
					</div>
				</div>
			</div>
			<div className="profile-authentication-area ptb-75">
				<div className="container">
					<div className="row justify-content-center">
						<div className="tw-hidden md:tw-flex tw-w-full tw-justify-center tw-items-center">
							<Login />
						</div>

						<div className="tw-flex tw-flex-col tw-w-5/6 tw-justify-end tw-items-center tw-gap-3 tw-p-4 tw-rounded-lg md:tw-hidden">
							<h2 className="tw-text-2xl tw-capitalize tw-mb-5">
								Download our mobile app
							</h2>

							<div className="tw-w-2/3 tw-transition-all tw-duration-300 tw-flex tw-gap-2 tw-group tw-cursor-pointer tw-justify-between tw-items-center tw-rounded-md tw-p-2 tw-bg-black hover:tw-scale-110">
								<div className="tw-transition-all tw-duration-300 tw-text-secondary tw-capitalize group-hover:tw-text-[#8e6abf]">
									<p className="tw-text-xs tw-font-light tw-capitalize tw-text-gray-100">
										get it on
									</p>
									<p className="tw-text-sm lg:tw-text-base tw-font-medium tw-capitalize tw-text-white">
										Google Play
									</p>
								</div>
								<BsGooglePlay className="tw-text-white tw-shrink-0 tw-text-4xl" />
							</div>
							<div className="tw-w-2/3 tw-transition-all tw-duration-300 tw-flex tw-gap-2 tw-group tw-cursor-pointer tw-justify-between tw-items-center tw-rounded-md tw-p-2 tw-bg-gradient-to-tl tw-from-blue-700 tw-to-blue-500 hover:tw-scale-110">
								<div className="tw-transition-all tw-duration-300 tw-text-secondary tw-capitalize group-hover:tw-text-[#8e6abf]">
									<p className="tw-text-xs tw-font-light tw-capitalize tw-text-gray-100">
										download from the
									</p>
									<p className="tw-text-sm lg:tw-text-base tw-font-medium tw-capitalize tw-text-white">
										App Store
									</p>
								</div>
								<FaAppStoreIos className="tw-text-white tw-shrink-0 tw-text-4xl" />
							</div>
						</div>
						{/**
						<Signup />
						 */}
					</div>
				</div>
			</div>
		</>
	);
};

export default Authentication;
