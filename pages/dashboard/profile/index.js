import React from 'react';
import DashboardNav from '@/components/Layout/Navigations/DashboardNav';
import { Avatar } from '@mui/material';
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi';
import { BsPhone } from 'react-icons/bs';
import { TbEdit } from 'react-icons/tb';

const Profile = () => {
	return (
		<div className="tw-w-screen tw-min-h-screen tw-bg-[#FEFBFB] tw-pt-20 tw-pl-56">
			<DashboardNav />
			<div className="tw-w-full tw-h-full tw-py-10 tw-px-12 tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-10">
				<h2 className="tw-text-3xl tw-font-semibold">Applicant Profile</h2>

				<div className="tw-w-2/3 tw-h-fit tw-bg-white tw-shadow-sm tw-rounded-lg tw-py-5 tw-px-8 tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-5">
					<div className="tw-w-full tw-flex tw-justify-between tw-items-center">
						<h3 className="tw-font-medium tw-text-xl">Profile</h3>
						<span className="tw-cursor-pointer tw-flex tw-justify-center tw-items-center tw-transition-all tw-duration-500 tw-ease-in-out tw-rounded-full tw-h-8 tw-w-8 tw-text-[#8e6abf] hover:tw-text-white hover:tw-bg-[#8e6abf] hover:tw-shadow-lg group-hover:tw-shadow-[#8e6abf]/50">
							<TbEdit className="tw-text-xl" />
						</span>
					</div>
					<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-gap-8 tw-pb-8 tw-border-b-2">
						<Avatar
							src="#"
							className="tw-uppercase"
							sx={{ width: '100px', height: '100px' }}>
							BO
						</Avatar>

						<div className="tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-3">
							<h4 className="tw-font-medium tw-text-lg">Bagna Omar</h4>
							<span className="tw-flex tw-justify-start tw-items-center tw-gap-2">
								<HiOutlineLocationMarker className="tw-text-xl tw-shrink-0 tw-text-gray-500" />
								<p className="tw-text-sm">Ghana</p>
							</span>
							<span className="tw-flex tw-justify-start tw-items-center tw-gap-8">
								<span className="tw-flex tw-justify-start tw-items-center tw-gap-2">
									<HiOutlineMail className="tw-text-xl tw-shrink-0 tw-text-gray-500" />
									<p className="tw-text-sm tw-lowercase">bagna@email.com</p>
								</span>
								<span className="tw-flex tw-justify-start tw-items-center tw-gap-2">
									<BsPhone className="tw-text-xl tw-shrink-0 tw-text-gray-500" />
									<p className="tw-text-sm">+233201231234</p>
								</span>
							</span>
						</div>
					</div>
					<div className="tw-w-full tw-flex tw-justify-end tw-items-center">
						<span className="tw-cursor-pointer tw-font-bold tw-text-sm tw-text-[#8e6abf] tw-p-2 tw-rounded-lg hover:tw-bg-[#8e6abf]/10">
							Change password
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
