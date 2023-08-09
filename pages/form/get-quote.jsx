import Link from '@/utils/ActiveLink';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import DefaultInput from '@/components/Input/DefaultInput';
import SelectInput from '@/components/Input/SelectInput';
import { format, differenceInDays, addDays } from 'date-fns';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

import { countries } from '../../data/countriesData';
import logo from '@/public/images/gsti_logo.jpeg';
import { Button } from '@mui/material';

import { IoAdd } from 'react-icons/io5';
import { AiOutlineClose, AiOutlineFilePdf } from 'react-icons/ai';

import { MdDelete } from 'react-icons/md';
import { BiMinus, BiSolidTime } from 'react-icons/bi';
import Accordion from '@/components/Accordion';
import DetailsTabs from '@/components/Courses/Details/DetailsTabs';
import { plans } from 'data/plansData';
import {
	BsFillCheckCircleFill,
	BsGlobeEuropeAfrica,
	BsPeopleFill,
} from 'react-icons/bs';

const MAX_STEPS = 3;

const Quote = () => {
	const [formStep, setFormStep] = useState(1);
	const [basicData, setBasicData] = useState(null);
	const [selectedPlan, setSelectedPlan] = useState(null);
	const [dateState, setDateState] = useState([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 29),
			key: 'selection',
		},
	]);
	const [showMore, setShowMore] = useState(null);

	const handleShowDetails = (index) => {
		setShowMore((prev) => (prev === index ? null : index));
	};

	const router = useRouter();

	useEffect(() => {
		const data = window.localStorage.getItem('basicData');
		if (data !== null) setBasicData(JSON.parse(data));
	}, []);

	const goToNext = () => {
		setFormStep((prev) => prev + 1);
	};
	const goToPrevious = () => {
		setFormStep((prev) => prev - 1);
	};

	const {
		watch,
		control,
		setValue,
		reset,
		formState: { isValid },
		handleSubmit,
	} = useForm({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			country: '',
			insured_person: [{}],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'insured_person',
		rules: { maxLength: 5 },
	});

	useEffect(() => {
		if (basicData) {
			reset({
				country: basicData.country,
				insured_person: basicData.insured_person,
			});
			setDateState([
				{
					startDate: new Date(basicData.start_date),
					endDate: new Date(basicData.end_date),
					key: 'selection',
				},
			]);
		}
	}, [reset, basicData]);

	const renderButton = () => {
		if (formStep > 4) {
			return null;
		} else if (formStep === 4) {
			return (
				<div className="tw-w-full tw-flex tw-justify-end tw-items-center">
					<button
						//size="lg"
						className="btn-style-one dark-green-color"
						disabled={selectedPlan === null ? true : false}
						type="submit">
						Purchase Plan <i className="bx bx-chevron-right"></i>
					</button>
				</div>
			);
		} else if (formStep === 3) {
			return (
				<div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-gap-5">
					<span
						//size="lg"
						className="btn-style-back crimson-color tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-rotate-180 tw-shadow-md tw-justify-center tw-items-center tw-text-3xl"
						onClick={goToPrevious}
						//color="red"
					>
						<i className="bx bx-chevron-right"></i>
					</span>
					<button
						//size="lg"
						className="btn-style-one dark-green-color"
						disabled={!isValid}
						onClick={goToNext}
						type="button">
						Get Quotes <i className="bx bx-chevron-right"></i>
					</button>
				</div>
			);
		} else if (formStep === 2) {
			return (
				<div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-gap-5">
					<span
						//size="lg"
						className="btn-style-back crimson-color tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-rotate-180 tw-shadow-md tw-justify-center tw-items-center tw-text-3xl"
						onClick={goToPrevious}
						//color="red"
					>
						<i className="bx bx-chevron-right"></i>
					</span>
					<button
						//size="lg"
						className="btn-style-one dark-green-color"
						disabled={!isValid}
						onClick={goToNext}
						type="button">
						Next <i className="bx bx-chevron-right"></i>
					</button>
				</div>
			);
		} else if (formStep === 1) {
			return (
				<div className="tw-w-full tw-flex tw-justify-end tw-items-center">
					<button
						//size="lg"
						className="btn-style-one dark-green-color"
						disabled={!isValid}
						onClick={goToNext}
						type="button">
						Next <i className="bx bx-chevron-right"></i>
					</button>
				</div>
			);
		} else {
			return (
				<div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-gap-5 tw-mt-8">
					<Button
						//size="lg"
						//className="w-full"
						onClick={goToPrevious}
						//color="red"
						//variant="outlined"
						outlined
						type="button">
						back
					</Button>
					<Button
						//size="lg"
						//className="w-full bg-gradient-to-br from-[#7862AF] to-[#171E41]"
						disabled={!isValid}
						onClick={goToNext}
						type="button">
						Next
					</Button>
				</div>
			);
		}
	};

	/**
	const paymentRequest = async (data) => {
		const { data: response } = await axios.post(
			'https://goldenpartnershipplatform.org/ng-pay/checkout.php',
			data,
			{
				headers: { 'Content-Type': 'application/json' },
				//withCredentials: true,
			}
		);
		return response;
	};

	const makePayment = useMutation(
		(paymentData) => paymentRequest(paymentData),
		{
			onSuccess: (data) => {
				console.log('Success response ', data);
				if (data?.resp_code === '000') {
					window.location.replace(data.redirect_url);
				}
			},
			onError: (error) => {
				console.log(error);
			},
		}
	);
	 */

	const submitForm = (data) => {
		/*
		const formatedDates = data?.insured_person.map((person) => ({
			first_name: person?.first_name,
			dob: format(person?.dob, 'dd-MM-yyyy'),
		}));
		*/

		const basicData = JSON.stringify({
			start_date: format(dateState[0]?.startDate, 'yyyy-MM-dd'),
			end_date: format(dateState[0]?.endDate, 'yyyy-MM-dd'),
			country: data?.country,
			insured_person: data?.insured_person,
			plan: selectedPlan,
		});

		console.log(basicData);
		window.localStorage.setItem('basicData', basicData);

		router.push(`/form/purchase-plan`);

		/*
		const formData = JSON.stringify({
			method: 'REQUEST_PAYMENT',
			api_key: 'd37e4e08a0fc40b39abf5ce36a8d70c75fe05b83',
			user: 'mobile',
			firstname: data?.applicant[0]?.first_name
				? data?.applicant[0]?.first_name
				: data?.applicant[0]?.company_name,
			surname: data?.applicant[0]?.last_name
				? data?.applicant[0]?.last_name
				: data?.applicant[0]?.company_address,
			contact_number: data?.applicant[0]?.telephone
				? data?.applicant[0]?.telephone
				: data?.applicant[0]?.company_telephone,
			email: data?.applicant[0]?.email
				? data?.applicant[0]?.email
				: data?.applicant[0]?.company_email,
			request_id: Math.random().toString(36).substring(2, 12),
			redirect_url: 'https://gsti-test.netlify.app/e-card',
			callback_url: 'https://gsti-test.netlify.app/',
		});
		*/
	};

	return (
		<div className="tw-w-full tw-min-h-screen tw-h-full tw-flex tw-flex-col tw-justify-start tw-items-center tw-bg-[#F5F7FA]">
			<div className="tw-sticky tw-top-0 tw-z-30 tw-w-full tw-h-fit tw-flex tw-flex-col tw-justify-start tw-items-center tw-gap-3 tw-bg-white tw-shadow-md tw-px-6 tw-py-3 md:tw-py-5 md:tw-px-10 lg:tw-px-20">
				<div className="tw-w-full tw-flex tw-justify-between tw-items-center">
					<Link href="/">
						<a className="navbar-brand">
							<Image
								height={50}
								width={60}
								src={logo}
								alt="site logo"
								className="rounded-2"
							/>
						</a>
					</Link>

					<h2 className="tw-hidden md:tw-flex tw-capitalize tw-font-title tw-font-bold tw-text-3xl lg:tw-text-4xl tw-text-[#171e41]  tw-justify-center tw-items-end tw-gap-1">
						{formStep !== 4
							? 'Lets get some basic information'
							: 'Best plans for you'}
					</h2>

					{formStep !== 4 && (
						<p className="tw-text-sm tw-shrink-0 tw-my-auto tw-block md:tw-hidden">
							Step {formStep}/{MAX_STEPS}
						</p>
					)}

					<Link href="/">
						<span className="tw-cursor-pointer btn-style-back crimson-color tw-rounded-full tw-flex tw-justify-center tw-items-center tw-w-8 tw-h-8 md:tw-w-12 md:tw-h-12 tw-p-2">
							<AiOutlineClose className="tw-text-xl md:tw-text-3xl" />
						</span>
					</Link>
				</div>

				{formStep !== 4 ? (
					<div className="tw-w-full tw-hidden md:tw-flex tw-justify-start tw-items-center tw-gap-3">
						<p className="tw-text-sm tw-pr-2 tw-border-r-2 tw-shrink-0 tw-my-auto">
							Step {formStep} of {MAX_STEPS}
						</p>

						<div className="tw-w-full tw-h-2 tw-bg-slate-300 tw-rounded-full">
							<div
								className="tw-transition-all tw-duration-500 tw-ease-in-out tw-bg-[#8e6abf] tw-h-full tw-rounded-full"
								style={{ width: `${formStep * 33}%` }}
							/>
						</div>
					</div>
				) : (
					<div className="tw-w-fit tw-flex tw-justify-center tw-items-center tw-gap-5 tw-p-3 tw-rounded-md ">
						<div
							onClick={() => setFormStep(3)}
							className="tw-cursor-pointer tw-group tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-2">
							<span className="tw-flex tw-justify-start tw-items-center tw-gap-1">
								<BiSolidTime className="tw-text-lg tw-text-gray-700" />
								<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-700 tw-border-b-2 tw-border-[#7862AF]">
									Duration
								</p>
							</span>
							<p className="tw-transition-all tw-duration-200 tw-ease-in-out group-hover:tw-text-[#7862AF] hover:tw-font-bold">
								{differenceInDays(
									new Date(dateState[0].endDate),
									new Date(dateState[0].startDate)
								) + 1}{' '}
								days
							</p>
						</div>

						<div className="tw-w-[2px] tw-h-8 tw-bg-gray-200 tw-rounded-full" />

						<div
							onClick={() => setFormStep(1)}
							className="tw-cursor-pointer tw-group tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-2">
							<span className="tw-flex tw-justify-start tw-items-center tw-gap-1">
								<BsGlobeEuropeAfrica className="tw-text-lg tw-text-gray-700" />
								<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-700 tw-border-b-2 tw-border-[#7862AF]">
									Country of Residence
								</p>
							</span>
							<p className="tw-transition-all tw-duration-200 tw-ease-in-out group-hover:tw-text-[#7862AF] hover:tw-font-bold">
								{watch('country')}{' '}
							</p>
						</div>

						<div className="tw-w-[2px] tw-h-8 tw-bg-gray-200 tw-rounded-full" />

						<div
							onClick={() => setFormStep(2)}
							className="tw-cursor-pointer tw-group tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-2">
							<span className="tw-flex tw-justify-start tw-items-center tw-gap-1">
								<BsPeopleFill className="tw-text-lg tw-text-gray-700" />
								<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-700 tw-border-b-2 tw-border-[#7862AF]">
									No of Travellers
								</p>
							</span>
							<p className="tw-transition-all tw-duration-200 tw-ease-in-out group-hover:tw-text-[#7862AF] hover:tw-font-bold">
								{watch('insured_person')?.length}{' '}
								{watch('insured_person')?.length > 1 ? 'people' : 'person'}
							</p>
						</div>
					</div>
				)}
			</div>
			<div
				className={
					formStep !== 4
						? 'tw-w-full md:tw-w-5/6 lg:tw-w-4/6 tw-rounded-xl md:tw-shadow-lg md:tw-bg-white tw-mx-auto tw-my-20'
						: 'tw-w-full tw-h-full md:tw-bg-[#f1f5fd]'
				}>
				<div className="tw-px-4 tw-py-5 md:tw-px-8 md:tw-py-10">
					<form onSubmit={handleSubmit(submitForm)}>
						{formStep === 1 && (
							<section
								data-aos="fade-up"
								data-aos-duration="1200"
								className="tw-flex tw-flex-col tw-gap-10">
								<div className="tw-w-full tw-flex tw-flex-wrap-reverse tw-gap-3 tw-justify-between tw-items-center">
									<span className="tw-w-fit tw-flex tw-justify-start tw-items-end tw-gap-1">
										<h2 className="tw-font-title tw-font-bold tw-text-2xl lg:tw-text-3xl tw-text-[#171e41] tw-flex tw-justify-center tw-items-end tw-gap-1">
											What country are you flying in from?
										</h2>
									</span>
								</div>
								<div className="tw-relative tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center tw-border-y-2 tw-px-2 tw-py-5 md:tw-p-4">
									<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2">
										<Controller
											control={control}
											name={`country`}
											defaultValue={''}
											rules={{ required: 'Please select country' }}
											render={({
												field: { ref, ...field },
												fieldState: { error, invalid },
											}) => (
												<SelectInput
													{...field}
													ref={ref}
													error={invalid}
													helpertext={invalid ? error.message : null}
													label="Country of Origin"
													options={countries}
													required
												/>
											)}
										/>
									</div>
								</div>
							</section>
						)}

						{formStep === 2 && (
							<>
								<section
									data-aos="fade-up"
									data-aos-duration="1200"
									className="tw-flex tw-flex-col tw-gap-10">
									<div className="tw-w-full tw-flex tw-flex-wrap-reverse tw-gap-3 tw-justify-between tw-items-center">
										<span className="tw-w-fit tw-flex tw-justify-start tw-items-end tw-gap-1">
											<h2 className="tw-font-title tw-font-bold tw-text-2xl lg:tw-text-3xl tw-text-[#171e41] tw-flex tw-justify-center tw-items-end tw-gap-1">
												How many travelers?
											</h2>
										</span>
									</div>
									<div className="tw-relative tw-w-full tw-flex tw-flex-col tw-gap-5 tw-justify-center tw-items-center tw-border-y-2 tw-px-2 tw-py-5 md:tw-p-4">
										{fields.map((inputField, index) => (
											<div
												data-aos="fade-left"
												data-aos-duration="800"
												key={inputField.id}
												className="tw-w-full tw-h-full tw-flex tw-gap-8 lg:tw-gap-5 tw-justify-between tw-items-center lg:tw-items-center">
												<div className="tw-w-full tw-h-full tw-flex tw-flex-col lg:tw-flex-row tw-justify-start tw-items-start lg:tw-items-center tw-gap-3">
													<h6 className="tw-font-bold tw-text-lg tw-text-[#8e6abf] tw-shrink-0">
														Traveller {index + 1}
													</h6>
													<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-5">
														<Controller
															name={`insured_person[${index}].first_name`}
															control={control}
															defaultValue={''}
															rules={{ required: 'Please enter first name' }}
															render={({
																field: { ref, ...field },
																fieldState: { error, invalid },
															}) => (
																<DefaultInput
																	{...field}
																	ref={ref}
																	error={invalid}
																	helpertext={invalid ? error.message : null}
																	label="First Name"
																	type="text"
																	required
																/>
															)}
														/>

														<Controller
															name={`insured_person[${index}].last_name`}
															control={control}
															defaultValue={''}
															rules={{
																required: 'Please enter last name',
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
																	label="Last Name"
																	//max={new Date()}
																	type="text"
																	required
																/>
															)}
														/>
													</div>
												</div>

												{watch('insured_person')?.length > 1 ? (
													<div
														onClick={() => remove(index)}
														className="tw-cursor-pointer tw-flex tw-justify-center tw-items-center tw-transition-all tw-duration-500 tw-ease-in-out tw-rounded-full tw-h-6 tw-w-6 tw-text-red-500 hover:tw-text-white tw-border tw-border-red-500 tw-bg-transparent hover:tw-shadow-lg hover:tw-shadow-red-400/50 hover:tw-bg-red-500 cursor-pointer">
														<MdDelete className="tw-text-base" />
													</div>
												) : (
													<div className="tw-w-6" />
												)}
											</div>
										))}
									</div>
									{watch('insured_person')?.length !== 5 ? (
										<div
											onClick={() =>
												append({
													first_name: '',
													dob: '',
												})
											}
											className="tw-group tw-cursor-pointer tw-w-fit tw-flex tw-justify-start tw-items-center tw-gap-2">
											<div className="tw-flex tw-justify-center tw-items-center tw-transition-all tw-duration-500 tw-ease-in-out tw-rounded-full tw-h-6 tw-w-6 tw-text-white tw-bg-[#8e6abf] group-hover:tw-shadow-lg group-hover:tw-shadow-[#8e6abf]/50">
												<IoAdd className="tw-text-base" />
											</div>
											<p className="tw-font-bold tw-text-sm tw-text-[#8e6abf]">
												Add another traveller
											</p>
										</div>
									) : null}
								</section>
							</>
						)}

						{formStep === 3 && (
							<section
								data-aos="fade-up"
								data-aos-duration="1200"
								className="tw-flex tw-flex-col tw-gap-10">
								<div className="tw-w-full tw-flex tw-flex-col tw-gap-10 tw-justify-between tw-items-start">
									<span className="tw-w-fit tw-flex tw-justify-start tw-items-end tw-gap-1">
										<h2 className="tw-font-bold tw-text-2xl lg:tw-text-3xl tw-text-[#171e41] tw-flex tw-justify-center tw-items-end tw-gap-1">
											How long do you plan to stay in Ghana?
										</h2>
									</span>
								</div>
								<div className="tw-w-full tw-h-fit tw-flex tw-flex-col lg:tw-flex-row tw-justify-center lg:tw-justify-between tw-gap-4 tw-items-center tw-border-y-2 tw-px-2 tw-py-5 md:tw-p-4">
									<div className="tw-w-full md:tw-w-fit tw-flex tw-justify-center lg:tw-justify-start tw-items-center tw-gap-2 tw-shrink-0">
										{/**
										<LocalizationProvider
											dateAdapter={AdapterDateFns}
											adapterLocale={enGB}>
											<Controller
												control={control}
												name={`start_date`}
												rules={{ required: 'Please select arrival date' }}
												render={({
													field: { ref, ...field },
													//fieldState: { error, invalid },
												}) => (
													<DatePicker
														{...field}
														ref={ref}
														minDate={new Date()}
														label="Arrival Date"
													/>
												)}
											/>
										</LocalizationProvider>
										-
										<LocalizationProvider
											dateAdapter={AdapterDateFns}
											adapterLocale={enGB}>
											<Controller
												control={control}
												name={`end_date`}
												rules={{ required: 'Please select departure date' }}
												render={({
													field: { ref, ...field },
													//fieldState: { error, invalid },
												}) => (
													<DatePicker
														{...field}
														ref={ref}
														minDate={watch('start_date')}
														maxDate={addDays(watch('start_date'), 89)}
														label="Departure Date"
													/>
												)}
											/>
										</LocalizationProvider>
										 */}

										<DateRange
											editableDateInputs={true}
											onChange={(item) => setDateState([item.selection])}
											moveRangeOnFirstSelection={false}
											ranges={dateState}
											rangeColors={['#8e6abf']}
											minDate={new Date()}
											maxDate={addDays(dateState[0].startDate, 89)}
											className="tw-rounded-md tw-shadow-md"
										/>
									</div>
									<div className="tw-w-full lg:tw-w-fit tw-flex tw-flex-col tw-justify-center tw-items-center lg:tw-items-start lg:tw-border-l-2 lg:tw-pl-4">
										<p className="tw-font-bold tw-text-base xl:tw-text-lg tw-mb-0 tw-text-[#8e6abf]">
											Duration:{' '}
											{differenceInDays(
												new Date(dateState[0].endDate),
												new Date(dateState[0].startDate)
											) + 1}{' '}
											Days
										</p>
										<p className="tw-text-sm">
											Arrival date and departure date included
										</p>
									</div>
								</div>
							</section>
						)}

						{formStep === 4 && (
							<section
								data-aos="fade-up"
								data-aos-duration="1200"
								className="tw-flex tw-flex-col tw-items-center tw-gap-10">
								<div className="pricing-area">
									<div className="container">
										<div className="row justify-content-center">
											{plans?.map((plan) => (
												<div
													key={plan.id}
													className="col-lg-4 col-md-6 tw-transition-all"
													data-aos="fade-up"
													data-aos-duration="1200">
													<div className="tw-relative single-pricing-box">
														{selectedPlan?.id === plan.id && (
															<BsFillCheckCircleFill className="tw-text-3xl tw-text-[#171e41] tw-absolute tw-top-4 tw-right-4" />
														)}
														<h3>{plan?.name}</h3>
														<p>{plan?.coverage}</p>
														<div className="tw-w-full tw-flex tw-flex-col tw-items-start tw-mb-6">
															<div>
																<div className="price">
																	{plan?.price}
																	<span>/person</span>
																</div>
																<button
																	type="button"
																	onClick={() => setSelectedPlan(plan)}>
																	<a className="btn-style-one light-green-color">
																		Choose Plan{' '}
																		<i className="bx bx-chevron-right"></i>
																	</a>
																</button>
															</div>

															<ul className="features-list">
																{plan?.features?.map((item, index) => (
																	<li key={index}>
																		<i className="flaticon-draw-check-mark"></i>
																		{item}
																	</li>
																))}
															</ul>
														</div>

														{showMore === plan?.id && (
															<>
																<div
																	className="tw-hidden "
																	data-aos="fade-up"
																	data-aos-duration="1200">
																	<DetailsTabs tabsData={plan?.tabsData} />
																</div>

																<div className="tw-block">
																	<Accordion
																		questionsAnswers={plan?.tabsData}
																	/>
																</div>
															</>
														)}

														<div
															onClick={() => handleShowDetails(plan.id)}
															className="tw-group tw-cursor-pointer tw-w-fit tw-flex tw-justify-start tw-items-center tw-gap-2 tw-border-t-2 tw-pt-2 tw-mt-6">
															<div className="tw-flex tw-justify-center tw-items-center tw-transition-all tw-duration-500 tw-ease-in-out tw-rounded-full tw-h-6 tw-w-6 tw-text-white tw-bg-[#8e6abf] group-hover:tw-shadow-lg group-hover:tw-shadow-[#8e6abf]/50">
																{showMore !== plan?.id ? (
																	<IoAdd className="tw-text-base" />
																) : (
																	<BiMinus className="tw-text-base" />
																)}
															</div>
															<p className="tw-font-bold tw-text-sm tw-text-[#8e6abf]">
																{showMore !== plan?.id
																	? 'Show details'
																	: 'Hide details'}
															</p>
														</div>

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
											))}
										</div>
									</div>
								</div>
							</section>
						)}
						<div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-mt-4">
							{renderButton()}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Quote;
