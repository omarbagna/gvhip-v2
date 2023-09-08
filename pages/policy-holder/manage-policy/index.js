'use client';

import React, { useEffect, useState } from 'react';
import DashboardNav from '@/components/Layout/Navigations/DashboardNav';
import {
	addDays,
	differenceInDays,
	format,
	//, isEqual, parseISO
} from 'date-fns';
//import 'react-date-range/dist/styles.css'; // main style file
//import 'react-date-range/dist/theme/default.css'; // theme css file
//import { DateRange } from 'react-date-range';
import Accordion from '@/components/Accordion';
import { planTabsData } from 'data/plansData';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import {
	Backdrop,
	Checkbox,
	CircularProgress,
	FormControl,
	FormControlLabel,
	FormHelperText,
	IconButton,
	Skeleton,
	Stack,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import useAxiosAuth from 'hooks/useAxiosAuth';
import { AiOutlineFilePdf } from 'react-icons/ai';
import dayjs from 'dayjs';
import { IoAdd, IoClose } from 'react-icons/io5';
import SelectInput from '@/components/Input/SelectInput';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
//import { axiosPrivate } from 'pages/api/axios';

const ManagePolicy = () => {
	const axiosPrivate = useAxiosAuth();

	const queryClient = useQueryClient();

	const [managePolicy, setManagePolicy] = useState(false);
	const [showExtensionHistory, setShowExtensionHistory] = useState(false);
	const [extensionOptions, setExtensionOptions] = useState(null);
	const [dateStates, setDateStates] = useState(null);
	const [allExtendable, setAllExtendable] = useState(true);

	const { reset, watch, control, handleSubmit } = useForm({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			extension_type: 'all',
			confirm_extension: false,
			extension_details: [
				{
					policy_number: '',
					extension_start: '',
					extension_end: '',
				},
			],
		},
	});

	let extensionTotal = 0;

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'extension_details',
		//rules: { maxLength: 5 },
	});

	const getUserDetails = async () => {
		const response = await axiosPrivate.get('/account/dashboard');

		return response;
	};

	const userDetails = useQuery('user', getUserDetails, {
		/*
		onSuccess: (userData) => {
			if (userData?.status === 200) {
				setDateState([
					{
						startDate: new Date(
							userData?.data?.travelling_info?.user_policy_transaction[0]?.end_date
						),
						endDate: addDays(
							new Date(userData?.data?.travelling_info?.user_policy_transaction[0]?.end_date),
							30
						),
						key: 'selection',
					},
				]);
			}
		},

		onError: (error) => {
			toast.error(`${error?.response?.data?.STATUSMSG}`);
			//logout();
		},
		*/

		staleTime: 500000,
	});

	const USER_DETAILS = userDetails?.data?.data?.data
		? userDetails?.data?.data?.data
		: null;

	const getExtensionDetails = async () => {
		const response = await axiosPrivate.get('/account/extension-history');

		return response;
	};

	const extensionDetails = useQuery('extensions', getExtensionDetails, {
		enabled: showExtensionHistory,
	});

	const EXTENSION_DETAILS = extensionDetails?.data?.data?.data
		? extensionDetails?.data?.data?.data
		: null;

	useEffect(() => {
		if (USER_DETAILS) {
			let extensionOptionsValues = [
				{
					name: `${USER_DETAILS?.travelling_info?.first_name} ${USER_DETAILS?.travelling_info?.last_name}`,
					value: USER_DETAILS?.travelling_info?.policy_number,
					disabled: false,
				},
			];

			USER_DETAILS?.dependants?.map((value) => {
				return extensionOptionsValues.push({
					name: `${value.first_name} ${value.last_name}`,
					value: value.policy_number,
					disabled: false,
				});
			});

			let dates = [
				{
					policy_number: USER_DETAILS?.travelling_info?.policy_number,
					extension_start_date: USER_DETAILS?.travelling_info
						?.user_policy_transaction[0]?.extension_start_date
						? USER_DETAILS?.travelling_info?.user_policy_transaction[0]
								?.extension_start_date
						: USER_DETAILS?.travelling_info?.user_policy_transaction[0]
								?.start_date,
					extension_end_date: USER_DETAILS?.travelling_info
						?.user_policy_transaction[0]?.extension_end_date
						? USER_DETAILS?.travelling_info?.user_policy_transaction[0]
								?.extension_end_date
						: USER_DETAILS?.travelling_info?.user_policy_transaction[0]
								?.end_date,
					extension_duration: USER_DETAILS?.travelling_info
						?.user_policy_transaction[0]?.extension_duration
						? USER_DETAILS?.travelling_info?.user_policy_transaction[0]
								?.extension_duration
						: 0,
					initial_duration:
						USER_DETAILS?.travelling_info?.user_policy_transaction[0]?.duration,
				},
			];

			USER_DETAILS?.dependants?.map((value) => {
				return dates.push({
					policy_number: value.policy_number,
					extension_start_date: value?.user_policy_transaction[0]
						?.extension_start_date
						? value.user_policy_transaction[0]?.extension_start_date
						: value.user_policy_transaction[0]?.start_date,
					extension_end_date: value?.user_policy_transaction[0]
						?.extension_end_date
						? value.user_policy_transaction[0]?.extension_end_date
						: value.user_policy_transaction[0]?.end_date,
					extension_duration: value?.travelling_info?.user_policy_transaction[0]
						?.extension_duration
						? value.user_policy_transaction[0]?.extension_duration
						: 0,
					initial_duration: value?.user_policy_transaction[0]?.duration,
				});
			});

			setExtensionOptions(extensionOptionsValues);
			setDateStates(dates);
		}
	}, [USER_DETAILS]);

	useEffect(() => {
		if (dateStates) {
			let endDates = [];

			dateStates?.map((value) => {
				return endDates.push(value.extension_end_date);
			});

			const allEqual = endDates.every((val) => val === endDates[0]);

			if (!allEqual) {
				reset({
					extension_type: 'specify',
					confirm_extension: false,
					extension_details: [
						{
							policy_number: '',
							extension_start: '',
							extension_end: '',
						},
					],
				});

				setAllExtendable(allEqual);
			}
		}
	}, [dateStates, reset]);

	const submitExtendPolicy = async (data) => {
		const { data: response } = await axiosPrivate.put(
			'/account/extend-policy',
			data
		);
		return response;
	};

	const extendPolicy = useMutation(
		(extensionData) => submitExtendPolicy(extensionData),
		{
			onSuccess: (data) => {
				if (data?.status === 200) {
					//window.location.replace(data.redirect_url);
					//alert('Success', data?.message, 'success');
					queryClient.invalidateQueries({ queryKey: ['user'] });
					window.location.replace(data?.checkoutUrl);
					//makeTestPayment.mutate(testPayData);
					setManagePolicy(false);
					reset();
				} else if (data?.status !== 200) {
					toast.error('Extension Failed');
				}
			},
			onError: (error) => {
				toast.error(error?.message);
			},
		}
	);

	const submitExtensionRequest = (data) => {
		const subTotal = 0;

		const extensionData = data?.extension_details;

		const newExtensionData = [];

		const submitRequest = true;

		if (data.extension_type === 'all') {
			extensionOptions.map(({ value }) => {
				let extensionDuration =
					Number(
						differenceInDays(
							new Date(extensionData[0].extension_end),
							new Date(extensionData[0].extension_start)
						)
					) + 1;

				let extensionPrice =
					extensionDuration <= 30
						? 45
						: extensionDuration > 30 && extensionDuration <= 60
						? 90
						: extensionDuration > 60 && extensionDuration <= 90
						? 135
						: extensionDuration > 90 && extensionDuration <= 120
						? 180
						: extensionDuration > 120 && extensionDuration <= 150
						? 225
						: extensionDuration > 150 && extensionDuration <= 180 && 270;

				let totalDuration =
					Number(extensionDuration) +
					Number(dateStates[0]?.initial_duration) +
					Number(dateStates[0]?.extension_duration);

				if (totalDuration > 180) {
					submitRequest = false;
					return toast.error(
						'You can not extend your policy coverage to more than 180 days'
					);
				} else {
					subTotal += extensionPrice;

					return newExtensionData.push({
						policy_number: value,
						extension_start_date: extensionData[0].extension_start,
						extension_end_date: extensionData[0].extension_end,
						extension_duration: extensionDuration,
						extension_price: extensionPrice,
					});
				}
			});
		} else if (data.extension_type === 'specify') {
			extensionData.map((item) => {
				let extensionDuration =
					Number(
						differenceInDays(
							new Date(item.extension_end),
							new Date(item.extension_start)
						)
					) + 1;

				let extensionPrice =
					extensionDuration <= 30
						? 45
						: extensionDuration > 30 && extensionDuration <= 60
						? 90
						: extensionDuration > 60 && extensionDuration <= 90
						? 135
						: extensionDuration > 90 && extensionDuration <= 120
						? 180
						: extensionDuration > 120 && extensionDuration <= 150
						? 225
						: extensionDuration > 150 && extensionDuration <= 180 && 270;

				let totalDuration =
					Number(extensionDuration) +
					Number(
						dateStates[
							dateStates?.findIndex(
								(option) => option.policy_number === item.policy_number
							)
						]?.initial_duration
					) +
					Number(
						dateStates[
							dateStates?.findIndex(
								(option) => option.policy_number === item.policy_number
							)
						]?.extension_duration
					);

				if (totalDuration > 180) {
					submitRequest = false;
					return toast.error(
						'You can not extend your policy coverage to more than 180 days'
					);
				} else if (
					dayjs(
						addDays(
							new Date(
								dateStates[
									dateStates?.findIndex(
										(option) => option.policy_number === item.policy_number
									)
								]?.extension_end_date
							),
							1
						)
					).isSame(item.extension_start)
				) {
					subTotal += extensionPrice;

					return newExtensionData.push({
						policy_number: item.policy_number,
						extension_start_date: item.extension_start,
						extension_end_date: item.extension_end,
						extension_duration: extensionDuration,
						extension_price: extensionPrice,
					});
				} else {
					submitRequest = false;

					return toast.error(
						'Extension date must be a day after previous policy end date'
					);
				}
			});
		}

		let arrayToCheck = newExtensionData.map(
			({ policy_number }) => policy_number
		);
		let duplicateExists = false;
		// call some function with callback function as argument
		duplicateExists = arrayToCheck.some((element, index) => {
			return arrayToCheck.indexOf(element) !== index;
		});
		if (duplicateExists) {
			toast.error('Duplicate names selected. Please check and try again');
		} else {
			const finalExtensionData = {
				extension_data: newExtensionData,
				total_price: subTotal,
			};

			if (submitRequest) extendPolicy.mutate(finalExtensionData);
		}
	};

	return (
		<div className="tw-max-w-screen tw-min-h-screen tw-bg-[#FEFBFB] tw-py-20 lg:tw-pt-20 lg:tw-pl-56">
			<DashboardNav />
			<div className="tw-w-full tw-h-full tw-py-10 tw-px-6 md:tw-px-12 tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-10">
				<div className="tw-w-full tw-flex tw-justify-between tw-items-center">
					<h2 className="tw-text-2xl md:tw-text-3xl tw-font-semibold">
						Manage Policy
					</h2>
				</div>

				<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5 tw-place-content-start tw-place-items-start">
					<div className="tw-w-full tw-h-fit tw-bg-white tw-shadow-sm tw-rounded-lg tw-py-5 tw-px-8 tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-5">
						<div className="tw-w-full tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-3">
							<Accordion questionsAnswers={planTabsData} />
							<a
								href="#"
								target="_blank"
								rel="noreferrer"
								className="tw-group tw-w-full tw-flex tw-justify-start tw-items-center tw-gap-1 tw-pb-3 tw-mt-8">
								<AiOutlineFilePdf />
								<p className="tw-font-bold !tw-text-sm tw-text-[#8e6abf] hover:tw-underline">
									Plan Brochure
								</p>
							</a>
						</div>
					</div>

					{!userDetails.isLoading && USER_DETAILS && (
						<div className="tw-w-full tw-h-fit tw-row-start-1 tw-row-span-2 lg:tw-row-span-1 md:tw-col-start-2 md:tw-row-start-1 md:tw-row-span-2 tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-5">
							<div className="tw-w-full tw-h-fit tw-bg-white tw-text-[#8e6abf] tw-shadow-sm tw-rounded-lg tw-py-5 tw-px-8 tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-5">
								<div className="tw-w-full tw-flex tw-justify-between tw-items-center">
									<h3 className="tw-font-medium tw-text-xl tw-text-[#8e6abf]">
										{
											USER_DETAILS?.travelling_info?.user_policy_transaction[0]
												?.travel_plan?.plan_name
										}
									</h3>
								</div>
								<div className="tw-w-full tw-flex tw-flex-col tw-space-y-2 tw-py-3 tw-border-y">
									<h2 className="tw-w-full tw-font-title tw-font-medium tw-text-base tw-text-gray-600 tw-flex tw-justify-start tw-items-end">
										Traveller details
									</h2>
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-500">
											Country of Origin
										</div>
										<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
											{USER_DETAILS?.travelling_info?.country}
										</p>
									</div>
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-500">
											Effective Date
										</div>
										<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
											{dayjs(
												USER_DETAILS?.travelling_info
													?.user_policy_transaction[0]?.start_date
											).format('MMM DD, YYYY')}
										</p>
									</div>
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-500">
											Expiry Date
										</div>
										<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
											{dayjs(
												USER_DETAILS?.travelling_info
													?.user_policy_transaction[0]?.end_date
											).format('MMM DD, YYYY')}
										</p>
									</div>
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-500">
											Duration
										</div>
										<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
											{
												USER_DETAILS?.travelling_info
													?.user_policy_transaction[0]?.duration
											}{' '}
											days
										</p>
									</div>
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-500">
											Price
										</div>
										<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
											{Intl.NumberFormat('en-US', {
												style: 'currency',
												currency: 'USD',
											}).format(
												USER_DETAILS?.travelling_info
													?.user_policy_transaction[0]?.price
											)}
										</p>
									</div>
									{USER_DETAILS?.travelling_info?.user_policy_transaction[0]
										?.extension_start_date ? (
										<div className="tw-grid tw-grid-cols-2 tw-pt-3 tw-border-t">
											<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-500">
												Extension Starts
											</div>
											<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
												{dayjs(
													USER_DETAILS?.travelling_info
														?.user_policy_transaction[0]?.extension_start_date
												).format('MMM DD, YYYY')}
											</p>
										</div>
									) : null}

									{USER_DETAILS?.travelling_info?.user_policy_transaction[0]
										?.extension_end_date ? (
										<div className="tw-grid tw-grid-cols-2">
											<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-500">
												Extension Ends
											</div>
											<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
												{dayjs(
													USER_DETAILS?.travelling_info
														?.user_policy_transaction[0]?.extension_end_date
												).format('MMM DD, YYYY')}
											</p>
										</div>
									) : null}
									{USER_DETAILS?.travelling_info?.user_policy_transaction[0]
										?.extension_duration ? (
										<div className="tw-grid tw-grid-cols-2">
											<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-500">
												Extension Duration
											</div>
											<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
												{
													USER_DETAILS?.travelling_info
														?.user_policy_transaction[0]?.extension_duration
												}{' '}
												days
											</p>
										</div>
									) : null}
									{USER_DETAILS?.travelling_info?.user_policy_transaction[0]
										?.extension_price ? (
										<div className="tw-grid tw-grid-cols-2">
											<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-500">
												Extension Price
											</div>
											<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
												{Intl.NumberFormat('en-US', {
													style: 'currency',
													currency: 'USD',
												}).format(
													USER_DETAILS?.travelling_info
														?.user_policy_transaction[0]?.extension_price
												)}
											</p>
										</div>
									) : null}
								</div>
								<div className="tw-w-full tw-flex tw-flex-col tw-gap-2">
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-font-semibold tw-text-gray-500">
											Total Price
										</div>
										<span className="tw-w-full tw-flex tw-justify-end tw-items-end tw-gap-1 tw-text-xl tw-text-[#8e6abf] tw-font-bold">
											{Intl.NumberFormat('en-US', {
												style: 'currency',
												currency: 'USD',
											}).format(
												USER_DETAILS?.travelling_info
													?.user_policy_transaction[0]?.extension_price
													? USER_DETAILS?.travelling_info
															?.user_policy_transaction[0]?.price +
															USER_DETAILS?.travelling_info
																?.user_policy_transaction[0]?.extension_price
													: USER_DETAILS?.travelling_info
															?.user_policy_transaction[0]?.price
											)}{' '}
										</span>
									</div>
								</div>
							</div>

							<div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-gap-4">
								<span
									className="btn-style-back crimson-color tw-w-fit tw-h-fit tw-rounded-lg tw-px-4 tw-py-2 tw-flex tw-shadow-md tw-justify-center tw-items-center tw-text-base tw-cursor-pointer"
									onClick={() => setShowExtensionHistory(true)}>
									Extension History
								</span>

								{(USER_DETAILS?.travelling_info?.user_policy_transaction[0]
									?.extension_duration
									? Number(
											USER_DETAILS?.travelling_info?.user_policy_transaction[0]
												?.extension_duration
									  )
									: 0 +
									  Number(
											USER_DETAILS?.travelling_info?.user_policy_transaction[0]
												?.duration
									  )) < 180 &&
									USER_DETAILS?.travelling_info?.user_policy_transaction[0]
										?.status !== 'declined' && (
										<button
											className="btn-style-one dark-green-color"
											onClick={() => setManagePolicy(true)}
											type="button">
											Extend Policy <i className="bx bx-chevron-right"></i>
										</button>
									)}
							</div>
						</div>
					)}

					{userDetails.isLoading && (
						<div className="tw-w-full tw-h-fit tw-row-start-1 tw-row-span-2 lg:tw-row-span-1 md:tw-col-start-2 md:tw-row-start-1 md:tw-row-span-2 tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-5">
							<div className="tw-w-full tw-h-fit tw-bg-white tw-text-[#8e6abf] tw-shadow-sm tw-rounded-lg tw-py-5 tw-px-8 tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-5">
								<Stack spacing={1} sx={{ width: '100%' }}>
									<Skeleton
										variant="text"
										sx={{ fontSize: '2rem', width: '50%' }}
									/>
									<Skeleton
										variant="text"
										sx={{ fontSize: '1rem', width: '60%' }}
									/>
									<Skeleton
										variant="text"
										sx={{ fontSize: '1rem', width: '40%' }}
									/>
									<Skeleton
										variant="text"
										sx={{ fontSize: '1rem', width: '80%' }}
									/>
									<Skeleton
										variant="text"
										sx={{ fontSize: '1rem', width: '70%' }}
									/>
									<Skeleton
										variant="text"
										sx={{ fontSize: '1rem', width: '60%' }}
									/>
									<Skeleton
										variant="text"
										sx={{ fontSize: '2rem', width: '80%' }}
									/>
									<Skeleton
										variant="text"
										sx={{ fontSize: '2rem', width: '90%' }}
									/>
								</Stack>
							</div>
						</div>
					)}

					{!userDetails.isLoading && !USER_DETAILS && (
						<h2>Failed to load data. Please reload this page to try again</h2>
					)}
				</div>
			</div>

			{managePolicy && (
				<div
					onClick={() => setManagePolicy((prev) => !prev)}
					className="tw-fixed tw-top-0 tw-left-0 tw-z-[999] tw-flex tw-justify-center tw-items-center tw-w-screen tw-h-screen tw-bg-black/50">
					<div
						data-aos="zoom-in"
						data-aos-duration="600"
						onClick={(e) => e.stopPropagation()}
						className="tw-font-medium tw-text-center tw-text-lg tw-w-5/6 tw-max-h-[95vh] tw-bg-white tw-shadow-sm tw-rounded-lg tw-py-5 tw-px-8 tw-flex tw-flex-col tw-justify-start tw-items-center tw-gap-5 tw-overflow-y-auto">
						<div className="tw-w-full tw-hidden md:tw-flex tw-flex-col tw-gap-2 tw-py-3 tw-border-b-2">
							<div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-pb-2 tw-border-b-2">
								<h2 className="tw-font-medium tw-text-lg tw-text-[#7862AF]">
									Initial Policy Details
								</h2>
								<IconButton
									aria-label="close scanner"
									onClick={() => setManagePolicy(false)}>
									<IoClose className="tw-text-xl tw-text-[#8e6abf]" />
								</IconButton>
							</div>

							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-500">
									Effective Date
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
									{format(
										new Date(
											USER_DETAILS?.travelling_info?.user_policy_transaction[0]?.start_date
										),
										'MMM dd, yyyy'
									)}
								</p>
							</div>
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-500">
									Expiry Date
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
									{format(
										new Date(
											USER_DETAILS?.travelling_info?.user_policy_transaction[0]?.end_date
										),
										'MMM dd, yyyy'
									)}
								</p>
							</div>
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-500">
									Duration
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
									{
										USER_DETAILS?.travelling_info?.user_policy_transaction[0]
											?.duration
									}{' '}
									days
								</p>
							</div>
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-500">
									No of Travellers
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
									{USER_DETAILS?.dependants?.length + 1}{' '}
								</p>
							</div>
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-600">
									Price
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-900 tw-font-bold">
									{Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: 'USD',
									}).format(
										USER_DETAILS?.travelling_info?.user_policy_transaction[0]
											?.price
									)}
								</p>
							</div>
							{/*
							USER_DETAILS?.travelling_info?.user_policy_transaction[0]
								?.extension_start_date ? (
								<div className="tw-grid tw-grid-cols-2 tw-pt-3 tw-border-t">
									<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-500">
										Extension Starts
									</div>
									<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
										{format(
											new Date(
												USER_DETAILS?.travelling_info?.user_policy_transaction[0]?.extension_start_date
											),
											'MMM dd, yyyy'
										)}
									</p>
								</div>
							) : null}

							{USER_DETAILS?.travelling_info?.user_policy_transaction[0]
								?.extension_end_date ? (
								<div className="tw-grid tw-grid-cols-2">
									<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-500">
										Extension Ends
									</div>
									<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
										{format(
											new Date(
												USER_DETAILS?.travelling_info?.user_policy_transaction[0]?.extension_end_date
											),
											'MMM dd, yyyy'
										)}
									</p>
								</div>
							) : null}
							{USER_DETAILS?.travelling_info?.user_policy_transaction[0]
								?.extension_duration ? (
								<div className="tw-grid tw-grid-cols-2">
									<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-500">
										Extension Duration
									</div>
									<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
										{
											USER_DETAILS?.travelling_info?.user_policy_transaction[0]
												?.extension_duration
										}{' '}
										days
									</p>
								</div>
							) : null}
							{USER_DETAILS?.travelling_info?.user_policy_transaction[0]
								?.extension_price ? (
								<div className="tw-grid tw-grid-cols-2">
									<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-500">
										Extension Price
									</div>
									<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
										{Intl.NumberFormat('en-US', {
											style: 'currency',
											currency: 'USD',
										}).format(
											USER_DETAILS?.travelling_info?.user_policy_transaction[0]
												?.extension_price
										)}
									</p>
								</div>
							) : null
										*/}
						</div>
						<div className="tw-w-full">
							<form onSubmit={handleSubmit(submitExtensionRequest)}>
								<div className="tw-w-full tw-flex tw-flex-col tw-gap-2 ">
									<div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-border-b-2 tw-pb-3">
										<h2 className="tw-w-full tw-font-medium tw-text-lg tw-text-[#7862AF] tw-flex tw-justify-start tw-items-end tw-text-left">
											Extension Period
										</h2>

										{allExtendable && (
											<div className="tw-w-full tw-text-left md:tw-w-2/6 lg:tw-w-1/6 tw-flex tw-justify-end tw-items-center tw-gap-2">
												{USER_DETAILS?.dependants?.length > 0 ? (
													<Controller
														name={'extension_type'}
														control={control}
														defaultValue={''}
														rules={{
															required: 'Please select extension type',
															onChange: (e) => {
																reset({
																	extension_type: e.target.value,
																	confirm_extension: false,
																	extension_details: [
																		{
																			policy_number: '',
																			extension_start: '',
																			extension_end: '',
																		},
																	],
																});
															},
														}}
														render={({
															field: { ref, ...field },
															fieldState: { error, invalid },
														}) => (
															<SelectInput
																{...field}
																ref={ref}
																error={invalid}
																helpertext={invalid ? error.message : null}
																label="Extension for"
																options={[
																	{
																		name: 'all',
																		value: 'all',
																	},
																	{
																		name: 'specify',
																		value: 'specify',
																	},
																]}
																required
															/>
														)}
													/>
												) : (
													<>
														<div className="tw-w-full tw-flex tw-justify-start tw-items-end tw-text-sm tw-text-gray-600">
															Current Duration:
														</div>
														<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-900 tw-font-bold">
															{Number(
																USER_DETAILS?.travelling_info
																	?.user_policy_transaction[0]?.duration
															) +
																(USER_DETAILS?.travelling_info
																	?.user_policy_transaction[0]
																	?.extension_duration
																	? Number(
																			USER_DETAILS?.travelling_info
																				?.user_policy_transaction[0]
																				?.extension_duration
																	  )
																	: 0)}{' '}
															days
														</p>
													</>
												)}
											</div>
										)}
									</div>

									{watch('extension_type') === 'all' ? (
										<div className="tw-w-full tw-h-fit tw-flex tw-flex-col xl:tw-flex-row tw-justify-center tw-items-center lg:tw-items-end xl:tw-items-center tw-gap-4 tw-px-2 tw-py-3 tw-border-b-2">
											<div className="tw-w-full xl:tw-w-2/3 tw-flex tw-justify-center lg:tw-justify-start tw-items-center tw-gap-2 tw-shrink-0">
												<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-3">
													<Controller
														name={`extension_details[0].extension_start`}
														control={control}
														defaultValue={addDays(
															new Date(dateStates[0]?.extension_end_date),
															1
														)}
														rules={{
															required: 'Date is required.',
														}}
														render={({
															field: { value, onChange, ref, ...field },
															fieldState: { error, invalid },
														}) => (
															<FormControl error={invalid}>
																<LocalizationProvider
																	dateAdapter={AdapterDateFns}>
																	<DatePicker
																		{...field}
																		ref={ref}
																		minDate={addDays(
																			new Date(
																				dateStates[0]?.extension_end_date
																			),
																			1
																		)}
																		maxDate={addDays(
																			new Date(
																				dateStates[0]?.extension_end_date
																			),
																			1
																		)}
																		value={new Date(value)}
																		onChange={(value) => {
																			if (value !== null) {
																				onChange(
																					dayjs(value).format('YYYY-MM-DD')
																				);
																			} else {
																				onChange('');
																			}
																		}}
																		label="Extension start"
																		format="dd/MM/yyyy"
																	/>
																</LocalizationProvider>
																<FormHelperText>
																	{invalid ? error.message : null}
																</FormHelperText>
															</FormControl>
														)}
													/>
													<Controller
														name={`extension_details[0].extension_end`}
														control={control}
														defaultValue={addDays(
															new Date(dateStates[0]?.extension_end_date),
															29
														)}
														rules={{ required: 'Date is required.' }}
														render={({
															field: { value, onChange, ref, ...field },
															fieldState: { error, invalid },
														}) => (
															<FormControl error={invalid}>
																<LocalizationProvider
																	dateAdapter={AdapterDateFns}>
																	<DatePicker
																		{...field}
																		ref={ref}
																		minDate={
																			watch(
																				`extension_details[0].extension_start`
																			)
																				? new Date(
																						watch(
																							`extension_details[0].extension_start`
																						)
																				  )
																				: new Date()
																		}
																		maxDate={addDays(
																			new Date(
																				watch(
																					`extension_details[0].extension_start`
																				)
																			),
																			179
																		)}
																		value={new Date(value)}
																		onChange={(value) => {
																			if (value !== null) {
																				onChange(
																					dayjs(value).format('YYYY-MM-DD')
																				);
																			} else {
																				onChange('');
																			}
																		}}
																		label="Extension end"
																		format="dd/MM/yyyy"
																		disabled={
																			watch(
																				`extension_details[0].extension_start`
																			)
																				? false
																				: true
																		}
																	/>
																</LocalizationProvider>
																<FormHelperText>
																	{invalid ? error.message : null}
																</FormHelperText>
															</FormControl>
														)}
													/>
												</div>
											</div>
											<div className="tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center lg:tw-ml-10">
												{watch('extension_details[0].extension_end') &&
												watch('extension_details[0].extension_start') ? (
													<>
														<div className="tw-grid tw-grid-cols-2 tw-w-full tw-pb-1">
															<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600">
																Duration
															</div>
															<p className="tw-w-full tw-flex tw-justify-end tw-text-base tw-text-[#7862AF] tw-font-bold">
																{differenceInDays(
																	new Date(
																		watch('extension_details[0].extension_end')
																	),
																	new Date(
																		watch(
																			'extension_details[0].extension_start'
																		)
																	)
																) + 1}{' '}
																day(s)
															</p>
														</div>
														<div className="tw-grid tw-grid-cols-2 tw-w-full tw-pb-1">
															<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600">
																Price
															</div>
															<p className="tw-w-full tw-flex tw-justify-end tw-items-end tw-gap-1 tw-text-base tw-text-[#7862AF] tw-font-bold">
																{Intl.NumberFormat('en-US', {
																	style: 'currency',
																	currency: 'USD',
																}).format(
																	Number(
																		differenceInDays(
																			new Date(
																				watch(
																					'extension_details[0].extension_end'
																				)
																			),
																			new Date(
																				watch(
																					'extension_details[0].extension_start'
																				)
																			)
																		) + 1
																	) <= 30
																		? 45
																		: Number(
																				differenceInDays(
																					new Date(
																						watch(
																							'extension_details[0].extension_end'
																						)
																					),
																					new Date(
																						watch(
																							'extension_details[0].extension_start'
																						)
																					)
																				) + 1
																		  ) > 30 &&
																		  Number(
																				differenceInDays(
																					new Date(
																						watch(
																							'extension_details[0].extension_end'
																						)
																					),
																					new Date(
																						watch(
																							'extension_details[0].extension_start'
																						)
																					)
																				) + 1
																		  ) <= 60
																		? 90
																		: Number(
																				differenceInDays(
																					new Date(
																						watch(
																							'extension_details[0].extension_end'
																						)
																					),
																					new Date(
																						watch(
																							'extension_details[0].extension_start'
																						)
																					)
																				) + 1
																		  ) > 60 &&
																		  Number(
																				differenceInDays(
																					new Date(
																						watch(
																							'extension_details[0].extension_end'
																						)
																					),
																					new Date(
																						watch(
																							'extension_details[0].extension_start'
																						)
																					)
																				) + 1
																		  ) <= 90
																		? 135
																		: Number(
																				differenceInDays(
																					new Date(
																						watch(
																							'extension_details[0].extension_end'
																						)
																					),
																					new Date(
																						watch(
																							'extension_details[0].extension_start'
																						)
																					)
																				) + 1
																		  ) > 90 &&
																		  Number(
																				differenceInDays(
																					new Date(
																						watch(
																							'extension_details[0].extension_end'
																						)
																					),
																					new Date(
																						watch(
																							'extension_details[0].extension_start'
																						)
																					)
																				) + 1
																		  ) <= 120
																		? 180
																		: Number(
																				differenceInDays(
																					new Date(
																						watch(
																							'extension_details[0].extension_end'
																						)
																					),
																					new Date(
																						watch(
																							'extension_details[0].extension_start'
																						)
																					)
																				) + 1
																		  ) > 120 &&
																		  Number(
																				differenceInDays(
																					new Date(
																						watch(
																							'extension_details[0].extension_end'
																						)
																					),
																					new Date(
																						watch(
																							'extension_details[0].extension_start'
																						)
																					)
																				) + 1
																		  ) <= 150
																		? 225
																		: Number(
																				differenceInDays(
																					new Date(
																						watch(
																							'extension_details[0].extension_end'
																						)
																					),
																					new Date(
																						watch(
																							'extension_details[0].extension_start'
																						)
																					)
																				) + 1
																		  ) > 150 &&
																		  Number(
																				differenceInDays(
																					new Date(
																						watch(
																							'extension_details[0].extension_end'
																						)
																					),
																					new Date(
																						watch(
																							'extension_details[0].extension_start'
																						)
																					)
																				) + 1
																		  ) <= 180 &&
																		  270
																)}{' '}
																<em className="tw-font-light tw-text-xs">
																	/person
																</em>
															</p>
														</div>
														<div className="tw-grid tw-grid-cols-2 tw-w-full tw-pb-1">
															<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600">
																Total
															</div>
															<p className="tw-w-full tw-flex tw-justify-end tw-items-end tw-gap-1 tw-text-base tw-text-[#7862AF] tw-font-bold">
																{Intl.NumberFormat('en-US', {
																	style: 'currency',
																	currency: 'USD',
																}).format(
																	(Number(
																		differenceInDays(
																			new Date(
																				watch(
																					'extension_details[0].extension_end'
																				)
																			),
																			new Date(
																				watch(
																					'extension_details[0].extension_start'
																				)
																			)
																		) + 1
																	) <= 30
																		? 45
																		: Number(
																				differenceInDays(
																					new Date(
																						watch(
																							'extension_details[0].extension_end'
																						)
																					),
																					new Date(
																						watch(
																							'extension_details[0].extension_start'
																						)
																					)
																				) + 1
																		  ) > 30 &&
																		  Number(
																				differenceInDays(
																					new Date(
																						watch(
																							'extension_details[0].extension_end'
																						)
																					),
																					new Date(
																						watch(
																							'extension_details[0].extension_start'
																						)
																					)
																				) + 1
																		  ) <= 60
																		? 90
																		: Number(
																				differenceInDays(
																					new Date(
																						watch(
																							'extension_details[0].extension_end'
																						)
																					),
																					new Date(
																						watch(
																							'extension_details[0].extension_start'
																						)
																					)
																				) + 1
																		  ) > 60 &&
																		  Number(
																				differenceInDays(
																					new Date(
																						watch(
																							'extension_details[0].extension_end'
																						)
																					),
																					new Date(
																						watch(
																							'extension_details[0].extension_start'
																						)
																					)
																				) + 1
																		  ) <= 90
																		? 135
																		: Number(
																				differenceInDays(
																					new Date(
																						watch(
																							'extension_details[0].extension_end'
																						)
																					),
																					new Date(
																						watch(
																							'extension_details[0].extension_start'
																						)
																					)
																				) + 1
																		  ) > 90 &&
																		  Number(
																				differenceInDays(
																					new Date(
																						watch(
																							'extension_details[0].extension_end'
																						)
																					),
																					new Date(
																						watch(
																							'extension_details[0].extension_start'
																						)
																					)
																				) + 1
																		  ) <= 120
																		? 180
																		: Number(
																				differenceInDays(
																					new Date(
																						watch(
																							'extension_details[0].extension_end'
																						)
																					),
																					new Date(
																						watch(
																							'extension_details[0].extension_start'
																						)
																					)
																				) + 1
																		  ) > 120 &&
																		  Number(
																				differenceInDays(
																					new Date(
																						watch(
																							'extension_details[0].extension_end'
																						)
																					),
																					new Date(
																						watch(
																							'extension_details[0].extension_start'
																						)
																					)
																				) + 1
																		  ) <= 150
																		? 225
																		: Number(
																				differenceInDays(
																					new Date(
																						watch(
																							'extension_details[0].extension_end'
																						)
																					),
																					new Date(
																						watch(
																							'extension_details[0].extension_start'
																						)
																					)
																				) + 1
																		  ) > 150 &&
																		  Number(
																				differenceInDays(
																					new Date(
																						watch(
																							'extension_details[0].extension_end'
																						)
																					),
																					new Date(
																						watch(
																							'extension_details[0].extension_start'
																						)
																					)
																				) + 1
																		  ) <= 180 &&
																		  270) *
																		(USER_DETAILS?.dependants?.length + 1)
																)}{' '}
															</p>
														</div>
														{/**
														<div className="tw-grid tw-grid-cols-2 tw-w-full tw-pb-1">
															<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600">
																Total Duration
															</div>
															<p className="tw-w-full tw-flex tw-justify-end tw-text-base tw-text-[#7862AF] tw-font-bold">
																{Number(
																	differenceInDays(
																		new Date(
																			watch(
																				'extension_details[0].extension_end'
																			)
																		),
																		new Date(
																			watch(
																				'extension_details[0].extension_start'
																			)
																		)
																	) + 1
																) +
																	Number(dateStates[0]?.extension_duration) +
																	(USER_DETAILS?.travelling_info
																		?.user_policy_transaction[0]
																		?.extension_duration
																		? Number(
																				USER_DETAILS?.travelling_info
																					?.user_policy_transaction[0]?.duration
																		  )
																		: 0)}{' '}
																days
															</p>
														</div>
														 */}
													</>
												) : (
													<p className="tw-w-full tw-flex tw-justify-end tw-text-base tw-text-[#7862AF] tw-font-medium">
														Select start and end dates
													</p>
												)}
											</div>
										</div>
									) : (
										<>
											{fields.map((inputField, index) => {
												let extensionDuration =
													differenceInDays(
														new Date(
															watch(`extension_details[${index}].extension_end`)
														),
														new Date(
															watch(
																`extension_details[${index}].extension_start`
															)
														)
													) + 1;

												return (
													<div
														key={index}
														className="tw-w-full tw-flex tw-flex-col-reverse lg:tw-flex-row tw-justify-start tw-items-center md:tw-items-start xl:tw-items-center tw-gap-3 tw-border-b-2">
														{watch('extension_details')?.length > 1 ? (
															<>
																<div
																	onClick={() => {
																		let newOptions = [...extensionOptions];

																		newOptions[index].disabled = false;

																		setExtensionOptions(newOptions);

																		remove(index);
																	}}
																	className={`tw-cursor-pointer tw-hidden lg:tw-flex tw-justify-center tw-items-center ${
																		watch(
																			`extension_details[${index}].policy_number`
																		)
																			? 'lg:tw-mt-14 xl:tw-mt-8'
																			: 'lg:tw-mt-5 xl:tw-mt-5'
																	} tw-transition-all tw-duration-500 tw-ease-in-out tw-rounded-full tw-h-10 tw-w-10 tw-text-red-500 hover:tw-text-white tw-bg-transparent hover:tw-shadow-lg hover:tw-shadow-red-400/50 hover:tw-bg-red-500 cursor-pointer`}>
																	<MdDelete className="tw-text-2xl" />
																</div>

																<span
																	className="btn-style-back red-light-color lg:tw-hidden tw-w-full tw-h-fit tw-rounded-lg tw-px-4 tw-py-2 tw-flex tw-shadow-md tw-justify-center tw-items-center tw-text-base tw-cursor-pointer tw-mb-4"
																	onClick={() => {
																		let newOptions = [...extensionOptions];

																		newOptions[index].disabled = false;

																		setExtensionOptions(newOptions);

																		remove(index);
																	}}>
																	Delete
																</span>
															</>
														) : null}
														<div
															key={inputField.id}
															className="tw-w-full tw-h-fit tw-flex tw-flex-col xl:tw-flex-row tw-justify-center tw-items-center lg:tw-items-end xl:tw-items-center tw-gap-4 tw-px-2 tw-py-3">
															<div className="tw-w-full xl:tw-w-2/3 tw-flex tw-justify-center lg:tw-justify-start tw-items-center tw-gap-2 tw-shrink-0">
																<div className="tw-w-full tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-3 tw-place-items-end">
																	<div className="tw-w-full tw-text-left">
																		<Controller
																			name={`extension_details[${index}].policy_number`}
																			control={control}
																			defaultValue={''}
																			rules={{
																				required: 'Please select name',
																			}}
																			render={({
																				field: { ref, ...field },
																				fieldState: { error, invalid },
																			}) => (
																				<SelectInput
																					{...field}
																					ref={ref}
																					error={invalid}
																					helpertext={
																						invalid ? error.message : null
																					}
																					label="Name"
																					options={extensionOptions}
																					required
																				/>
																			)}
																		/>
																	</div>

																	<div className="tw-w-full tw-flex tw-flex-col tw-gap-4 tw-justify-start tw-items-start">
																		{watch(
																			`extension_details[${index}].policy_number`
																		) ? (
																			<span className="tw-w-full tw-flex tw-justify-center tw-items-end tw-gap-2">
																				<span className="tw-text-xs tw-text-gray-500 tw-font-normal">
																					Policy ends:
																				</span>
																				<p className="tw-text-sm tw-text-gray-700 tw-font-medium">
																					{dayjs(
																						dateStates[
																							dateStates?.findIndex(
																								(option) =>
																									option.policy_number ===
																									watch(
																										`extension_details[${index}].policy_number`
																									)
																							)
																						]?.extension_end_date
																							? dateStates[
																									dateStates?.findIndex(
																										(option) =>
																											option.policy_number ===
																											watch(
																												`extension_details[${index}].policy_number`
																											)
																									)
																							  ]?.extension_end_date
																							: dateStates[
																									dateStates?.findIndex(
																										(option) =>
																											option.policy_number ===
																											watch(
																												`extension_details[${index}].policy_number`
																											)
																									)
																							  ]?.end_date
																					).format('MMM DD, YYYY')}
																				</p>
																			</span>
																		) : null}

																		<Controller
																			name={`extension_details[${index}].extension_start`}
																			control={control}
																			defaultValue={addDays(
																				new Date(
																					dateStates[
																						dateStates?.findIndex(
																							(option) =>
																								option.policy_number ===
																								watch(
																									`extension_details[${index}].policy_number`
																								)
																						)
																					]?.extension_end_date
																						? dateStates[
																								dateStates?.findIndex(
																									(option) =>
																										option.policy_number ===
																										watch(
																											`extension_details[${index}].policy_number`
																										)
																								)
																						  ]?.extension_end_date
																						: dateStates[
																								dateStates?.findIndex(
																									(option) =>
																										option.policy_number ===
																										watch(
																											`extension_details[${index}].policy_number`
																										)
																								)
																						  ]?.end_date
																				),
																				1
																			)}
																			rules={{
																				required: 'Date is required.',
																			}}
																			render={({
																				field: {
																					value,
																					onChange,
																					ref,
																					...field
																				},
																				fieldState: { error, invalid },
																			}) => (
																				<FormControl error={invalid} fullWidth>
																					<LocalizationProvider
																						dateAdapter={AdapterDateFns}>
																						<DatePicker
																							{...field}
																							ref={ref}
																							minDate={addDays(
																								new Date(
																									dateStates[
																										dateStates?.findIndex(
																											(option) =>
																												option.policy_number ===
																												watch(
																													`extension_details[${index}].policy_number`
																												)
																										)
																									]?.extension_end_date
																										? dateStates[
																												dateStates?.findIndex(
																													(option) =>
																														option.policy_number ===
																														watch(
																															`extension_details[${index}].policy_number`
																														)
																												)
																										  ]?.extension_end_date
																										: dateStates[
																												dateStates?.findIndex(
																													(option) =>
																														option.policy_number ===
																														watch(
																															`extension_details[${index}].policy_number`
																														)
																												)
																										  ]?.end_date
																								),
																								1
																							)}
																							maxDate={addDays(
																								new Date(
																									dateStates[
																										dateStates?.findIndex(
																											(option) =>
																												option.policy_number ===
																												watch(
																													`extension_details[${index}].policy_number`
																												)
																										)
																									]?.extension_end_date
																										? dateStates[
																												dateStates?.findIndex(
																													(option) =>
																														option.policy_number ===
																														watch(
																															`extension_details[${index}].policy_number`
																														)
																												)
																										  ]?.extension_end_date
																										: dateStates[
																												dateStates?.findIndex(
																													(option) =>
																														option.policy_number ===
																														watch(
																															`extension_details[${index}].policy_number`
																														)
																												)
																										  ]?.end_date
																								),
																								1
																							)}
																							value={new Date(value)}
																							onChange={(value) => {
																								if (value !== null) {
																									onChange(
																										dayjs(value).format(
																											'YYYY-MM-DD'
																										)
																									);
																								} else {
																									onChange('');
																								}
																							}}
																							label="Extension start"
																							format="dd/MM/yyyy"
																							disabled={
																								watch(
																									`extension_details[${index}].policy_number`
																								)
																									? false
																									: true
																							}
																						/>
																					</LocalizationProvider>
																					<FormHelperText>
																						{invalid ? error.message : null}
																					</FormHelperText>
																				</FormControl>
																			)}
																		/>
																	</div>

																	<Controller
																		name={`extension_details[${index}].extension_end`}
																		control={control}
																		defaultValue={addDays(
																			new Date(
																				watch(
																					`extension_details[${index}].extension_start`
																				)
																			),
																			29
																		)}
																		rules={{ required: 'Date is required.' }}
																		render={({
																			field: { value, onChange, ref, ...field },
																			fieldState: { error, invalid },
																		}) => (
																			<FormControl error={invalid} fullWidth>
																				<LocalizationProvider
																					dateAdapter={AdapterDateFns}>
																					<DatePicker
																						{...field}
																						ref={ref}
																						minDate={
																							watch(
																								`extension_details[${index}].extension_start`
																							)
																								? new Date(
																										watch(
																											`extension_details[${index}].extension_start`
																										)
																								  )
																								: new Date()
																						}
																						maxDate={addDays(
																							new Date(
																								watch(
																									`extension_details[${index}].extension_start`
																								)
																							),
																							179
																						)}
																						value={new Date(value)}
																						onChange={(value) => {
																							if (value !== null) {
																								onChange(
																									dayjs(value).format(
																										'YYYY-MM-DD'
																									)
																								);
																							} else {
																								onChange('');
																							}
																						}}
																						label="Extension end"
																						format="dd/MM/yyyy"
																						disabled={
																							watch(
																								`extension_details[${index}].extension_start`
																							) &&
																							watch(
																								`extension_details[${index}].policy_number`
																							)
																								? false
																								: true
																						}
																					/>
																				</LocalizationProvider>
																				<FormHelperText>
																					{invalid ? error.message : null}
																				</FormHelperText>
																			</FormControl>
																		)}
																	/>
																</div>
															</div>
															<div className="tw-w-full lg:tw-w-2/3 xl:tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center ">
																{extensionDuration ? (
																	<>
																		<div className="tw-grid tw-grid-cols-2 tw-w-full tw-pb-1">
																			<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600">
																				Duration
																			</div>
																			<p className="tw-w-full tw-flex tw-justify-end tw-text-base tw-text-[#7862AF] tw-font-bold">
																				{extensionDuration} day(s)
																			</p>
																		</div>
																		<div className="tw-grid tw-grid-cols-2 tw-w-full tw-pb-1">
																			<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600">
																				Price
																			</div>
																			<p className="tw-w-full tw-flex tw-justify-end tw-text-base tw-text-[#7862AF] tw-font-bold">
																				{extensionDuration &&
																					Intl.NumberFormat('en-US', {
																						style: 'currency',
																						currency: 'USD',
																					}).format(
																						extensionDuration <= 30
																							? 45
																							: extensionDuration > 30 &&
																							  extensionDuration <= 60
																							? 90
																							: extensionDuration > 60 &&
																							  extensionDuration <= 90
																							? 135
																							: extensionDuration > 90 &&
																							  extensionDuration <= 120
																							? 180
																							: extensionDuration > 120 &&
																							  extensionDuration <= 150
																							? 225
																							: extensionDuration > 150 &&
																							  extensionDuration <= 180 &&
																							  270
																					)}{' '}
																			</p>
																		</div>
																		<div className="tw-grid tw-grid-cols-2 tw-w-full tw-pb-1">
																			<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600">
																				Total Duration
																			</div>
																			<p
																				className={`tw-w-full tw-flex tw-justify-end tw-text-base ${
																					Number(extensionDuration) +
																						Number(
																							dateStates[
																								dateStates?.findIndex(
																									(option) =>
																										option.policy_number ===
																										watch(
																											`extension_details[${index}].policy_number`
																										)
																								)
																							]?.initial_duration
																						) +
																						Number(
																							dateStates[
																								dateStates?.findIndex(
																									(option) =>
																										option.policy_number ===
																										watch(
																											`extension_details[${index}].policy_number`
																										)
																								)
																							]?.extension_duration
																						) >
																					180
																						? 'tw-text-red-500'
																						: 'tw-text-green-500'
																				}  tw-font-bold`}>
																				{Number(extensionDuration) +
																					Number(
																						dateStates[
																							dateStates?.findIndex(
																								(option) =>
																									option.policy_number ===
																									watch(
																										`extension_details[${index}].policy_number`
																									)
																							)
																						]?.initial_duration
																					) +
																					Number(
																						dateStates[
																							dateStates?.findIndex(
																								(option) =>
																									option.policy_number ===
																									watch(
																										`extension_details[${index}].policy_number`
																									)
																							)
																						]?.extension_duration
																					)}{' '}
																				days
																			</p>
																		</div>
																	</>
																) : (
																	<p className="tw-w-full tw-flex tw-justify-end tw-text-base tw-text-[#7862AF] tw-font-medium">
																		Select start and end dates
																	</p>
																)}
															</div>
														</div>
													</div>
												);
											})}

											{watch('extension_details')?.length !==
											extensionOptions?.length ? (
												<div className="tw-w-full tw-flex tw-justify-start tw-items-start tw-mb-5">
													<div>
														<div
															onClick={() =>
																append({
																	policy_number: '',
																	extension_start: '',
																	extension_end: '',
																})
															}
															className="tw-group tw-cursor-pointer tw-w-fit tw-flex tw-justify-start tw-items-center tw-gap-2">
															<div className="tw-flex tw-justify-center tw-items-center tw-transition-all tw-duration-500 tw-ease-in-out tw-rounded-full tw-h-6 tw-w-6 tw-text-white tw-bg-[#8e6abf] group-hover:tw-shadow-lg group-hover:tw-shadow-[#8e6abf]/50">
																<IoAdd className="tw-text-base" />
															</div>
															<p className="tw-font-bold tw-text-sm tw-text-[#8e6abf]">
																Add another
															</p>
														</div>
													</div>
												</div>
											) : null}
										</>
									)}

									<div className="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-5 ">
										{watch('extension_details')?.map((traveller, index) => {
											let extensionDuration =
												differenceInDays(
													new Date(
														watch(`extension_details[${index}].extension_end`)
													),
													new Date(
														watch(`extension_details[${index}].extension_start`)
													)
												) + 1;

											const price =
												extensionDuration <= 30
													? 45
													: extensionDuration > 30 && extensionDuration <= 60
													? 90
													: extensionDuration > 60 && extensionDuration <= 90
													? 135
													: extensionDuration > 90 && extensionDuration <= 120
													? 180
													: extensionDuration > 120 && extensionDuration <= 150
													? 225
													: extensionDuration > 150 &&
													  extensionDuration <= 180 &&
													  270;

											extensionTotal +=
												price *
												(watch('extension_type') === 'all'
													? USER_DETAILS?.dependants?.length + 1
													: 1);
										})}

										<div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-gap-5 tw-py-2 tw-border-b-2">
											<span className="tw-capitalize tw-font-normal tw-text-lg tw-text-[#171e41]">
												Sub Total
											</span>

											<h2 className="tw-font-medium tw-text-xl tw-text-[#7862AF] tw-flex tw-justify-center tw-items-end tw-gap-1">
												{Intl.NumberFormat('en-US', {
													style: 'currency',
													currency: 'USD',
												}).format(extensionTotal)}
											</h2>
										</div>
									</div>

									<div className="tw-w-full tw-flex tw-flex-col tw-justify-start tw-items-start tw-text-left">
										<Controller
											control={control}
											name={'confirm_extension'}
											defaultValue={false}
											rules={{
												required: 'Please confirm before continuing',
											}}
											render={({
												field: { ref, ...field },
												fieldState: { error, invalid },
											}) => (
												<>
													<FormControlLabel
														control={
															<Checkbox
																{...field}
																ref={ref}
																color="secondary"
																checked={watch(`confirm_extension`)}
															/>
														}
														label={`Confirm policy extension for ${
															watch('extension_type') === 'all'
																? USER_DETAILS?.dependants?.length + 1
																: watch('extension_details')?.length
														} traveller(s) for ${Intl.NumberFormat('en-US', {
															style: 'currency',
															currency: 'USD',
														}).format(extensionTotal)}`}
													/>
													<FormHelperText error>
														{invalid ? error.message : null}
													</FormHelperText>
												</>
											)}
										/>
									</div>

									<div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-border-t-2 tw-pt-4">
										<span
											className="btn-style-back red-light-color tw-w-fit tw-h-fit tw-rounded-lg tw-px-4 tw-py-2 tw-flex tw-shadow-md tw-justify-center tw-items-center tw-text-base tw-cursor-pointer"
											onClick={() => setManagePolicy(false)}>
											Cancel
										</span>
										<button
											className="btn-style-one dark-green-color"
											type="submit">
											Extend <i className="bx bx-chevron-right"></i>
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}

			{showExtensionHistory && (
				<div
					onClick={() => setShowExtensionHistory((prev) => !prev)}
					className="tw-fixed tw-top-0 tw-left-0 tw-z-[999] tw-flex tw-justify-center tw-items-center tw-w-screen tw-h-screen tw-bg-black/50">
					<div
						data-aos="zoom-in"
						data-aos-duration="600"
						onClick={(e) => e.stopPropagation()}
						className="tw-font-medium tw-text-center tw-text-lg tw-w-5/6 tw-h-5/6 tw-bg-white tw-shadow-sm tw-rounded-lg tw-py-5 tw-px-4 md:tw-px-8 tw-flex tw-flex-col tw-justify-start tw-items-center tw-gap-5 tw-overflow-y-auto">
						<div className="tw-w-full tw-flex tw-flex-col tw-gap-2 tw-pb-3">
							<div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-pb-2 tw-my-5 tw-border-b-2">
								<h2 className="tw-font-medium tw-text-2xl tw-text-[#7862AF]">
									Extension History
								</h2>
								<IconButton
									aria-label="close modal"
									onClick={() => setShowExtensionHistory(false)}>
									<IoClose className="tw-text-xl tw-text-[#8e6abf]" />
								</IconButton>
							</div>
							{!extensionDetails.isLoading && EXTENSION_DETAILS?.length > 0 && (
								<div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 xl:tw-grid-cols-3 tw-gap-4">
									{EXTENSION_DETAILS?.map((extensionData, index) => (
										<div
											key={index}
											className="tw-transition-all tw-duration-300 tw-ease-in-out tw-w-full tw-h-fit tw-bg-white tw-text-[#8e6abf] tw-border-2 tw-shadow-md tw-shadow-[#6c14e8]/10 hover:tw-shadow-lg hover:tw-shadow-[#6c14e8]/30 tw-rounded-lg tw-py-5 tw-px-4 tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-5">
											<div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-border-b-2 tw-pb-2">
												<h3 className="tw-font-medium tw-text-lg tw-text-[#8e6abf]">
													{extensionData?.extended_for} (
													{extensionData?.relationship_type
														? extensionData?.relationship_type
														: 'Primary'}
													)
												</h3>
											</div>

											<div className="tw-w-full tw-flex tw-flex-col tw-gap-2 tw-pbz-3">
												<h2 className="tw-w-full tw-font-title tw-font-medium tw-text-base tw-text-gray-600 tw-flex tw-justify-start tw-items-end">
													Extension details
												</h2>

												<div className="tw-grid tw-grid-cols-2">
													<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-500">
														Extended By
													</div>
													<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
														{extensionData?.extended_by}
													</p>
												</div>

												<div className="tw-grid tw-grid-cols-2">
													<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-500">
														Extension Starts
													</div>
													<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
														{dayjs(extensionData?.extension_start_date).format(
															'MMM DD, YYYY'
														)}
													</p>
												</div>

												<div className="tw-grid tw-grid-cols-2">
													<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-500">
														Extension Ends
													</div>
													<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
														{dayjs(extensionData?.extension_end_date).format(
															'MMM DD, YYYY'
														)}
													</p>
												</div>

												<div className="tw-grid tw-grid-cols-2">
													<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-500">
														Extension Duration
													</div>
													<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
														{extensionData?.extension_duration} days
													</p>
												</div>

												<div className="tw-grid tw-grid-cols-2">
													<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-500">
														Extension Price
													</div>
													<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
														{Intl.NumberFormat('en-US', {
															style: 'currency',
															currency: 'USD',
														}).format(extensionData?.extension_price)}
													</p>
												</div>

												<div className="tw-w-full tw-flex tw-justify-center tw-border-t-2 tw-pt-3 tw-mt-2">
													<span className="tw-w-fit tw-h-fit tw-p-2 tw-flex tw-gap-2 tw-justify-center tw-items-end tw-rounded-md tw-bg-gradient-to-tr tw-from-[#874cda] tw-to-[#8e6abf]">
														<span className="tw-text-xs tw-text-gray-100 tw-font-normal">
															Updated:
														</span>
														<p className="tw-text-xs tw-text-gray-50 tw-font-semibold">
															{dayjs(
																extensionData?.extension_status_update_date
															).format('MMM DD, YYYY')}{' '}
															at{' '}
															{dayjs(
																extensionData?.extension_status_update_date
															).format('hh:mm a')}
														</p>
													</span>
												</div>
											</div>
										</div>
									))}
								</div>
							)}

							{extensionDetails.isLoading && (
								<div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 xl:tw-grid-cols-3">
									<div className="tw-transition-all tw-duration-300 tw-ease-in-out tw-w-full tw-h-fit tw-bg-white tw-text-[#8e6abf] tw-border-2 tw-shadow-md tw-shadow-[#6c14e8]/10 hover:tw-shadow-lg hover:tw-shadow-[#6c14e8]/30 tw-rounded-lg tw-py-5 tw-px-4 tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-5">
										<Stack spacing={1} sx={{ width: '100%' }}>
											<Skeleton
												variant="text"
												sx={{ fontSize: '2rem', width: '50%' }}
											/>
											<Skeleton
												variant="text"
												sx={{ fontSize: '1rem', width: '60%' }}
											/>
											<Skeleton
												variant="text"
												sx={{ fontSize: '1rem', width: '40%' }}
											/>
											<Skeleton
												variant="text"
												sx={{ fontSize: '1rem', width: '80%' }}
											/>
											<Skeleton
												variant="text"
												sx={{ fontSize: '1rem', width: '70%' }}
											/>
											<Skeleton
												variant="text"
												sx={{ fontSize: '1rem', width: '60%' }}
											/>
										</Stack>
									</div>
								</div>
							)}
							{!extensionDetails.isLoading &&
								JSON.stringify(EXTENSION_DETAILS) === '[]' && (
									<h2>No extension data available</h2>
								)}
						</div>
					</div>
				</div>
			)}

			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={extendPolicy.isLoading}>
				<div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-5">
					<CircularProgress color="inherit" />
					<p className="tw-text-white tw-font-medium tw-text-center tw-text-lg tw-w-2/3">
						Extending current policy, please wait to be redirected
					</p>
				</div>
			</Backdrop>
		</div>
	);
};

export default ManagePolicy;
