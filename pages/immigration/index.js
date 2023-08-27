'use client';

import React, { useState } from 'react';
import DashboardNav from '@/components/Layout/Navigations/DashboardNav';
import { format } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';
import SelectInput from '@/components/Input/SelectInput';
import DefaultInput from '@/components/Input/DefaultInput';
import { BsQrCode } from 'react-icons/bs';
import { useMutation } from 'react-query';
//import { axiosPrivate } from 'pages/api/axios';
import { Backdrop, CircularProgress, Skeleton, Stack } from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useAxiosAuth from 'hooks/useAxiosAuth';
const MySwal = withReactContent(Swal);

const alert = (title = null, text = null, icon = null) => {
	MySwal.fire({
		title: title,
		text: text,
		icon: icon,
		timer: 8000,
		timerProgressBar: true,
		showConfirmButton: false,
	});
};

const FindPolicy = () => {
	const axiosPrivate = useAxiosAuth();

	const [declinePolicyModal, setDeclinePolicyModal] = useState(false);
	const [policyHolder, setPolicyHolder] = useState(null);
	const [notFound, setNotFound] = useState(false);

	const { reset, control, handleSubmit } = useForm({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			search_term: '',
			search_type: 'policy_no',
		},
	});

	const {
		watch: watchDecline,
		reset: declineReset,
		control: declineControl,
		handleSubmit: handleDeclineSubmit,
	} = useForm({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			reason: '',
			desc: '',
		},
	});

	const searchPolicy = async (data) => {
		const { data: response } = await axiosPrivate.get(
			`/admin/search-user?search_type=${data?.search_type}&search_term=${data?.search_term}`
		);
		return response;
	};

	const findPolicy = useMutation((searchData) => searchPolicy(searchData), {
		onSuccess: (data) => {
			console.log('Success response ', data);
			if (data?.status === 'success') {
				//window.location.replace(data.redirect_url);
				console.log(data);
				setNotFound(false);
				setPolicyHolder(data?.user);
				reset();
			} else if (data?.status !== 'success') {
				alert('User not found', null, 'error');
				setNotFound(true);
				setPolicyHolder(null);
			}
		},
		onError: (error) => {
			console.log(error);
			alert('User not found', null, 'error');
			setNotFound(true);
			setPolicyHolder(null);
		},
	});

	const submitSearchRequest = (data) => {
		setPolicyHolder(null);
		setNotFound(false);
		const searchData = data;

		//console.log(data, searchData);
		findPolicy.mutate(searchData);

		//window.sessionStorage.setItem('basicData', basicData);

		//router.push(`/form/purchase-plan`);
	};

	const triggerDeclinePolicy = async (data) => {
		const { data: response } = await axiosPrivate.put(
			'/admin/verify-user-trip',
			data
		);
		return response;
	};

	const declinePolicy = useMutation(
		(declineData) => triggerDeclinePolicy(declineData),
		{
			onSuccess: (data) => {
				if (data?.status === 'success') {
					alert('Success', 'Policy holder decline successful', 'success');
					setPolicyHolder(null);
					setNotFound(false);
					setDeclinePolicyModal(false);
					declineReset();
				} else if (data?.status !== 'success') {
					alert(
						'Decline failed',
						'Policy holder decline failed. Please try again later',
						'error'
					);
				}
			},
			onError: (error) => {
				console.log(error);
			},
		}
	);

	const submitDeclinePolicy = (data) => {
		const declineData = {
			status: 'declined',
			policy_no: policyHolder?.user_policy_transaction?.policy_no,
			reason: data.reason === 'other' ? data.desc : data.reason,
		};

		declinePolicy.mutate(declineData);

		//window.sessionStorage.setItem('basicData', basicData);

		//router.push(`/form/purchase-plan`);
	};

	const triggerVerifyPolicy = async (data) => {
		const { data: response } = await axiosPrivate.put(
			'/admin/verify-user-trip',
			data
		);
		return response;
	};

	const verifyPolicy = useMutation(
		(verificationData) => triggerVerifyPolicy(verificationData),
		{
			onSuccess: (data) => {
				if (data?.status === 'success') {
					alert('Success', 'Policy holder verified successfully', 'success');
					setPolicyHolder(null);
					setNotFound(false);
				} else if (data?.status !== 'success') {
					alert(
						'Verification failed',
						'Policy holder verification failed. Please try again later',
						'error'
					);
				}
			},
			onError: (error) => {
				console.log(error);
			},
		}
	);

	const submitVerifyPolicy = (e) => {
		e.preventDefault();

		const verifyData = {
			status: 'verified',
			policy_no: policyHolder?.user_policy_transaction?.policy_no,
		};

		verifyPolicy.mutate(verifyData);
	};

	return (
		<div className="tw-w-screen tw-min-h-screen tw-bg-[#FEFBFB] tw-py-20 lg:tw-pt-20 lg:tw-pl-56">
			<DashboardNav />
			<div className="tw-w-full tw-h-full tw-py-10 tw-px-12 tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-10">
				<div className="tw-w-full tw-flex tw-flex-col xl:tw-flex-row tw-justify-start tw-items-start xl:tw-justify-between xl:tw-items-center tw-gap-5">
					<h2 className="tw-text-2xl md:tw-text-3xl tw-font-semibold tw-shrink-0">
						Find Policy
					</h2>
					<div className="tw-w-full xl:tw-w-2/3">
						<form onSubmit={handleSubmit(submitSearchRequest)}>
							<div className="tw-w-full tw-flex tw-flex-col md:tw-flex-row tw-justify-end tw-items-start tw-gap-3">
								<div className="tw-w-full md:tw-w-1/4">
									<Controller
										control={control}
										name={'search_type'}
										rules={{
											required: 'Please select search type',
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
												label="Search by"
												options={[
													{ name: 'passport number', value: 'passport_number' },
													{ name: 'policy number', value: 'policy_no' },
												]}
												required
											/>
										)}
									/>
								</div>

								<Controller
									name={'search_term'}
									control={control}
									rules={{
										required:
											'Please enter passport number or policy number to search',
									}}
									render={({
										field: { ref, ...field },
										fieldState: { error, invalid },
									}) => (
										<DefaultInput
											{...field}
											ref={ref}
											error={invalid}
											helpertext={invalid ? error.message : null}
											label="Passport Number/ Policy Number"
											type="text"
											required
										/>
									)}
								/>

								<button
									className="btn-style-one dark-green-color"
									type="submit">
									Search
								</button>
							</div>
						</form>
					</div>
				</div>

				{policyHolder && (
					<div className="tw-w-full tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 xl:tw-grid-cols-2 tw-gap-5 tw-place-content-start tw-place-items-start">
						<div className="tw-w-full tw-h-fit lg:tw-col-span-2 xl:tw-col-span-1  tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-5">
							<div className="tw-w-full tw-h-fit tw-bg-white tw-shadow-sm tw-rounded-lg tw-py-5 tw-px-8 tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-5">
								<div className="tw-w-full tw-flex tw-justify-start tw-gap-4 tw-items-start">
									<BsQrCode className="tw-text-5xl md:tw-text-7xl tw-shrink-0" />
									<div className="tw-h-full tw-w-full tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-1">
										<h3 className="tw-font-semibold tw-text-lg md:tw-text-xl tw-text-[#8e6abf]">
											{policyHolder?.insured_person?.length > 0
												? policyHolder?.insured_person[0]?.first_name
												: policyHolder?.travelling_info?.first_name}{' '}
											{policyHolder?.insured_person?.length > 0
												? policyHolder?.insured_person[0]?.last_name
												: policyHolder?.travelling_info?.last_name}
										</h3>
										<div className="tw-w-full tw-flex tw-justify-start tw-items-end tw-gap-3">
											<div className="tw-w-fit tw-shrink-0 tw-flex tw-justify-start tw-text-sm tw-text-gray-500">
												Passport number:
											</div>
											<p className="tw-uppercase tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600 tw-font-bold">
												{policyHolder?.insured_person?.length > 0
													? policyHolder?.insured_person[0]?.passport_number
													: policyHolder?.travelling_info?.passport_number}
											</p>
										</div>
										<div className="tw-w-full tw-flex tw-justify-start tw-items-end tw-gap-3">
											<div className="tw-w-fit tw-shrink-0 tw-flex tw-justify-start tw-text-sm tw-text-gray-500">
												Policy number:
											</div>
											<p className="tw-uppercase tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600 tw-font-bold">
												{policyHolder?.user_policy_transaction?.policy_no}
											</p>
										</div>
										{/*<div className="tw-w-full tw-flex tw-justify-start tw-items-end tw-gap-3">
										<div className="tw-w-fit tw-shrink-0 tw-flex tw-justify-start tw-text-sm tw-text-gray-500">
											Policy Status:
										</div>
										<p className="tw-capitalize tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600 tw-font-bold">
											Active
										</p>
									</div>*/}
									</div>
								</div>
								<div className="tw-w-full tw-flex tw-flex-col tw-space-y-2 tw-py-3 tw-border-t">
									<h2 className="tw-w-full tw-font-title tw-font-medium tw-text-base tw-text-gray-600 tw-flex tw-justify-start tw-items-end">
										Bio Data
									</h2>
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-500">
											First name
										</div>
										<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
											{policyHolder?.insured_person?.length > 0
												? policyHolder?.insured_person[0]?.first_name
												: policyHolder?.travelling_info?.first_name}
										</p>
									</div>
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-500">
											Last name
										</div>
										<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
											{policyHolder?.insured_person?.length > 0
												? policyHolder?.insured_person[0]?.last_name
												: policyHolder?.travelling_info?.last_name}
										</p>
									</div>
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-500">
											Date of Birth
										</div>
										<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
											{format(
												new Date(
													policyHolder?.insured_person?.length > 0
														? policyHolder?.insured_person[0]?.dob
														: policyHolder?.travelling_info?.dob
												),
												'dd/MM/yyyy'
											)}
										</p>
									</div>
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-500">
											Gender
										</div>
										<p className="tw-w-full tw-capitalize tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
											{policyHolder?.insured_person?.length > 0
												? policyHolder?.insured_person[0]?.gender
												: policyHolder?.travelling_info?.gender}
										</p>
									</div>
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-500">
											Passport Number
										</div>
										<p className="tw-uppercase tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
											{policyHolder?.insured_person?.length > 0
												? policyHolder?.insured_person[0]?.passport_number
												: policyHolder?.travelling_info?.passport_number}
										</p>
									</div>
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
											{policyHolder?.insured_person?.length > 0
												? policyHolder?.insured_person[0]?.country
												: policyHolder?.travelling_info?.country}
										</p>
									</div>
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-500">
											Effective Date
										</div>
										<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-600 tw-font-bold">
											{format(
												new Date(
													policyHolder?.user_policy_transaction?.start_date
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
													policyHolder?.user_policy_transaction?.end_date
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
											{policyHolder?.user_policy_transaction?.duration} days
										</p>
									</div>
								</div>
								<div className="tw-w-full tw-flex tw-flex-col tw-gap-2">
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-font-semibold tw-text-gray-500">
											Policy Name
										</div>
										<span className="tw-w-full tw-flex tw-justify-end tw-items-end tw-gap-1 tw-text-sm tw-text-[#8e6abf] tw-font-bold">
											{
												policyHolder?.user_policy_transaction?.trip_policy
													?.plan_name
											}
										</span>
									</div>
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-font-semibold tw-text-gray-500">
											Price
										</div>
										<span className="tw-w-full tw-flex tw-justify-end tw-items-end tw-gap-1 tw-text-xl tw-text-[#8e6abf] tw-font-bold">
											{Intl.NumberFormat('en-US', {
												style: 'currency',
												currency: 'USD',
											}).format(
												policyHolder?.user_policy_transaction?.price
											)}{' '}
										</span>
									</div>
								</div>
							</div>

							{policyHolder?.user_policy_transaction?.status === 'pending' ? (
								<>
									<div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-gap-5">
										<span
											className="btn-style-back red-light-color tw-w-fit tw-h-fit tw-rounded-lg tw-px-4 tw-py-2 tw-flex tw-shadow-md tw-justify-center tw-items-center tw-text-base tw-cursor-pointer"
											onClick={() => setDeclinePolicyModal((prev) => !prev)}>
											Decline
										</span>

										<button
											//size="lg"
											className="btn-style-one dark-green-color"
											//disabled={!isValid}
											onClick={(e) => submitVerifyPolicy(e)}
											type="button">
											Verify
										</button>
									</div>
									<div className="tw-w-full tw-flex-col tw-justify-start tw-items-start tw-gap-3">
										<div className="tw-bg-[#7862AF]/20 tw-w-full tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-2 tw-h-fit tw-p-3 tw-rounded-lg">
											<p className="tw-w-fit tw-text-left tw-text-base">
												<strong>NB:</strong> An email will be sent to the policy
												holder with their updated status once verified or
												declined.
											</p>
										</div>
									</div>
								</>
							) : null}
						</div>

						{policyHolder?.user_policy_transaction?.status !== 'pending' ? (
							<div className="tw-w-full tw-flex-col tw-justify-start tw-items-start tw-gap-3">
								<div className="tw-bg-[#7862AF]/20 tw-w-full tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-2 tw-h-fit tw-p-3 tw-rounded-lg">
									<div className="tw-w-full tw-grid tw-grid-cols-2 tw-gap-1">
										<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-600">
											Authorization status
										</div>
										<p
											className={`tw-w-full tw-uppercase tw-flex tw-justify-end tw-text-base ${
												policyHolder?.user_policy_transaction?.status ===
												'verified'
													? 'tw-text-green-600'
													: 'tw-text-red-600'
											}  tw-font-bold`}>
											{policyHolder?.user_policy_transaction?.status}
										</p>
									</div>
									<div className="tw-w-full tw-grid tw-grid-cols-2 tw-gap-1">
										<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-600">
											Authorized by
										</div>
										<p className="tw-w-full tw-capitalize tw-flex tw-justify-end tw-text-base tw-text-gray-800 tw-font-bold">
											{
												policyHolder?.user_policy_transaction?.status_updated_by
													?.first_name
											}{' '}
											{
												policyHolder?.user_policy_transaction?.status_updated_by
													?.last_name
											}
										</p>
									</div>
									<div className="tw-w-full tw-grid tw-grid-cols-2 tw-gap-1">
										<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-600">
											Authorized at
										</div>
										<p className="tw-w-full tw-capitalize tw-flex tw-justify-end tw-text-base tw-text-gray-800 tw-font-bold">
											{
												policyHolder?.user_policy_transaction
													?.status_update_date
											}
										</p>
									</div>
									{policyHolder?.user_policy_transaction?.reason && (
										<div className="tw-w-full tw-grid tw-grid-cols-2 tw-gap-1">
											<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-600">
												Reason
											</div>
											<p className="tw-w-full tw-capitalize tw-flex tw-justify-end tw-text-base tw-text-gray-800 tw-font-bold">
												{policyHolder?.user_policy_transaction?.reason}
											</p>
										</div>
									)}
								</div>
								{/*policyHolder?.user_policy_transaction?.reason && (
									<div className="tw-bg-[#7862AF]/20 tw-w-full tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-2 tw-h-fit tw-p-4 tw-rounded-lg">
										<p className="tw-w-fit tw-text-left tw-text-base">
											{policyHolder?.user_policy_transaction?.reason}
										</p>
									</div>
								)*/}
							</div>
						) : null}
					</div>
				)}

				{declinePolicyModal && (
					<div
						onClick={() => setDeclinePolicyModal((prev) => !prev)}
						className="tw-fixed tw-top-0 tw-left-0 tw-z-[999] tw-flex tw-justify-center tw-items-center tw-w-screen tw-h-screen tw-bg-black/50">
						<div
							data-aos="zoom-in"
							data-aos-duration="600"
							onClick={(e) => e.stopPropagation()}
							className="tw-font-medium tw-text-center tw-text-lg tw-w-2/3 lg:tw-w-1/2 tw-h-fit tw-bg-white tw-shadow-sm tw-rounded-lg tw-py-5 tw-px-8 tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-5">
							<div className="tw-w-full">
								<form onSubmit={handleDeclineSubmit(submitDeclinePolicy)}>
									<div className="tw-w-full tw-flex tw-flex-col tw-gap-4 tw-pb-3">
										<h2 className="tw-w-full tw-font-medium tw-text-2xl tw-text-[#524380] tw-flex tw-justify-start tw-items-end">
											Decline Policy Holder
										</h2>

										<Controller
											name={'reason'}
											control={declineControl}
											rules={{
												required: 'Please select reason for decline',
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
													label="Reason"
													options={[
														{
															name: 'passport number does not match',
															value: 'passport number does not match',
														},
														{
															name: 'date of birth does not match',
															value: 'date of birth does not match',
														},
														{
															name: 'first name or last name does not match',
															value: 'first name or last name does not match',
														},
														{
															name: 'gender does not match',
															value: 'gender does not match',
														},
														{
															name: 'other',
															value: 'other',
														},
													]}
													required
												/>
											)}
										/>

										{watchDecline('reason') === 'other' && (
											<Controller
												name={'desc'}
												control={declineControl}
												rules={{
													required: 'Please enter your new password',
												}}
												render={({
													field: { ref, ...field },
													fieldState: { error, invalid },
												}) => (
													<DefaultInput
														{...field}
														ref={ref}
														error={invalid}
														helpertext={invalid ? error.message : null}
														label="Reason Description"
														type={'text-area'}
														required
													/>
												)}
											/>
										)}

										<div className="tw-w-full tw-flex tw-justify-end tw-items-end">
											<button
												className="btn-style-one dark-green-color"
												type="submit">
												Decline
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				)}

				<Backdrop
					sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={declinePolicy.isLoading}>
					<div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-5">
						<CircularProgress color="inherit" />
						<p className="tw-text-white tw-font-medium tw-text-center tw-text-lg tw-w-2/3">
							Declining, please wait...
						</p>
					</div>
				</Backdrop>

				<Backdrop
					sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={verifyPolicy.isLoading}>
					<div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-5">
						<CircularProgress color="inherit" />
						<p className="tw-text-white tw-font-medium tw-text-center tw-text-lg tw-w-2/3">
							Verifying, please wait...
						</p>
					</div>
				</Backdrop>

				{findPolicy.isLoading && (
					<div className="tw-w-full tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 xl:tw-grid-cols-2 tw-gap-5 tw-place-content-start tw-place-items-start">
						<div className="tw-w-full">
							<Stack spacing={1} sx={{ width: '100%' }}>
								<div className="tw-w-full tw-flex tw-justify-start tw-gap-4 tw-items-start">
									<div className="tw-w-fit">
										<Skeleton variant="rounded" width={100} height={100} />
									</div>
									<div className="tw-h-full tw-w-full tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-1">
										<Skeleton
											variant="text"
											sx={{ fontSize: '2rem', width: '100%' }}
										/>
										<Skeleton
											variant="text"
											sx={{ fontSize: '1rem', width: '100%' }}
										/>
										<Skeleton
											variant="text"
											sx={{ fontSize: '1rem', width: '100%' }}
										/>
									</div>
								</div>
								<Skeleton
									variant="text"
									sx={{ fontSize: '1rem', width: '100%' }}
								/>
								<Skeleton
									variant="text"
									sx={{ fontSize: '1rem', width: '100%' }}
								/>
								<Skeleton
									variant="text"
									sx={{ fontSize: '1rem', width: '100%' }}
								/>
								<Skeleton
									variant="text"
									sx={{ fontSize: '1rem', width: '100%' }}
								/>
								<Skeleton
									variant="text"
									sx={{ fontSize: '1rem', width: '100%' }}
								/>
								<Skeleton
									variant="text"
									sx={{ fontSize: '1rem', width: '100%' }}
								/>
								<Skeleton
									variant="text"
									sx={{ fontSize: '2rem', width: '100%' }}
								/>
								<Skeleton
									variant="text"
									sx={{ fontSize: '2rem', width: '100%' }}
								/>
							</Stack>
						</div>
					</div>
				)}

				{notFound && (
					<h4 className="tw-text-xl tw-font-medium">User not Found</h4>
				)}

				{!notFound && !policyHolder && !findPolicy.isLoading && (
					<span className="tw-bg-[#7862AF]/20 tw-w-full tw-h-fit tw-p-3 md:tw-p-6 tw-rounded-lg">
						<h5 className="tw-mt-3 tw-w-full tw-text-left tw-text-[#7862AF] tw-font-semibold tw-text-lg md:tw-text-2xl">
							GVHIP Verification Portal
						</h5>
						<h6 className="tw-mt-3 tw-w-full tw-text-left tw-text-[#171e41] tw-font-medium tw-text-lg md:tw-text-xl">
							Ensuring Every Visitor&apos;s Safe Stay in Ghana!
						</h6>
						<p className="tw-w-full tw-text-left tw-text-sm md:tw-text-base">
							Dear Officers, through this portal, you play a pivotal role in
							safeguarding both our visitors and our homeland. Together,
							let&apos;s ensure a smooth, welcoming experience for all entering
							Ghana, while upholding the safety standards we&apos;re proud of.
							<br />
							<br />
						</p>
						<h6 className="tw-mt-5 tw-w-full tw-text-left tw-text-[#171e41] tw-font-medium tw-text-lg md:tw-text-xl">
							How to Verify a Policy
						</h6>
						<p className="tw-w-full tw-mt-1 tw-text-left tw-text-sm md:tw-text-base">
							<strong className="tw-text-[#171e41]">
								1. Enter Passport Number:
							</strong>{' '}
							Use the passport number provided by the visitor.
							<br />
							<strong className="tw-text-[#171e41]">
								2. Verify Policy Details:
							</strong>{' '}
							The system will display the policy&apos;s validity, coverage, and
							other essential details.
							<br />
							<strong className="tw-text-[#171e41]">
								3. Confirm Verification:
							</strong>{' '}
							Mark the policy as verified if all details match and are valid.
							<br />
							<br />
							<strong className="tw-text-[#171e41]">A Warm Note:</strong>{' '}
							Let&apos;s remember, while the GVHIP is mandatory, it&apos;s also
							our way of showing that Ghana cares. Kindly guide visitors with
							lapsed or missing policies to our dedicated helpdesk.
						</p>
						<p className="tw-w-full tw-mt-4 tw-text-left tw-text-sm md:tw-text-base">
							<br />
							<br />
							<strong>Facing an issue with the portal? </strong> Click{' '}
							<strong className="tw-text-[#7862AF]">here</strong> for immediate
							assistance.
							<br />
							<br />
							<strong>New to the portal? </strong> Access training materials and
							resources <strong className="tw-text-[#7862AF]">here</strong>.
						</p>
					</span>
				)}
			</div>
		</div>
	);
};

export default FindPolicy;
