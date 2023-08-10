import React from 'react';
import Link from '@/utils/ActiveLink';
import Image from 'next/image';

import logo from '@/public/images/gsti_logo.jpeg';
import { Avatar, Badge } from '@mui/material';
import { BsChevronDown } from 'react-icons/bs';
import { BiHomeAlt, BiUser } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { MdOutlineLocalHospital } from 'react-icons/md';

const DashboardNav = () => {
	const router = useRouter();

	const [menu, setMenu] = React.useState(false);
	const toggleDropdown = () => {
		setMenu((prev) => !prev);
	};

	const logOut = () => {
		//Cookies.remove('loggedin');
		router.push('/');
	};

	return (
		<div id="navbar" className="navbar-area">
			{/** Top Nav */}
			<div className="tw-fixed tw-z-40 tw-top-0 tw-w-full tw-h-20 tw-bg-white tw-border-b-2 tw-flex tw-justify-between tw-items-center tw-gap-8 tw-py-1 tw-px-5 md:tw-px-10 tw-overflow-hidden">
				<Link href="/">
					<a className="navbar-brand p-1">
						<Image
							height={50}
							width={60}
							src={logo}
							alt="site logo"
							className="rounded-2"
						/>
					</a>
				</Link>
				<div
					className="tw-transition-all tw-duration-150 tw-shrink-0 tw-ease-in tw-w-fit tw-h-fit tw-p-1 tw-cursor-pointer tw-rounded-md hover:tw-bg-slate-400/10"
					onClick={toggleDropdown}>
					<div className="tw-w-fit tw-h-full tw-flex tw-justify-center tw-items-center tw-gap-2 tw-overflow-hidden">
						<Badge
							color={'success'}
							//className={network?.online ? '' : 'animate-pulse'}
							overlap="circular"
							badgeContent=" "
							variant="dot">
							<Avatar src="#" className="tw-uppercase tw-scale-75">
								BO
							</Avatar>
						</Badge>
						<h3 className="tw-font-semibold tw-text-base tw-capitalize tw-hidden lg:tw-block">
							Bagna Omar
						</h3>
						<BsChevronDown />
					</div>
				</div>

				{menu && (
					<div
						onClick={toggleDropdown}
						className="tw-w-full tw-h-full tw-fixed tw-left-0 tw-top-0 tw-pr-10 tw-pt-16 tw-flex tw-justify-end tw-items-start">
						<div
							onClick={(e) => e.stopPropagation()}
							className="tw-bg-white tw-w-fit tw-h-fit tw-rounded-lg tw-shadow-md tw-p-3 tw-flex tw-flex-col tw-justify-start tw-items-start">
							<Link href="/dashboard/profile">
								<span className="tw-cursor-pointer tw-w-44 tw-text-sm tw-text-gray-700 tw-font-medium hover:tw-text-[#8e6abf] tw-p-2 tw-rounded-lg hover:tw-bg-[#8e6abf]/10">
									Profile
								</span>
							</Link>
							<span
								onClick={logOut}
								className="tw-cursor-pointer tw-w-44 tw-text-sm tw-text-gray-700 tw-font-medium hover:tw-text-[#8e6abf] tw-p-2 tw-rounded-lg hover:tw-bg-[#8e6abf]/10">
								Logout
							</span>
						</div>
					</div>
				)}
			</div>

			{/** Side Nav */}
			<div className="tw-h-fit lg:tw-h-full tw-fixed lg:tw-z-40 tw-bottom-0 lg:tw-top-20 tw-left-0 tw-flex lg:tw-flex-col tw-justify-center lg:tw-justify-start tw-items-center lg:tw-items-start tw-w-full lg:tw-w-fit tw-bg-white tw-border-t-2 lg:tw-border-t-0 lg:tw-border-r-2">
				<Link
					href="/dashboard"
					activeClassName="tw-bg-[#7862AF]/10 tw-text-[#7862AF]">
					<a className="tw-w-56 tw-py-4 tw-px-6 tw-flex tw-justify-start tw-items-end tw-gap-2">
						<BiHomeAlt className="tw-shrink-0 tw-text-2xl" /> Dashboard
					</a>
				</Link>

				<Link
					href="/dashboard/find-doctor"
					activeClassName="tw-bg-[#7862AF]/10 tw-text-[#7862AF]">
					<a className="tw-w-56 tw-py-4 tw-px-6 tw-flex tw-justify-start tw-items-end tw-gap-2">
						<MdOutlineLocalHospital className="tw-shrink-0 tw-text-2xl" /> Find
						a Doctor
					</a>
				</Link>
				<Link
					href="/dashboard/profile"
					activeClassName="tw-bg-[#7862AF]/10 tw-text-[#7862AF]">
					<a className="tw-w-56 tw-py-4 tw-px-6 tw-flex tw-justify-start tw-items-end tw-gap-2">
						<BiUser className="tw-shrink-0 tw-text-2xl" /> Profile
					</a>
				</Link>
			</div>
		</div>
	);
};

export default DashboardNav;
