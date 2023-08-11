'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import logo from '@/public/images/gsti_logo.jpeg';
import DefaultInput from '@/components/Input/DefaultInput';
import SelectInput from '@/components/Input/SelectInput';
import { format, differenceInDays, parseISO } from 'date-fns';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
import { countries } from '../../data/countriesData';
import {
	Accordion as MuiAccordion,
	AccordionDetails,
	AccordionSummary,
	Backdrop,
	Button,
	Checkbox,
	CircularProgress,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material';
import Accordion from '@/components/Accordion';

import {
	BiMinus,
	//BiCreditCardFront,
	BiTime,
} from 'react-icons/bi';
import { BsGlobeEuropeAfrica } from 'react-icons/bs';
//import { RiSecurePaymentLine } from 'react-icons/ri';
import axios from 'axios';
import { useMutation } from 'react-query';
//import Button from '../../components/Button/Button';
import { MdDelete, MdEdit, MdOutlineExpandMore } from 'react-icons/md';
import { IoAdd } from 'react-icons/io5';
import { AiFillSafetyCertificate, AiOutlineFilePdf } from 'react-icons/ai';
import { scrollIntoViewHelper } from 'helpers/scrollIntoViewHelper';
import { planTabsData } from 'data/plansData';

const alertError = () => {
	MySwal.fire({
		title: 'Fill all Required Fields',
		text: 'Some required fields have not been filled on the form, please fill them in and try again',
		icon: 'error',
		timer: 8000,
		timerProgressBar: true,
		showConfirmButton: false,
	});
};

const MAX_STEPS = 2;

const REVIEW_DATA = [
	{
		name: 'first name',
		key: 'first_name',
	},
	{
		name: 'last name',
		key: 'last_name',
	},
	{
		name: 'passport number',
		key: 'passport_number',
	},
	{
		name: 'Date of Birth',
		key: 'dob',
	},
	{
		name: 'email',
		key: 'email',
	},
	{
		name: 'telephone',
		key: 'telephone',
	},
	{
		name: 'address',
		key: 'address',
	},
	{
		name: 'country',
		key: 'country',
	},
	{
		name: 'company name',
		key: 'company_name',
	},
	{
		name: 'company address',
		key: 'company_address',
	},
	{
		name: 'company phone number',
		key: 'company_telephone',
	},
	{
		name: 'company email',
		key: 'company_email',
	},

	{
		name: 'emergency contact first name',
		key: 'emergency_contact_first_name',
	},
	{
		name: 'emergency contact last name',
		key: 'emergency_contact_last_name',
	},
	{
		name: 'emergency contact address',
		key: 'emergency_contact_address',
	},
	{
		name: 'emergency contact country',
		key: 'emergency_contact_country',
	},
	{
		name: 'emergency contact phone number',
		key: 'emergency_contact_telephone',
	},
	{
		name: 'arrival date in ghana',
		key: 'arrival_date',
	},
	{
		name: 'departure date from ghana',
		key: 'departure_date',
	},
	{ name: 'address in ghana', key: 'address_ghana' },
	{
		name: 'emergency contact in ghana first name',
		key: 'emergency_contact_ghana_first_name',
	},
	{
		name: 'emergency contact in ghana last name',
		key: 'emergency_contact_ghana_last_name',
	},
	{
		name: 'emergency contact in ghana phone number',
		key: 'emergency_contact_ghana_telephone',
	},
	{
		name: 'Pre-existing Medical Conditions',
		key: 'existing_conditions',
	},
	{
		name: 'allergies',
		key: 'allergies',
	},
];

const Form = () => {
	const [formStep, setFormStep] = useState(1);
	const [applicantType, setApplicantType] = useState('other');
	const [basicData, setBasicData] = useState(null);
	const [paymentAmount, setPaymentAmount] = useState(0);
	const [open, setOpen] = useState(1);
	const [showMore, setShowMore] = useState(false);

	const handleShowDetails = () => {
		setShowMore((prev) => !prev);
	};

	useEffect(() => {
		const data = window.localStorage.getItem('basicData');
		if (data !== null) setBasicData(JSON.parse(data));
	}, []);

	const {
		watch,
		control,
		setValue,
		reset,
		trigger,
		formState: { isValid, errors },
		handleSubmit,
	} = useForm({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			start_date: '',
			end_date: '',
			country: '',
			insured_person: [{}],

			applicant_type: 'other',
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'insured_person',
		rules: { maxLength: 5 },
	});

	const goToNext = () => {
		trigger();
		if (isValid) {
			setFormStep((prev) => prev + 1);
		} else {
			alertError();
			scrollIntoViewHelper(errors);
		}
	};
	const goToPrevious = () => {
		setFormStep((prev) => prev - 1);
	};

	useEffect(() => {
		if (applicantType === 'self') {
			setValue(
				`applicant[${0}].first_name`,
				watch(`insured_person[${0}].first_name`),
				{ shouldValidate: true }
			);
			setValue(
				`applicant[${0}].last_name`,
				watch(`insured_person[${0}].last_name`),
				{ shouldValidate: true }
			);
			setValue(`applicant[${0}].email`, watch(`insured_person[${0}].email`), {
				shouldValidate: true,
			});
			setValue(
				`applicant[${0}].telephone`,
				watch(`insured_person[${0}].telephone`),
				{ shouldValidate: true }
			);
		}
		if (applicantType === 'other' || applicantType === 'company') {
			setValue(`applicant[${0}].first_name`, '');
			setValue(`applicant[${0}].last_name`, '');
			setValue(`applicant[${0}].telephone`, '');
			setValue(`applicant[${0}].email`, '');
		}
	}, [watch, setValue, applicantType]);

	useEffect(() => {
		if (basicData) {
			reset({
				start_date: basicData.start_date,
				end_date: basicData.end_date,
				country: basicData.country,
				insured_person: basicData.insured_person,

				applicant_type: 'other',
			});
		}
	}, [reset, basicData]);

	useEffect(() => {
		if (basicData) {
			if (
				differenceInDays(
					new Date(basicData.end_date),
					new Date(basicData.start_date)
				) <= '30'
			) {
				setPaymentAmount(45 * watch('insured_person').length);
			} else if (
				differenceInDays(
					new Date(basicData.end_date),
					new Date(basicData.start_date)
				) > '30'
			) {
				setPaymentAmount(80 * watch('insured_person').length);
			}
		}
	}, [watch, basicData]);

	const renderButton = () => {
		if (formStep > 2) {
			return null;
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
						//disabled={!isValid}
						//onClick={goToNext}
						type="submit">
						Proceed to Payment <i className="bx bx-chevron-right"></i>
					</button>
				</div>
			);
		} else if (formStep === 1) {
			return (
				<div className="tw-w-full tw-flex tw-justify-end tw-items-center">
					<button
						//size="lg"
						className="btn-style-one dark-green-color"
						//disabled={!isValid}
						onClick={goToNext}
						type="button">
						Next <i className="bx bx-chevron-right"></i>
					</button>
				</div>
			);
		} else {
			return (
				<div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-tw-gap-5 tw-tw-mt-8">
					<Button
						//size="lg"
						//className="tw-w-full"
						onClick={goToPrevious}
						//color="red"
						//variant="outlined"
						outlined
						type="button">
						back
					</Button>
					<Button
						//size="lg"
						//className="tw-w-full tw-bg-gradient-to-br from-[#7862AF] to-[#171E41]"
						//disabled={!isValid}
						onClick={goToNext}
						type="button">
						Next
					</Button>
				</div>
			);
		}
	};

	const handleOpen = (value) => {
		setOpen(open === value ? 0 : value);
	};

	const duration = basicData
		? Number(
				differenceInDays(
					new Date(basicData.end_date),
					new Date(basicData.start_date)
				)
		  )
		: null;

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

	const submitForm = (data) => {
		//console.log(data?.applicant[0]);
		window.localStorage.setItem('basicData', null);
		window.localStorage.setItem('applicationData', JSON.stringify(data));

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
			amount: paymentAmount,
			request_id: Math.random().toString(36).substring(2, 12),
			redirect_url: 'https://gsti-test.netlify.app/authentication',
			callback_url: 'https://gsti-test.netlify.app/',
		});

		makePayment.mutate(formData);

		//console.log(formData);
		//goToNext();
	};

	return (
		<>
			<div className="tw-sticky tw-top-0 tw-z-30 tw-w-full tw-h-fit tw-flex tw-flex-col tw-justify-start tw-items-center tw-gap-3 tw-bg-white tw-px-6 tw-py-3 md:tw-py-5 md:tw-px-10 lg:tw-px-20">
				<div className="tw-w-full tw-flex tw-justify-start tw-gap-10 tw-items-center">
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
						Purchase your Plan
					</h2>

					<p className="tw-text-sm tw-shrink-0 tw-my-auto tw-block md:tw-hidden">
						Step {formStep}/{MAX_STEPS}
					</p>

					<div className="tw-w-fit tw-hidden md:tw-flex lg:tw-hidden tw-justify-center tw-items-center tw-gap-5 tw-p-3 ">
						<div className="tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-2">
							<span className="tw-flex tw-justify-start tw-items-center tw-gap-1">
								<BiTime className="tw-text-lg tw-text-gray-700" />
								<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-700 tw-border-b-2 tw-border-[#7862AF]">
									Duration
								</p>
							</span>
							<p>
								{basicData &&
									differenceInDays(
										new Date(basicData.end_date),
										new Date(basicData.start_date)
									) + 1}{' '}
								Days
							</p>
						</div>
						<div className="tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-2">
							<span className="tw-flex tw-justify-start tw-items-center tw-gap-1">
								<BsGlobeEuropeAfrica className="tw-text-lg tw-text-gray-700" />
								<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-700 tw-border-b-2 tw-border-[#7862AF]">
									Country of Residence
								</p>
							</span>
							<p>{watch('country')} </p>
						</div>
					</div>
				</div>

				<div className="tw-w-full tw-hidden md:tw-flex tw-justify-start tw-items-center tw-gap-3">
					<p className="tw-text-sm tw-pr-2 tw-border-r-2 tw-shrink-0 tw-my-auto">
						Step {formStep} of {MAX_STEPS}
					</p>

					<div className="tw-w-full tw-h-2 tw-bg-slate-300 tw-rounded-full">
						<div
							className="tw-transition-all tw-duration-500 tw-ease-in-out tw-bg-[#8e6abf] tw-h-full tw-rounded-full"
							style={{ width: `${formStep * 50}%` }}
						/>
					</div>
				</div>
			</div>

			<div className="tw-w-full tw-min-h-screen tw-h-full tw-flex tw-justify-center tw-items-start lg:tw-justify-between tw-bg-[#FEFBFB]">
				<div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-justify-start tw-items-center tw-my-10 md:tw-my-20">
					<div className="tw-w-full md:tw-w-5/6 tw-rounded-xl tw-mx-auto">
						<div className="tw-w-full tw-h-fit tw-px-8">
							<div className="tw-w-full tw-flex tw-flex-wrap-reverse tw-gap-3 tw-justify-between tw-items-center">
								<span className="">
									<span className="tw-w-fit tw-flex tw-justify-start tw-items-end tw-gap-1">
										<h2 className="tw-font-title tw-font-medium tw-text-3xl md:tw-text-5xl tw-text-[#171e41] tw-flex tw-justify-center tw-items-end tw-gap-1">
											{formStep === 1
												? 'Traveller Details'
												: 'Review and Accept Terms'}
										</h2>
									</span>
									{formStep === 1 && (
										<p className="tw-text-sm tw-text-gray-500">
											You can add up to 5 people
										</p>
									)}
								</span>
							</div>
						</div>
						<div className="tw-px-4 tw-py-5 md:tw-px-8 md:tw-py-10">
							<form onSubmit={handleSubmit(submitForm)}>
								{formStep === 1 && (
									<>
										<section className="tw-flex tw-flex-col tw-gap-8">
											<div className="tw-flex tw-flex-col tw-gap-3">
												{fields.map((inputField, index) => (
													<MuiAccordion
														//animate={customAnimation}
														expanded={open === index + 1}
														//onChange={handleOpen(index + 1)}
														key={index}
														//icon={<Icon id={index + 1} open={open} />}
														//open={open === index + 1}
														className="tw-w-full tw-border tw-border-blue-gray-100 tw-px-4 tw-rounded-lg tw-mb-2">
														<AccordionSummary
															expandIcon={
																<MdOutlineExpandMore className="tw-text-3xl" />
															}
															onClick={() => handleOpen(index + 1)}>
															<div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-pr-4">
																<div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-start tw-items-start md:tw-items-center tw-gap-3 md:tw-gap-5">
																	<h3 className="tw-text-tw-left tw-font-title tw-font-medium tw-text-2xl tw-text-[#171e41]">
																		Traveller {index + 1}
																	</h3>

																	<Typography sx={{ color: 'text.secondary' }}>
																		{watch(
																			`insured_person[${index}].first_name`
																		)}{' '}
																		{watch(
																			`insured_person[${index}].last_name`
																		)}
																	</Typography>
																</div>

																{watch('insured_person')?.length > 1 ? (
																	<div
																		onClick={() => remove(index)}
																		className="tw-cursor-pointer tw-flex tw-justify-center tw-items-center tw-transition-all tw-duration-500 tw-ease-in-out tw-rounded-full tw-h-6 tw-w-6 tw-text-red-500 hover:tw-text-white tw-bg-transparent hover:tw-shadow-lg hover:tw-shadow-red-400/50 hover:tw-bg-red-500 cursor-pointer">
																		<MdDelete className="tw-text-base" />
																	</div>
																) : null}
															</div>
														</AccordionSummary>
														<AccordionDetails //className="tw-text-base tw-font-normal pt-0"
														>
															<div
																key={inputField.id}
																className="tw-relative tw-w-full tw-h-full tw-flex tw-flex-col tw-gap-5 tw-justify-center tw-items-center ">
																{/** Personal Information Area */}
																<div className="tw-w-full tw-h-fit tw-p-2 tw-gap-10 tw-flex tw-flex-col tw-justify-start tw-items-start tw-border-y-2 tw-border-[#171e41] tw-py-10">
																	<h4 className="tw-w-full tw-text-tw-left tw-font-title tw-font-medium tw-text-xl tw-text-[#7862AF]">
																		Personal Information
																	</h4>
																	<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
																		<Controller
																			name={`insured_person[${index}].first_name`}
																			control={control}
																			defaultValue={''}
																			rules={{
																				required: 'Please enter first name',
																			}}
																			render={({
																				field: { ref, ...field },
																				fieldState: { error, invalid },
																			}) => (
																				<DefaultInput
																					{...field}
																					ref={ref}
																					error={invalid}
																					helpertext={
																						invalid ? error.message : null
																					}
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
																					helpertext={
																						invalid ? error.message : null
																					}
																					label="Last Name"
																					type="text"
																					required
																				/>
																			)}
																		/>
																	</div>

																	<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
																		<Controller
																			name={`insured_person[${index}].dob`}
																			control={control}
																			defaultValue={''}
																			rules={{
																				required:
																					'Please specify date of birth',
																			}}
																			render={({
																				field: { ref, ...field },
																				fieldState: { error, invalid },
																			}) => (
																				<DefaultInput
																					{...field}
																					ref={ref}
																					error={invalid}
																					helpertext={
																						invalid ? error.message : null
																					}
																					label="Date of Birth"
																					focused
																					max={format(new Date(), 'yyyy-MM-dd')}
																					type="date"
																					required
																				/>
																			)}
																		/>

																		<Controller
																			control={control}
																			name={`insured_person[${index}].country`}
																			defaultValue={watch('country')}
																			rules={{
																				required: 'Please select country',
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
																					label="Country of Residence"
																					options={countries}
																					required
																				/>
																			)}
																		/>
																	</div>

																	<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
																		<Controller
																			name={`insured_person[${index}].passport_number`}
																			control={control}
																			defaultValue={''}
																			rules={{
																				required:
																					'Please enter passport number',
																			}}
																			render={({
																				field: { ref, ...field },
																				fieldState: { error, invalid },
																			}) => (
																				<DefaultInput
																					{...field}
																					ref={ref}
																					error={invalid}
																					helpertext={
																						invalid ? error.message : null
																					}
																					label="Passport Number"
																					type="text"
																					required
																				/>
																			)}
																		/>
																	</div>
																</div>

																{/** Travel Information Area */}
																<div className="tw-w-full tw-h-fit tw-p-2 tw-gap-10 tw-flex tw-flex-col tw-justify-start tw-items-start tw-border-b-2 tw-border-[#171e41] tw-pb-10">
																	<h4 className="tw-w-full tw-text-tw-left tw-font-title tw-font-medium tw-text-xl tw-text-[#7862AF]">
																		Travel Information
																	</h4>
																	<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
																		<Controller
																			name={`insured_person[${index}].arrival_date`}
																			control={control}
																			defaultValue={watch('start_date')}
																			rules={{ required: 'Date is required.' }}
																			render={({
																				field: { ref, ...field },
																				fieldState: { error, invalid },
																			}) => (
																				<DefaultInput
																					{...field}
																					ref={ref}
																					error={invalid}
																					helpertext={
																						invalid ? error.message : null
																					}
																					label="Arrival date in Ghana"
																					type="date"
																					disabled
																					//required
																				/>
																			)}
																		/>
																		<Controller
																			name={`insured_person[${index}].departure_date`}
																			control={control}
																			defaultValue={watch('end_date')}
																			rules={{ required: 'Date is required.' }}
																			render={({
																				field: { ref, ...field },
																				fieldState: { error, invalid },
																			}) => (
																				<DefaultInput
																					{...field}
																					ref={ref}
																					error={invalid}
																					helpertext={
																						invalid ? error.message : null
																					}
																					label="Departure date from Ghana"
																					type="date"
																					min={watch(
																						`insured_person[${index}].arrival_date`
																					)}
																					/*
																max={format(
																	add(
																		new Date(
																			watch(
																				`insured_person[${index}].arrival_date`
																			)
																		),
																		{
																			days: 90,
																		}
																	),
																	'yyyy-MM-dd'
																)}
																*/
																					disabled
																					//required
																				/>
																			)}
																		/>
																	</div>

																	<Controller
																		name={`insured_person[${index}].address_ghana`}
																		control={control}
																		defaultValue={''}
																		render={({
																			field: { ref, ...field },
																			fieldState: { error, invalid },
																		}) => (
																			<DefaultInput
																				{...field}
																				ref={ref}
																				error={invalid}
																				helpertext={
																					invalid ? error.message : null
																				}
																				label="Address in Ghana"
																				type="text"
																			/>
																		)}
																	/>
																</div>

																{/** Contact Information Area */}
																<div className="tw-w-full tw-h-fit tw-p-2 tw-gap-10 tw-flex tw-flex-col tw-justify-start tw-items-start tw-border-b-2 tw-border-[#171e41] tw-pb-10">
																	<div className="tw-w-full tw-gap-3 tw-flex tw-flex-col tw-justify-start tw-items-start">
																		<h4 className="tw-w-full tw-text-tw-left tw-font-title tw-font-medium tw-text-xl tw-text-[#7862AF]">
																			Contact Information
																		</h4>
																		<span className="tw-bg-[#7862AF]/20 tw-w-full tw-h-fit tw-p-3 tw-rounded-lg">
																			<p className="tw-w-full tw-text-left tw-text-xs md:tw-text-sm">
																				Please provide your personal contact
																				information as well as the information
																				of your emergency contact in your home
																				country. We also require a second
																				emergency contact in Ghana.
																			</p>
																			<h6 className="tw-mt-3 tw-w-full tw-text-left tw-text-[#171e41] tw-font-semibold tw-text-xs md:tw-text-sm">
																				Why do we need this information?
																			</h6>
																			<p className="tw-w-full tw-mt-1 tw-text-left tw-text-xs md:tw-text-sm">
																				In case of any unfortunate event, the
																				emergency contacts provided below will
																				be contacted and assisted on your
																				purchased insurance and claim process.
																			</p>
																			<h6 className="tw-mt-3 tw-w-full tw-text-left tw-text-[#171e41] tw-font-semibold tw-text-xs md:tw-text-sm">
																				Note
																			</h6>
																			<p className="tw-w-full tw-mt-1 tw-text-left tw-text-xs md:tw-text-sm">
																				Phone numbers must follow the
																				international standard i.e (country code
																				then number)
																			</p>
																		</span>
																	</div>
																	<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
																		<Controller
																			name={`insured_person[${index}].email`}
																			control={control}
																			defaultValue={''}
																			rules={{
																				pattern: {
																					value:
																						/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gi,
																					message:
																						'Please enter a valid email address',
																				},
																				required: 'Please enter email',
																			}}
																			render={({
																				field: { ref, ...field },
																				fieldState: { error, invalid },
																			}) => (
																				<DefaultInput
																					{...field}
																					ref={ref}
																					error={invalid}
																					helpertext={
																						invalid ? error.message : null
																					}
																					label="Email"
																					type="email"
																					required
																				/>
																			)}
																		/>
																		<Controller
																			name={`insured_person[${index}].telephone`}
																			control={control}
																			rules={{
																				pattern: {
																					value:
																						/\+?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/gi,
																					message:
																						'Please enter a valid phone number. Phone number must follow the international standard',
																				},
																				required:
																					'Please enter telephone number',
																			}}
																			defaultValue={''}
																			render={({
																				field: { ref, ...field },
																				fieldState: { error, invalid },
																			}) => (
																				<DefaultInput
																					{...field}
																					ref={ref}
																					error={invalid}
																					helpertext={
																						invalid ? error.message : null
																					}
																					label="Phone Number"
																					type="tel"
																					required
																				/>
																			)}
																		/>
																	</div>

																	<Controller
																		name={`insured_person[${index}].address`}
																		control={control}
																		defaultValue={''}
																		render={({
																			field: { ref, ...field },
																			fieldState: { error, invalid },
																		}) => (
																			<DefaultInput
																				{...field}
																				ref={ref}
																				error={invalid}
																				helpertext={
																					invalid ? error.message : null
																				}
																				label="Address in Home Country"
																				type="text"
																			/>
																		)}
																	/>

																	<div className="tw-w-full h-fit tw-p-2 tw-gap-10 tw-flex tw-flex-col tw-justify-start tw-items-start tw-rounded-md tw-shadow-sm">
																		<h4 className="tw-w-full tw-text-tw-left tw-font-title tw-font-medium tw-text-xl tw-text-[#7862AF] tw-hidden md:tw-block">
																			Emergency Contact Information
																		</h4>
																		<h4 className="tw-w-full tw-text-tw-left tw-font-title tw-font-medium tw-text-xl tw-text-[#7862AF] md:tw-hidden">
																			Emergency Contact Info
																		</h4>
																		<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
																			<Controller
																				name={`insured_person[${index}].emergency_contact_first_name`}
																				control={control}
																				defaultValue={''}
																				rules={{
																					required: 'Please enter first name',
																				}}
																				render={({
																					field: { ref, ...field },
																					fieldState: { error, invalid },
																				}) => (
																					<DefaultInput
																						{...field}
																						ref={ref}
																						error={invalid}
																						helpertext={
																							invalid ? error.message : null
																						}
																						label="First Name"
																						type="text"
																						required
																					/>
																				)}
																			/>
																			<Controller
																				name={`insured_person[${index}].emergency_contact_last_name`}
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
																						helpertext={
																							invalid ? error.message : null
																						}
																						label="Last Name"
																						type="text"
																						required
																					/>
																				)}
																			/>
																		</div>

																		<Controller
																			name={`insured_person[${index}].emergency_contact_address`}
																			control={control}
																			defaultValue={''}
																			render={({
																				field: { ref, ...field },
																				fieldState: { error, invalid },
																			}) => (
																				<DefaultInput
																					{...field}
																					ref={ref}
																					error={invalid}
																					helpertext={
																						invalid ? error.message : null
																					}
																					label="Address"
																					type="text"
																				/>
																			)}
																		/>

																		<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
																			<Controller
																				control={control}
																				name={`insured_person[${index}].emergency_contact_country`}
																				defaultValue={watch('country')}
																				rules={{
																					required: 'Please select country',
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
																						label="Country"
																						options={countries}
																						required
																					/>
																				)}
																			/>

																			<Controller
																				name={`insured_person[${index}].emergency_contact_telephone`}
																				control={control}
																				defaultValue={''}
																				rules={{
																					pattern: {
																						value:
																							/\+?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/gi,
																						message:
																							'Please enter a valid phone number. Phone number must follow the international standard',
																					},
																					required: 'Please enter phone number',
																				}}
																				render={({
																					field: { ref, ...field },
																					fieldState: { error, invalid },
																				}) => (
																					<DefaultInput
																						{...field}
																						ref={ref}
																						error={invalid}
																						helpertext={
																							invalid ? error.message : null
																						}
																						label="Phone Number"
																						type="tel"
																						required
																					/>
																				)}
																			/>
																		</div>
																	</div>

																	<div className="tw-w-full h-fit tw-p-2 tw-gap-10 tw-flex tw-flex-col tw-justify-start tw-items-start tw-rounded-md tw-shadow-sm">
																		<h4 className="tw-w-full tw-text-tw-left tw-font-title tw-font-medium tw-text-xl tw-text-[#7862AF]">
																			Emergency Contact in Ghana
																		</h4>
																		<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
																			<Controller
																				name={`insured_person[${index}].emergency_contact_ghana_first_name`}
																				control={control}
																				defaultValue={''}
																				rules={{
																					required: 'Please enter first name',
																				}}
																				render={({
																					field: { ref, ...field },
																					fieldState: { error, invalid },
																				}) => (
																					<DefaultInput
																						{...field}
																						ref={ref}
																						error={invalid}
																						helpertext={
																							invalid ? error.message : null
																						}
																						label="First Name"
																						type="text"
																						required
																					/>
																				)}
																			/>
																			<Controller
																				name={`insured_person[${index}].emergency_contact_ghana_last_name`}
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
																						helpertext={
																							invalid ? error.message : null
																						}
																						label="Last Name"
																						type="text"
																						required
																					/>
																				)}
																			/>
																		</div>

																		<Controller
																			name={`insured_person[${index}].emergency_contact_ghana_telephone`}
																			control={control}
																			defaultValue={''}
																			rules={{
																				pattern: {
																					value:
																						/\+?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/gi,
																					message:
																						'Please enter a valid phone number. Phone number must follow the international standard',
																				},
																				required: 'Please enter phone number',
																			}}
																			render={({
																				field: { ref, ...field },
																				fieldState: { error, invalid },
																			}) => (
																				<DefaultInput
																					{...field}
																					ref={ref}
																					error={invalid}
																					helpertext={
																						invalid ? error.message : null
																					}
																					label="Phone Number"
																					type="tel"
																					required
																				/>
																			)}
																		/>
																	</div>
																</div>

																{/** Health Information Area */}
																<div className="tw-w-full tw-h-fit tw-p-2 tw-gap-10 tw-flex tw-flex-col tw-justify-start tw-items-start">
																	<div className="tw-w-full tw-gap-3 tw-flex tw-flex-col tw-justify-start tw-items-start">
																		<h4 className="tw-w-full tw-text-tw-left tw-font-title tw-font-medium tw-text-xl tw-text-[#7862AF]">
																			Health Information
																		</h4>
																		<span className="tw-bg-[#7862AF]/20 tw-w-full tw-h-fit tw-p-3 tw-rounded-lg">
																			<p className="tw-w-full tw-text-left tw-text-xs md:tw-text-sm">
																				Please let us know if you have any
																				pre-exixting health conditions and/or
																				allergies to help us better serve you.
																			</p>
																		</span>
																	</div>
																	<div className="tw-w-full tw-grid tw-grid-cols-1 tw-gap-5">
																		<Controller
																			name={`insured_person[${index}].existing_conditions`}
																			control={control}
																			defaultValue={''}
																			render={({
																				field: { ref, ...field },
																				fieldState: { error, invalid },
																			}) => (
																				<DefaultInput
																					{...field}
																					ref={ref}
																					error={invalid}
																					helpertext={
																						invalid ? error.message : null
																					}
																					label="Pre-existing Medical Conditions"
																					type="text-area"
																				/>
																			)}
																		/>
																		<Controller
																			name={`insured_person[${index}].allergies`}
																			control={control}
																			defaultValue={''}
																			render={({
																				field: { ref, ...field },
																				fieldState: { error, invalid },
																			}) => (
																				<DefaultInput
																					{...field}
																					ref={ref}
																					error={invalid}
																					helpertext={
																						invalid ? error.message : null
																					}
																					label="Allergies"
																					type="text-area"
																				/>
																			)}
																		/>
																	</div>
																</div>
															</div>
														</AccordionDetails>
													</MuiAccordion>
												))}
											</div>

											{watch('insured_person')?.length !== 5 ? (
												<div className="tw-w-full tw-flex tw-justify-end tw-items-start">
													<div>
														<div
															onClick={() =>
																append({
																	first_name: '',
																	last_name: '',
																	country: watch('country'),
																	address: '',
																	postal_zip: '',
																	city: '',
																	state: '',
																})
															}
															className="tw-group tw-cursor-pointer tw-w-fit tw-flex tw-justify-start tw-items-center tw-gap-2">
															<div className="tw-flex tw-justify-center tw-items-center tw-transition-all tw-duration-500 tw-ease-in-out tw-rounded-full tw-h-6 tw-w-6 tw-text-white tw-bg-[#8e6abf] group-hover:tw-shadow-lg group-hover:tw-shadow-[#8e6abf]/50">
																<IoAdd className="tw-text-base" />
															</div>
															<p className="tw-font-bold tw-text-sm tw-text-[#8e6abf]">
																Add traveller
															</p>
														</div>
													</div>
												</div>
											) : null}
										</section>

										<section className="tw-flex tw-flex-col tw-gap-10 tw-mt-20 tw-bg-white tw-border tw-border-b-black tw-rounded-lg tw-p-10">
											<span className="tw-flex tw-flex-wrap xl:tw-flex-nowrap tw-justify-between tw-items-center tw-gap-2 xl:tw-gap-20">
												<span className="tw-w-fit tw-relative tw-flex tw-justify-start tw-items-end tw-gap-1">
													<h3 className="tw-font-title tw-font-medium tw-text-2xl tw-text-[#171e41] tw-flex tw-justify-center tw-items-end tw-gap-1">
														Applicant
													</h3>
												</span>
												<div className="tw-w-fit">
													<Controller
														name="applicant_type"
														control={control}
														render={({
															field: { onChange, ref, ...field },
														}) => (
															<FormControl
																{...field}
																ref={ref}
																onChange={(value) => {
																	onChange(value);
																	setApplicantType(value.target.value);
																}}
																name="applicant_type">
																<RadioGroup
																	row
																	defaultValue={watch('applicant_type')}
																	name="radio-buttons-group"
																	className="tw-w-fit tw-mt-3 lg:tw-mt-0">
																	<FormControlLabel
																		name="applicant_type"
																		id="self"
																		value="self"
																		control={<Radio color="secondary" />}
																		label="Self"
																	/>
																	<FormControlLabel
																		name="applicant_type"
																		id="other"
																		value="other"
																		control={<Radio color="secondary" />}
																		label="Other"
																	/>
																	<FormControlLabel
																		name="applicant_type"
																		id="company"
																		value="company"
																		control={<Radio color="secondary" />}
																		label="Company"
																	/>
																</RadioGroup>
															</FormControl>
														)}
													/>
												</div>
											</span>

											{watch('applicant_type') === 'self' ||
											watch('applicant_type') === 'other' ? (
												<div className="tw-relative tw-w-full tw-h-full tw-flex tw-flex-col tw-gap-10 tw-justify-center tw-items-center">
													<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
														<Controller
															name={`applicant[${0}].first_name`}
															defaultValue={
																watch('applicant_type') === 'self'
																	? watch(`insured_person[0].first_name`)
																	: ''
															}
															control={control}
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
															name={`applicant[${0}].last_name`}
															defaultValue={
																watch('applicant_type') === 'self'
																	? watch(`insured_person[0].last_name`)
																	: ''
															}
															control={control}
															rules={{ required: 'Please enter last name' }}
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
																	type="text"
																	required
																/>
															)}
														/>
													</div>

													<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
														<Controller
															name={`applicant[${0}].telephone`}
															defaultValue={''}
															control={control}
															rules={{
																pattern: {
																	value:
																		/\+?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/gi,
																	message:
																		'Please enter a valid phone number. Phone number must follow the international standard',
																},
																required: 'Please enter phone number',
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
																	label="Phone number"
																	type="tel"
																	required
																/>
															)}
														/>
														<Controller
															name={`applicant[${0}].email`}
															defaultValue={''}
															control={control}
															rules={{
																pattern: {
																	value:
																		/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gi,
																	message: 'Please enter a valid email address',
																},
																required: 'Please enter email address',
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
																	label="Email"
																	type="email"
																	required
																/>
															)}
														/>
													</div>
												</div>
											) : (
												<div className="tw-relative tw-w-full tw-h-full tw-flex tw-flex-col tw-gap-10 tw-justify-center tw-items-center ">
													<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
														<Controller
															name={`applicant[${0}].company_name`}
															defaultValue={''}
															control={control}
															rules={{ required: 'Please enter company name' }}
															render={({
																field: { ref, ...field },
																fieldState: { error, invalid },
															}) => (
																<DefaultInput
																	{...field}
																	ref={ref}
																	error={invalid}
																	helpertext={invalid ? error.message : null}
																	label="Company Name"
																	type="text"
																	required
																/>
															)}
														/>
														<Controller
															name={`applicant[${0}].company_address`}
															defaultValue={''}
															control={control}
															rules={{
																required: 'Please enter company address',
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
																	label="Company address"
																	type="text"
																	required
																/>
															)}
														/>
													</div>

													<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
														<Controller
															name={`applicant[${0}].company_telephone`}
															defaultValue={''}
															control={control}
															rules={{
																pattern: {
																	value:
																		/\+?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/gi,
																	message:
																		'Please enter a valid phone number. Phone number must follow the international standard',
																},
																required: 'Please enter company phone number',
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
																	label="Company Phone number"
																	type="tel"
																	required
																/>
															)}
														/>
														<Controller
															name={`applicant[${0}].company_email`}
															defaultValue={''}
															control={control}
															rules={{
																pattern: {
																	value:
																		/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gi,
																	message: 'Please enter a valid email address',
																},
																required: 'Please enter company email',
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
																	label="Company Email"
																	type="email"
																	required
																/>
															)}
														/>
													</div>
												</div>
											)}
										</section>
									</>
								)}

								{formStep === 2 && (
									<section className="tw-flex tw-flex-col tw-gap-10">
										<div className="tw-flex tw-flex-col tw-gap-8">
											<div className="tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-1">
												{/**
												<span className="tw-w-fit tw-flex tw-justify-start tw-items-end tw-gap-1 tw-mb-3">
													<h4 className="tw-font-title tw-font-medium tw-text-2xl tw-text-[#171e41] tw-flex tw-justify-center tw-items-end tw-gap-1">
														Traveller Details
													</h4>
												</span>
												 */}

												{watch(`insured_person`).map((person, index) => (
													<MuiAccordion
														//animate={customAnimation}
														expanded={open === index + 1}
														//onChange={handleOpen(index + 1)}
														key={index}
														//icon={<Icon id={index + 1} open={open} />}
														//open={open === index + 1}
														className="tw-w-full tw-border tw-border-blue-gray-100 tw-px-4 tw-rounded-lg tw-mb-2">
														<AccordionSummary
															expandIcon={
																<MdOutlineExpandMore className="tw-text-3xl" />
															}
															onClick={() => handleOpen(index + 1)}
															/*className={`tw-border-b-0 tw-transition-colors tw-font-semibold tw-font-title tw-text-base ${
															open === index + 1
																? 'tw-text-blue-500 hover:!tw-text-blue-700'
																: ''
														}`} */
														>
															<div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-pr-4">
																<div className="tw-flex tw-justify-start tw-items-center tw-gap-5">
																	<h3 className="tw-text-tw-left tw-font-title tw-font-medium tw-text-2xl tw-text-[#7862AF]">
																		Traveller {index + 1}
																	</h3>

																	<Typography sx={{ color: 'text.secondary' }}>
																		{person.first_name} {person.last_name}
																	</Typography>
																</div>

																<div
																	onClick={goToPrevious}
																	className="tw-cursor-pointer tw-group tw-text-[#7862AF] tw-font-semibold tw-text-sm tw-flex tw-gap-2 tw-items-center">
																	<span className="tw-cursor-pointer tw-flex tw-justify-center tw-items-center tw-transition-all tw-duration-500 tw-ease-in-out tw-rounded-full tw-h-6 tw-w-6 tw-text-[#7862AF] group-hover:tw-text-white tw-bg-transparent group-hover:tw-shadow-lg group-hover:tw-shadow-[#7862AF]/50 group-hover:tw-bg-[#7862AF]">
																		<MdEdit className="tw-text-base" />
																	</span>
																	Edit
																</div>
															</div>
														</AccordionSummary>
														<AccordionDetails //className="tw-text-base tw-font-normal pt-0"
														>
															<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-3 tw-rounded-md tw-p-3 tw-shadow-sm tw-bg-white/50">
																{REVIEW_DATA.map(({ name, key }, index) => (
																	<div
																		className={
																			person[key] ? 'tw-block' : 'tw-hidden'
																		}
																		key={index}>
																		<Typography
																			variant="paragraph"
																			className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			{name}
																		</Typography>
																		<Typography
																			variant="h6"
																			className="tw-font-medium tw-text-lg">
																			{person[key]}
																		</Typography>
																	</div>
																))}
															</div>
														</AccordionDetails>
													</MuiAccordion>
												))}
											</div>

											<div className="tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-6 tw-bg-white tw-border tw-border-b-black tw-rounded-lg tw-p-10">
												<span className="tw-w-fit tw-relative tw-flex tw-justify-center tw-items-end tw-gap-1">
													<h4 className="tw-font-title tw-font-medium tw-text-2xl tw-text-[#171e41] tw-flex tw-justify-center tw-items-end tw-gap-1">
														Applicant Details
													</h4>
												</span>
												<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-3">
													{REVIEW_DATA.map(({ name, key }, index) => (
														<div
															key={index}
															className={
																watch(`applicant[${0}].${key}`)
																	? 'tw-block'
																	: 'tw-hidden'
															}>
															<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																{name}
															</p>
															<h6 className="tw-font-medium tw-text-lg">
																{watch(`applicant[${0}].${key}`)}
															</h6>
														</div>
													))}
												</div>
											</div>
										</div>

										<div className="block ">
											<Controller
												control={control}
												name={'terms_and_conditions'}
												rules={{
													required: 'Please accept terms and conditions',
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
																	checked={watch(`terms_and_conditions`)}
																/>
															}
															label={'I accept the terms and conditions'}
														/>
														<FormHelperText error>
															{invalid ? error.message : null}
														</FormHelperText>
													</>
												)}
											/>
										</div>

										<div className="tw-w-full tw-flex tw-items-center tw-justify-between tw-gap-5 tw-bg-white tw-border tw-border-b-black tw-rounded-lg tw-py-3 tw-px-10 tw-shadow-md">
											<div className="tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-1">
												<p className="tw-capitalize tw-font-normal tw-text-sm tw-text-gray-700 tw-border-b-2 tw-border-[#7862AF]">
													Standard Plan
												</p>

												<p className="tw-text-lg">
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
													x {watch('insured_person').length}
												</p>
											</div>

											<div className="tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-1">
												<p className="tw-capitalize tw-font-normal tw-text-sm tw-text-gray-700 tw-border-b-2 tw-border-[#7862AF]">
													Total
												</p>

												<span className="tw-relative tw-flex tw-justify-center tw-items-end tw-gap-1">
													<h2 className="tw-font-title tw-font-bold tw-text-xl tw-text-[#171e41] tw-flex tw-justify-center tw-items-end tw-gap-1">
														{duration &&
															Intl.NumberFormat('en-US', {
																style: 'currency',
																currency: 'USD',
															}).format(
																(duration <= 30
																	? 45
																	: duration > 30 && duration <= 60
																	? 90
																	: duration > 60 && duration <= 90
																	? 135
																	: duration > 90 && duration <= 120
																	? 180
																	: duration > 120 && duration <= 150
																	? 225
																	: duration > 150 && duration <= 180 && 270) *
																	watch('insured_person').length
															)}
													</h2>
												</span>
											</div>
										</div>
									</section>
								)}

								<div className="tw-w-full tw-flex tw-justify-end tw-items-end tw-mt-4">
									<div className="tw-w-full lg:w-1/2 tw-flex tw-justify-end tw-items-end">
										{renderButton()}
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>

				<Backdrop
					sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={makePayment.isLoading}>
					<div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-5">
						<CircularProgress color="inherit" />
						<p className="tw-text-white tw-font-medium tw-text-center tw-text-lg tw-w-2/3">
							Please wait, You will be redirected to make payment.
						</p>
					</div>
				</Backdrop>

				<div className="tw-hidden lg:tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-0 tw-bg-white tw-w-[30rem] tw-h-[85vh] tw-overflow-y-auto tw-sticky tw-top-32 tw-right-0 tw-px-10 tw-py-8">
					<p className="tw-font-title tw-font-bold tw-uppercase tw-text-sm tw-text-gray-500 tw-flex tw-justify-center tw-items-end tw-gap-1">
						best plan
					</p>
					<div
						data-aos="fade-up"
						data-aos-duration="1200"
						className="tw-w-full tw-h-fit tw-p-3 tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-4 tw-rounded-lg tw-border-2 tw-border-t-4 tw-border-t-[#8e6abf]">
						<h2 className="tw-w-full tw-capitalize tw-font-title tw-font-semibold tw-text-xl tw-text-[#8e6abf] tw-flex tw-justify-start tw-items-end tw-gap-1 tw-pb-3 tw-border-b">
							standard plan
						</h2>

						<div className="tw-w-full tw-flex tw-flex-col tw-space-y-2 tw-pb-3 tw-border-b">
							<h2 className="tw-w-full tw-font-title tw-font-medium tw-text-base tw-text-[#8e6abf] tw-flex tw-justify-start tw-items-end">
								Trip details
							</h2>
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600">
									Country of Origin
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-[#8e6abf] tw-font-bold">
									{watch('country')}
								</p>
							</div>
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600">
									Coverage Starts
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-[#8e6abf] tw-font-bold">
									{basicData &&
										format(new Date(basicData?.start_date), 'MMM dd, yyyy')}
								</p>
							</div>
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600">
									Coverage Ends
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-[#8e6abf] tw-font-bold">
									{basicData &&
										format(new Date(basicData?.end_date), 'MMM dd, yyyy')}
								</p>
							</div>
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-600">
									Duration
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-[#8e6abf] tw-font-bold">
									{basicData &&
										differenceInDays(
											new Date(basicData.end_date),
											new Date(basicData.start_date)
										) + 1}{' '}
									days
								</p>
							</div>
						</div>
						<div className="tw-w-full tw-flex tw-flex-col tw-space-y-2 tw-pb-3 tw-border-b">
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-font-semibold tw-text-gray-600">
									Price
								</div>
								<span className="tw-w-full tw-flex tw-justify-end tw-items-end tw-gap-0 tw-text-xl tw-text-[#8e6abf] tw-font-bold">
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
									<p className="tw-text-gray-500 tw-font-light tw-text-xs">
										/person
									</p>
								</span>
							</div>
							{duration && duration > 30 ? (
								<div className="tw-grid tw-grid-cols-2">
									<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-font-semibold tw-text-gray-600">
										Discount
									</div>
									<span className="tw-w-full tw-flex tw-justify-end tw-items-end tw-gap-3 tw-text-lg tw-text-[#8e6abf] tw-font-bold">
										{duration > 30 && duration <= 60
											? '10'
											: duration > 60 && duration <= 90
											? '15'
											: duration > 90 && duration <= 120
											? '20'
											: duration > 120 && duration <= 150
											? '25'
											: duration > 150 && duration <= 180 && '30'}{' '}
										%
									</span>
								</div>
							) : null}
						</div>

						<a
							href="#"
							target="_blank"
							rel="noreferrer"
							className="tw-group tw-w-full tw-flex tw-justify-start tw-items-center tw-gap-1 tw-pb-3">
							<AiOutlineFilePdf />
							<p className="tw-font-bold tw-text-xs tw-text-[#8e6abf] hover:tw-underline">
								Plan Brochure
							</p>
						</a>
					</div>
					{showMore && (
						<div className="tw-block">
							<Accordion questionsAnswers={planTabsData} />
						</div>
					)}

					<div
						onClick={handleShowDetails}
						className="tw-group tw-cursor-pointer tw-w-fit tw-flex tw-justify-start tw-items-center tw-gap-2 tw-pt-2 tw-mt-6">
						<div className="tw-flex tw-justify-center tw-items-center tw-transition-all tw-duration-500 tw-ease-in-out tw-rounded-full tw-h-4 tw-w-4 tw-text-white tw-bg-[#8e6abf] group-hover:tw-shadow-lg group-hover:tw-shadow-[#8e6abf]/50">
							{!showMore ? (
								<IoAdd className="tw-text-sm" />
							) : (
								<BiMinus className="tw-text-sm" />
							)}
						</div>
						<p className="tw-font-bold tw-text-sm tw-text-[#8e6abf]">
							{!showMore ? 'Show details' : 'Hide details'}
						</p>
					</div>
					<div
						data-aos="fade-up"
						data-aos-duration="1200"
						data-aos-delay="100"
						className="tw-mt-10 tw-w-full tw-h-fit tw-p-3 tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-4 tw-rounded-lg tw-border-2 tw-border-t-4 tw-border-t-[#8e6abf]">
						<AiFillSafetyCertificate className="tw-text-6xl tw-text-[#8e6abf]" />
						<h2 className="tw-font-title tw-font-semibold tw-text-xl tw-text-[#8e6abf] tw-flex tw-justify-start tw-items-end tw-gap-1">
							Price Guarantee
						</h2>
						<p className="tw-text-xs tw-text-center tw-gray-400">
							Insurance rates are regulated by law. You cannot find the same
							insurance plan for a lower price anywhere else.
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Form;
