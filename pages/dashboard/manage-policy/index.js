'use client';

import React, { useState } from 'react';
import DashboardNav from '@/components/Layout/Navigations/DashboardNav';
import { addDays, differenceInDays, format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import Accordion from '@/components/Accordion';
import { planTabsData } from 'data/plansData';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
//import Signup from '@/components/Authentication/Signup';
//import FooterFour from '@/components/Layout/Footer/FooterFour';

const Dashboard = () => {
	const [managePolicy, setManagePolicy] = useState(false);
	const [dateState, setDateState] = useState([
		{
			startDate: addDays(new Date(), 30),
			endDate: addDays(new Date(), 30),
			key: 'selection',
		},
	]);

	let duration = Number(
		differenceInDays(
			new Date(dateState[0].endDate),
			new Date(dateState[0].startDate)
		) + 1
	);

	const { reset, watch, control, handleSubmit } = useForm({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			confirm_extension: false,
		},
	});

	const submitExtensionRequest = (data) => {
		const basicData = JSON.stringify({
			extension_start_date: format(dateState[0]?.startDate, 'yyyy-MM-dd'),
			extension_end_date: format(dateState[0]?.endDate, 'yyyy-MM-dd'),
		});

		console.log(data, basicData);

		setManagePolicy(false);

		reset();
		//window.localStorage.setItem('basicData', basicData);

		//router.push(`/form/purchase-plan`);
	};

	return (
		<div className="tw-w-screen tw-min-h-screen tw-bg-[#FEFBFB] tw-py-20 lg:tw-pt-20 lg:tw-pl-56">
			<DashboardNav />
			<div className="tw-w-full tw-h-full tw-py-10 tw-px-12 tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-10">
				<div className="tw-w-full tw-flex tw-justify-between tw-items-center">
					<h2 className="tw-text-3xl tw-font-semibold">Manage Policy</h2>
				</div>

				<div className="tw-w-full tw-grid tw-grid-cols-2 xl:tw-grid-cols-3 tw-gap-5 tw-place-content-start tw-place-items-start">
					<div className="tw-w-full tw-h-fit tw-bg-white tw-shadow-sm xl:tw-col-span-2 tw-rounded-lg tw-py-5 tw-px-8 tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-5">
						<div className="tw-w-full">
							<Accordion questionsAnswers={planTabsData} />
						</div>
					</div>

					<div className="tw-w-full tw-h-fit tw-row-start-1 tw-col-start-2 tw-row-span-2 lg:tw-row-span-1 xl:tw-col-start-3 xl:tw-row-start-1 xl:tw-row-span-2 tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-5">
						<div className="tw-w-full tw-h-fit tw-bg-gradient-to-tl tw-from-[#524380] tw-to-[#8e6abf] tw-text-white tw-shadow-sm tw-rounded-lg tw-py-5 tw-px-8 tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-5">
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
									<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-font-semibold tw-text-gray-100">
										Price
									</div>
									<span className="tw-w-full tw-flex tw-justify-end tw-items-end tw-gap-1 tw-text-xl tw-text-white tw-font-bold">
										{
											/*duration &&
										Intl.NumberFormat('en-US', {
											style: 'currency',
											currency: 'USD',
										}).format(
											duration <= 30
												? 45
												: duration > 30 && duration <= 60
												? 90
												: duration > 60 && duration <= 90
												? 135
												: duration > 90 && duration <= 120
												? 180
												: duration > 120 && duration <= 150
												? 225
												: duration > 150 && duration <= 180 && 270
                                        )*/
											Intl.NumberFormat('en-US', {
												style: 'currency',
												currency: 'USD',
											}).format(45)
										}{' '}
									</span>
								</div>
							</div>
						</div>

						<div className="tw-w-full tw-flex tw-justify-end tw-items-end">
							<button
								className="btn-style-one dark-green-color"
								onClick={() => setManagePolicy(true)}
								type="button">
								Extend Policy <i className="bx bx-chevron-right"></i>
							</button>
						</div>
					</div>
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
						className="tw-font-medium tw-text-center tw-text-lg tw-w-2/3 lg:tw-w-1/2 tw-h-fit tw-bg-white tw-shadow-sm tw-rounded-lg tw-py-5 tw-px-8 tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-5">
						<div className="tw-w-full tw-flex tw-flex-col tw-gap-2 tw-py-3 tw-border-b-2">
							<h2 className="tw-w-full tw-font-medium tw-text-lg tw-text-[#524380] tw-flex tw-justify-start tw-items-end tw-pb-2 tw-border-b-2">
								Current Policy Details
							</h2>

							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600">
									Coverage Starts
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-900 tw-font-bold">
									{format(new Date(), 'MMM dd, yyyy')}
								</p>
							</div>
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600">
									Coverage Ends
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-900 tw-font-bold">
									{format(addDays(new Date(), 30), 'MMM dd, yyyy')}
								</p>
							</div>
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-600">
									Duration
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-900 tw-font-bold">
									{differenceInDays(addDays(new Date(), 30), new Date())} days
								</p>
							</div>
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-600">
									Price
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-gray-900 tw-font-bold">
									{
										/*§duration &&
										Intl.NumberFormat('en-US', {
											style: 'currency',
											currency: 'USD',
										}).format(
											duration <= 30
												? 45
												: duration > 30 && duration <= 60
												? 90
												: duration > 60 && duration <= 90
												? 135
												: duration > 90 && duration <= 120
												? 180
												: duration > 120 && duration <= 150
												? 225
												: duration > 150 && duration <= 180 && 270
                                        )*/
										Intl.NumberFormat('en-US', {
											style: 'currency',
											currency: 'USD',
										}).format(45)
									}
								</p>
							</div>
						</div>
						<div className="tw-w-full">
							<form onSubmit={handleSubmit(submitExtensionRequest)}>
								<div className="tw-w-full tw-flex tw-flex-col tw-gap-2 tw-pb-3">
									<h2 className="tw-w-full tw-font-medium tw-text-lg tw-text-[#524380] tw-flex tw-justify-start tw-items-end">
										Extension Period
									</h2>

									<div className="tw-w-full tw-h-fit tw-flex tw-flex-col lg:tw-flex-row tw-justify-center tw-gap-4 tw-items-center tw-border-y-2 tw-px-2 tw-py-3">
										<div className="tw-w-full md:tw-w-fit tw-flex tw-justify-center lg:tw-justify-start tw-items-center tw-gap-2 tw-shrink-0">
											<DateRange
												editableDateInputs={true}
												onChange={(item) => setDateState([item.selection])}
												moveRangeOnFirstSelection={false}
												ranges={dateState}
												rangeColors={['#8e6abf']}
												minDate={addDays(new Date(), 30)}
												maxDate={addDays(dateState[0].startDate, 179)}
												className="tw-rounded-md tw-shadow-md"
											/>
										</div>
										<div className="tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center lg:tw-ml-10">
											<div className="tw-hidden lg:tw-grid tw-grid-cols-2 tw-w-full tw-pb-2">
												<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600">
													Extension Starts
												</div>
												<p className="tw-w-full tw-flex tw-justify-end tw-text-base tw-text-[#524380] tw-font-bold">
													{format(
														new Date(dateState[0].startDate),
														'MMM dd, yyyy'
													)}
												</p>
											</div>
											<div className="tw-hidden lg:tw-grid tw-grid-cols-2 tw-w-full tw-pb-2">
												<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600">
													Extension Ends
												</div>
												<p className="tw-w-full tw-flex tw-justify-end tw-text-base tw-text-[#524380] tw-font-bold">
													{format(
														new Date(dateState[0].endDate),
														'MMM dd, yyyy'
													)}
												</p>
											</div>
											<div className="tw-grid tw-grid-cols-2 tw-w-full tw-pb-2">
												<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600">
													Extension Duration
												</div>
												<p className="tw-w-full tw-flex tw-justify-end tw-text-base tw-text-[#524380] tw-font-bold">
													{differenceInDays(
														new Date(dateState[0].endDate),
														new Date(dateState[0].startDate)
													) + 1}{' '}
													day(s)
												</p>
											</div>
											<div className="tw-grid tw-grid-cols-2 tw-w-full tw-pb-2">
												<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600">
													Price
												</div>
												<p className="tw-w-full tw-flex tw-justify-end tw-text-base tw-text-[#524380] tw-font-bold">
													{duration &&
														Intl.NumberFormat('en-US', {
															style: 'currency',
															currency: 'USD',
														}).format(
															duration <= 30
																? 45
																: duration > 30 && duration <= 60
																? 90
																: duration > 60 && duration <= 90
																? 135
																: duration > 90 && duration <= 120
																? 180
																: duration > 120 && duration <= 150
																? 225
																: duration > 150 && duration <= 180 && 270
														)}{' '}
												</p>
											</div>
										</div>
									</div>
									<div className="tw-w-full tw-flex tw-flex-col tw-justify-start tw-items-start">
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
														label={`Confirm policy extension by ${
															differenceInDays(
																new Date(dateState[0].endDate),
																new Date(dateState[0].startDate)
															) + 1
														} day(s) for ${
															duration &&
															Intl.NumberFormat('en-US', {
																style: 'currency',
																currency: 'USD',
															}).format(
																duration <= 30
																	? 45
																	: duration > 30 && duration <= 60
																	? 90
																	: duration > 60 && duration <= 90
																	? 135
																	: duration > 90 && duration <= 120
																	? 180
																	: duration > 120 && duration <= 150
																	? 225
																	: duration > 150 && duration <= 180 && 270
															)
														}`}
													/>
													<FormHelperText error>
														{invalid ? error.message : null}
													</FormHelperText>
												</>
											)}
										/>
									</div>

									<div className="tw-w-full tw-flex tw-justify-end tw-items-end">
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
		</div>
	);
};

export default Dashboard;
