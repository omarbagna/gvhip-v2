import React from 'react';
import DashboardNav from '@/components/Layout/Navigations/DashboardNav';
import { Badge } from '@mui/material';
import { addDays, differenceInDays, format } from 'date-fns';
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi';
import { BsPhone } from 'react-icons/bs';
//import Signup from '@/components/Authentication/Signup';
//import FooterFour from '@/components/Layout/Footer/FooterFour';

const Dashboard = () => {
	return (
		<div className="tw-w-screen tw-min-h-screen tw-bg-[#FEFBFB] tw-py-20 lg:tw-pt-20 lg:tw-pl-56">
			<DashboardNav />
			<div className="tw-w-full tw-h-full tw-py-10 tw-px-12 tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-10">
				<div className="tw-w-full tw-flex tw-justify-between tw-items-center">
					<h2 className="tw-text-3xl tw-font-semibold">Dashboard</h2>

					<div className="tw-w-fit tw-flex tw-justify-start tw-items-center tw-gap-3">
						<Badge
							color={'success'}
							className={'tw-animate-pulse'}
							overlap="circular"
							badgeContent=" "
							variant="dot"
						/>
						<p>Active</p>
					</div>
				</div>

				<div className="tw-w-full tw-grid tw-grid-cols-2 xl:tw-grid-cols-3 tw-gap-5 tw-place-content-start tw-place-items-start">
					<div className="tw-w-full tw-h-fit tw-bg-white tw-shadow-sm xl:tw-col-span-2 tw-rounded-lg tw-py-5 tw-px-8 tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-5">
						<div className="tw-w-full tw-flex tw-justify-between tw-items-center">
							<h3 className="tw-font-medium tw-text-xl tw-text-[#8e6abf]">
								Traveller 1
							</h3>
						</div>
						<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-gap-8">
							<div className="tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-3">
								<h4 className="tw-font-medium tw-text-lg">Sinkari Omar</h4>
								<span className="tw-flex tw-justify-start tw-items-center tw-gap-2">
									<HiOutlineLocationMarker className="tw-text-xl tw-shrink-0 tw-text-gray-500" />
									<p className="tw-text-sm">Ghana</p>
								</span>
								<span className="tw-flex tw-flex-wrap tw-justify-start tw-items-center tw-gap-3">
									<span className="tw-flex tw-justify-start tw-items-center tw-gap-2">
										<HiOutlineMail className="tw-text-xl tw-shrink-0 tw-text-gray-500" />
										<p className="tw-text-sm tw-lowercase">sinkari@email.com</p>
									</span>
									<span className="tw-flex tw-justify-start tw-items-center tw-gap-2">
										<BsPhone className="tw-text-xl tw-shrink-0 tw-text-gray-500" />
										<p className="tw-text-sm">+233201231234</p>
									</span>
								</span>
							</div>
						</div>
					</div>
					<div className="tw-w-full tw-h-fit tw-bg-white tw-shadow-sm xl:tw-col-span-2 tw-rounded-lg tw-py-5 tw-px-8 tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-5">
						<div className="tw-w-full tw-flex tw-justify-between tw-items-center">
							<h3 className="tw-font-medium tw-text-xl tw-text-[#8e6abf]">
								Traveller 2
							</h3>
						</div>
						<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-gap-8">
							<div className="tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-3">
								<h4 className="tw-font-medium tw-text-lg">Antoungemine Omar</h4>
								<span className="tw-flex tw-justify-start tw-items-center tw-gap-2">
									<HiOutlineLocationMarker className="tw-text-xl tw-shrink-0 tw-text-gray-500" />
									<p className="tw-text-sm">Ghana</p>
								</span>
								<span className="tw-flex tw-flex-wrap tw-justify-start tw-items-center tw-gap-3">
									<span className="tw-flex tw-justify-start tw-items-center tw-gap-2">
										<HiOutlineMail className="tw-text-xl tw-shrink-0 tw-text-gray-500" />
										<p className="tw-text-sm tw-lowercase">sinkari@email.com</p>
									</span>
									<span className="tw-flex tw-justify-start tw-items-center tw-gap-2">
										<BsPhone className="tw-text-xl tw-shrink-0 tw-text-gray-500" />
										<p className="tw-text-sm">+233201231234</p>
									</span>
								</span>
							</div>
						</div>
					</div>
					<div className="tw-w-full tw-h-fit tw-row-start-1 tw-col-start-2 tw-row-span-2 lg:tw-row-span-1 xl:tw-col-start-3 xl:tw-row-start-1 xl:tw-row-span-2 tw-bg-gradient-to-tl tw-from-[#524380] tw-to-[#8e6abf] tw-text-white tw-shadow-sm tw-rounded-lg tw-py-5 tw-px-8 tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-5">
						<div className="tw-w-full tw-flex tw-justify-between tw-items-center">
							<h3 className="tw-font-medium tw-text-xl tw-text-white">
								Standard Plan
							</h3>
						</div>
						<div className="tw-w-full tw-flex tw-flex-col tw-space-y-2 tw-py-3 tw-border-y">
							<h2 className="tw-w-full tw-font-title tw-font-medium tw-text-base tw-text-gray-50 tw-flex tw-justify-start tw-items-end">
								Trip details
							</h2>
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-100">
									Country of Origin
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-white tw-font-bold">
									Ghana
								</p>
							</div>
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-100">
									Coverage Starts
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-white tw-font-bold">
									{format(new Date(), 'MMM dd, yyyy')}
								</p>
							</div>
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-100">
									Coverage Ends
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-white tw-font-bold">
									{format(addDays(new Date(), 30), 'MMM dd, yyyy')}
								</p>
							</div>
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-100">
									Duration
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-white tw-font-bold">
									{differenceInDays(addDays(new Date(), 30), new Date())} days
								</p>
							</div>
						</div>
						<div className="tw-w-full tw-flex tw-flex-col tw-gap-2">
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-100">
									No of Travellers
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-white tw-font-bold">
									2
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
