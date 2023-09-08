'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import logo from '@/public/images/gsti_logo.jpeg';
import DefaultInput from '@/components/Input/DefaultInput';
import SelectInput from '@/components/Input/SelectInput';
import { differenceInDays, addDays } from 'date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
import { countries } from '../../data/countriesData';
import {
	Accordion as MuiAccordion,
	AccordionDetails,
	AccordionSummary,
	Backdrop,
	Checkbox,
	CircularProgress,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Typography,
} from '@mui/material';
import Accordion from '@/components/Accordion';

import { BiTime } from 'react-icons/bi';
import { BsGlobeEuropeAfrica } from 'react-icons/bs';
//import { RiSecurePaymentLine } from 'react-icons/ri';
//import axios from 'axios';
import { useMutation } from 'react-query';
//import Button from '../../components/Button/Button';
import { MdDelete, MdEdit, MdOutlineExpandMore } from 'react-icons/md';
import { IoAdd } from 'react-icons/io5';
//import { AiFillSafetyCertificate, AiOutlineFilePdf } from 'react-icons/ai';
//import { scrollIntoViewHelper } from 'helpers/scrollIntoViewHelper';
import { planTabsData } from 'data/plansData';
import axios from 'pages/api/axios';
//import { useRouter } from 'next/router';
//import { allergies, conditions } from 'data/conditionsAndAllergies';
import dayjs from 'dayjs';
import DependantArray from '@/components/Form/dependantArray';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { toast } from 'react-toastify';

const alertError = (title = null, text = null) => {
	MySwal.fire({
		title: title,
		html: text,
		icon: 'error',
		timer: 8000,
		timerProgressBar: true,
		showConfirmButton: false,
	});
};

const MAX_STEPS = 2;

const Form = () => {
	//const router = useRouter();

	const [formStep, setFormStep] = useState(1);
	//const [applicantType, setApplicantType] = useState('other');
	const [basicData, setBasicData] = useState(null);
	//const [paymentAmount, setPaymentAmount] = useState(0);
	//const [paymentDiscount, setPaymentDiscount] = useState(0);
	const [open, setOpen] = useState(1);
	const [showMore, setShowMore] = useState(false);
	const [prices, setPrices] = useState([]);

	/*
	const [existingConditions, setExistingConditions] = useState([]);
	const [existingAllergies, setExistingAllergies] = useState([]);

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setExistingConditions(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	const handleChangeAllergy = (event) => {
		const {
			target: { value },
		} = event;
		setExistingAllergies(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};
	*/

	const handleShowDetails = () => {
		setShowMore((prev) => !prev);
	};

	useEffect(() => {
		const data = window.sessionStorage.getItem('basicData');
		if (data !== null) setBasicData(JSON.parse(data));
	}, []);

	/*
	const duration = basicData
		? Number(
				differenceInDays(
					new Date(basicData.end_date),
					new Date(basicData.start_date)
				) + 1
		  )
		: null;
	*/

	let subTotal = 0;

	const {
		watch,
		control,
		setValue,
		reset,
		trigger,
		formState: {
			isValid,
			//, errors
		},
		handleSubmit,
	} = useForm({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			start_date: '',
			end_date: '',
			country: '',
			insured_person: [
				{
					dependants: [],
				},
			],

			//: 'other',
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'insured_person',
		//rules: { maxLength: 5 },
	});

	const calculatePrices = () => {
		let userPrices = [];
		let travelDurationPerTraveller = null;
		watch('insured_person').map((traveller, index) => {
			travelDurationPerTraveller =
				differenceInDays(
					new Date(traveller.departure_date),
					new Date(traveller.arrival_date)
				) + 1;

			return userPrices.push({
				traveller_no: index + 1,
				no_of_travellers: traveller.dependants?.length + 1,
				duration: travelDurationPerTraveller,
				discount:
					travelDurationPerTraveller <= 30
						? 0
						: travelDurationPerTraveller > 30 &&
						  travelDurationPerTraveller <= 60
						? 10
						: travelDurationPerTraveller > 60 &&
						  travelDurationPerTraveller <= 90
						? 15
						: travelDurationPerTraveller > 90 &&
						  travelDurationPerTraveller <= 120
						? 20
						: travelDurationPerTraveller > 120 &&
						  travelDurationPerTraveller <= 150
						? 25
						: travelDurationPerTraveller > 150 &&
						  travelDurationPerTraveller <= 180 &&
						  30,
				price:
					travelDurationPerTraveller <= 30
						? 45
						: travelDurationPerTraveller > 30 &&
						  travelDurationPerTraveller <= 60
						? 90 - 90 / 10
						: travelDurationPerTraveller > 60 &&
						  travelDurationPerTraveller <= 90
						? 135 - 135 / 15
						: travelDurationPerTraveller > 90 &&
						  travelDurationPerTraveller <= 120
						? 180 - 180 / 20
						: travelDurationPerTraveller > 120 &&
						  travelDurationPerTraveller <= 150
						? 225 - 225 / 25
						: travelDurationPerTraveller > 150 &&
						  travelDurationPerTraveller <= 180 &&
						  270 - 270 / 30,
			});
		});

		setPrices(userPrices);
	};

	const goToNext = () => {
		trigger();
		if (isValid) {
			setFormStep((prev) => prev + 1);
		} else {
			//scrollIntoViewHelper(errors);

			toast.error('Please fill all required fields');
		}
	};

	const goToPrevious = () => {
		setFormStep((prev) => prev - 1);
	};

	useEffect(() => {
		if (basicData) {
			reset({
				start_date: basicData.start_date,
				end_date: basicData.end_date,
				country: basicData.country,
				insured_person: basicData.insured_person,
			});
		}
	}, [reset, basicData]);

	const renderButton = () => {
		if (formStep > 2) {
			return null;
		} else if (formStep === 2) {
			return (
				<div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-gap-5">
					<span
						className="btn-style-back crimson-color tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-rotate-180 tw-shadow-md tw-justify-center tw-items-center tw-text-3xl"
						onClick={goToPrevious}>
						<i className="bx bx-chevron-right"></i>
					</span>
					<button
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
						className="btn-style-one dark-green-color"
						//disabled={!isValid}
						onClick={() => {
							goToNext();
							calculatePrices();
						}}
						type="button">
						Next <i className="bx bx-chevron-right"></i>
					</button>
				</div>
			);
		} else {
			return (
				<div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-tw-gap-5 tw-tw-mt-8">
					<span
						className="btn-style-back crimson-color tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-rotate-180 tw-shadow-md tw-justify-center tw-items-center tw-text-3xl"
						onClick={goToPrevious}>
						<i className="bx bx-chevron-right"></i>
					</span>
					<button
						className="btn-style-one dark-green-color"
						//disabled={!isValid}
						//onClick={goToNext}
						type="submit">
						Next <i className="bx bx-chevron-right"></i>
					</button>
				</div>
			);
		}
	};

	const handleOpen = (value) => {
		setOpen(open === value ? 0 : value);
	};

	const paymentRequest = async (data) => {
		const { data: response } = await axios.post('/register', data);
		return response;
	};

	const makePayment = useMutation(
		(paymentData) => paymentRequest(paymentData),
		{
			onSuccess: (data) => {
				//console.log('Success response ', data);
				if (data?.status === 200) {
					toast.success('Submitted');
					toast('Redirecting', {
						position: 'top-right',
						autoClose: 6000,
						hideProgressBar: false,
						closeOnClick: false,
						pauseOnHover: false,
						draggable: false,
						progress: undefined,
						theme: 'light',
					});

					window.sessionStorage.clear();

					window.location.replace(data?.checkoutUrl);

					//makeTestPayment.mutate(testPayData);
					//router.push(`/authentication`);
					//console.log(data);
				} else {
					if (!data?.success) {
						Object.values(data?.data).map((value) => {
							return toast.error(value[0]);
						});
					}
				}
			},
			onError: (error) => {
				toast.error(error?.message);
				//toast.error(error?.response);

				if (error?.response?.data?.errors) {
					Object.values(error?.response?.data?.errors).map((value) => {
						return toast.error(value[0]);
					});
				}

				/*
				alertError(
					'Submission Error',
					Object.values(error?.response?.data?.errors).map((value, index) => {
						return (
							<p key={index}>
								`${index + 1}. ${value}`<br />
							</p>
						);
					})
				);
				*/
			},
		}
	);

	const submitForm = (data) => {
		window.sessionStorage.setItem('basicData', JSON.stringify(data));

		let insuredData = [];

		data?.insured_person.map((person, index) => {
			return insuredData.push({
				...person,
				name: `${person?.first_name} ${person?.last_name}`,
				price: prices[index]?.price,
				discount: prices[index]?.discount,
				duration: prices[index]?.duration,
			});
		});

		const onboardingData = {
			/*
			name:
				data?.// === 'company'
					? data?.applicant[0]?.company_name
					: data?.applicant[0]?.first_name,

			first_name:
				data?.// === 'company'
					? data?.applicant[0]?.company_name
					: data?.applicant[0]?.first_name,
			last_name:
				data?.// === 'company'
					? data?.applicant[0]?.company_address
					: data?.applicant[0]?.last_name,
			email:
				data?.// === 'company'
					? data?.applicant[0]?.company_email
					: data?.applicant[0]?.email,
			telephone:
				data?.// === 'company'
					? data?.applicant[0]?.company_telephone
					: data?.applicant[0]?.telephone,
			country: data?.country,
			//: data?.//,
			*/
			insured_person: insuredData,
			total_price: subTotal,
			/*
			start_date: data?.start_date,
			end_date: data?.end_date,
			duration: duration,
			price: paymentAmount,
			discount: paymentDiscount,
			*/
		};

		makePayment.mutate(onboardingData);
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
									{/*formStep === 1 && (
										<p className="tw-text-sm tw-text-gray-500">
											You can add up to 5 people
										</p>
									)*/}
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
														id={`insured person ${index}`}
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
															onClick={() => {
																handleOpen(index + 1);
																window.scrollTo({ top: 0, behavior: 'smooth' });
															}}>
															<div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-pr-4">
																<div className="tw-grid tw-grid-cols-2 md:tw-flex tw-justify-start tw-items-start md:tw-items-center tw-gap-3 md:tw-gap-5">
																	<h3 className="tw-text-tw-left tw-font-title tw-font-medium tw-text-2xl tw-text-[#171e41]">
																		Traveller {index + 1}
																	</h3>

																	<span className="tw-bg-[#7862AF]/20 tw-w-fit tw-h-fit tw-px-3 tw-py-1 tw-rounded-lg">
																		<Typography sx={{ color: '#7862AF' }}>
																			Primary
																		</Typography>
																	</span>

																	<Typography
																		className="tw-col-span-2"
																		sx={{ color: 'text.secondary' }}>
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
																	<h4 className="tw-w-full tw-text-tw-left tw-font-title tw-font-medium tw-text-2xl tw-text-[#7862AF]">
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
																				valueAsDate: true,
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
																				<FormControl error={invalid}>
																					<LocalizationProvider
																						dateAdapter={AdapterDateFns}>
																						<DatePicker
																							{...field}
																							ref={ref}
																							maxDate={new Date()}
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
																							label="Date of Birth"
																							format="dd/MM/yyyy"
																							slotProps={{
																								textField: {
																									placeholder: 'Date of Birth',
																								},
																							}}
																						/>
																					</LocalizationProvider>
																					<FormHelperText>
																						{invalid ? error.message : null}
																					</FormHelperText>
																				</FormControl>
																			)}
																		/>

																		<Controller
																			name={`insured_person[${index}].gender`}
																			control={control}
																			defaultValue={''}
																			rules={{
																				required: 'Please select gender',
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
																					label="Gender"
																					options={[
																						{
																							name: 'Male',
																							value: 'Male',
																						},
																						{
																							name: 'Female',
																							value: 'Female',
																						},
																					]}
																					required
																				/>
																			)}
																		/>
																	</div>

																	<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
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
																	<h4 className="tw-w-full tw-text-tw-left tw-font-title tw-font-medium tw-text-2xl tw-text-[#7862AF]">
																		Travel Information
																	</h4>
																	<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
																		<Controller
																			name={`insured_person[${index}].arrival_date`}
																			control={control}
																			defaultValue={
																				new Date(watch('start_date'))
																			}
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
																				<FormControl error={invalid}>
																					<LocalizationProvider
																						dateAdapter={AdapterDateFns}>
																						<DatePicker
																							{...field}
																							ref={ref}
																							minDate={new Date()}
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
																							label="Arrival date in Ghana"
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
																			name={`insured_person[${index}].departure_date`}
																			control={control}
																			defaultValue={new Date(watch('end_date'))}
																			rules={{ required: 'Date is required.' }}
																			render={({
																				field: {
																					value,
																					onChange,
																					ref,
																					...field
																				},
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
																									`insured_person[${index}].arrival_date`
																								)
																									? new Date(
																											watch(
																												`insured_person[${index}].arrival_date`
																											)
																									  )
																									: new Date()
																							}
																							maxDate={addDays(
																								new Date(
																									watch(
																										`insured_person[${index}].arrival_date`
																									)
																								),
																								180
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
																							label="Departure date from Ghana"
																							format="dd/MM/yyyy"
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
																		name={`insured_person[${index}].address_ghana`}
																		control={control}
																		defaultValue={''}
																		rules={{
																			required: 'Please enter address',
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
																				label="Address in Ghana"
																				type="text"
																				required
																			/>
																		)}
																	/>
																</div>

																{/** Contact Information Area */}
																<div className="tw-w-full tw-h-fit tw-p-2 tw-gap-10 tw-flex tw-flex-col tw-justify-start tw-items-start tw-border-b-2 tw-border-[#171e41] tw-pb-10">
																	<div className="tw-w-full tw-gap-3 tw-flex tw-flex-col tw-justify-start tw-items-start">
																		<h4 className="tw-w-full tw-text-tw-left tw-font-title tw-font-medium tw-text-2xl tw-text-[#7862AF]">
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
																				<FormControl error={invalid} required>
																					<PhoneInput
																						{...field}
																						ref={ref}
																						specialLabel="Phone number"
																						placeholder="Phone number"
																						searchStyle={{
																							width: '90%',
																							height: '40px',
																						}}
																						error={invalid}
																						searchPlaceholder="Find country"
																						inputStyle={{
																							width: '100%',
																							height: '55px',
																							borderColor: invalid
																								? 'red'
																								: '#616B7D',
																						}}
																						//excludeCountries={['gh']}
																						country={'us'}
																						countryCodeEditable={false}
																						enableSearch={true}
																					/>
																					<FormHelperText>
																						{invalid ? error.message : null}
																					</FormHelperText>
																				</FormControl>
																			)}
																		/>
																	</div>

																	<Controller
																		name={`insured_person[${index}].address`}
																		control={control}
																		defaultValue={''}
																		rules={{
																			required: 'Please enter address',
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
																				label="Address in Home Country"
																				type="text"
																				required
																			/>
																		)}
																	/>

																	<div className="tw-w-full h-fit tw-p-2 tw-gap-10 tw-flex tw-flex-col tw-justify-start tw-items-start tw-rounded-md tw-shadow-sm">
																		<h4 className="tw-w-full tw-text-tw-left tw-font-title tw-font-medium tw-text-2xl tw-text-[#7862AF] tw-hidden md:tw-block">
																			Emergency Contact Information
																		</h4>
																		<h4 className="tw-w-full tw-text-tw-left tw-font-title tw-font-medium tw-text-2xl tw-text-[#7862AF] md:tw-hidden">
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
																			rules={{
																				required: 'Please enter address',
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
																					label="Address"
																					type="text"
																					required
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
																					<FormControl error={invalid} required>
																						<PhoneInput
																							{...field}
																							ref={ref}
																							specialLabel="Phone number"
																							placeholder="Phone number"
																							searchStyle={{
																								width: '90%',
																								height: '40px',
																							}}
																							error={invalid}
																							searchPlaceholder="Find country"
																							inputStyle={{
																								width: '100%',
																								height: '55px',
																								borderColor: invalid
																									? 'red'
																									: '#616B7D',
																							}}
																							//excludeCountries={['gh']}
																							country={'us'}
																							countryCodeEditable={false}
																							enableSearch={true}
																						/>
																						<FormHelperText>
																							{invalid ? error.message : null}
																						</FormHelperText>
																					</FormControl>
																				)}
																			/>
																		</div>
																	</div>

																	<div className="tw-w-full h-fit tw-p-2 tw-gap-10 tw-flex tw-flex-col tw-justify-start tw-items-start tw-rounded-md tw-shadow-sm">
																		<h4 className="tw-w-full tw-text-tw-left tw-font-title tw-font-medium tw-text-2xl tw-text-[#7862AF]">
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

																		<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
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
																					<FormControl
																						error={invalid}
																						sx={{ width: '100%' }}
																						required>
																						<PhoneInput
																							{...field}
																							ref={ref}
																							specialLabel="Phone number"
																							placeholder="Phone number"
																							error={invalid}
																							//searchPlaceholder="Find country"
																							inputStyle={{
																								width: '100%',
																								height: '55px',
																								borderColor: invalid
																									? 'red'
																									: '#616B7D',
																							}}
																							onlyCountries={['gh']}
																							country={'gh'}
																							countryCodeEditable={false}
																							enableSearch={false}
																						/>
																						<FormHelperText>
																							{invalid ? error.message : null}
																						</FormHelperText>
																					</FormControl>
																				)}
																			/>
																		</div>
																	</div>
																</div>

																{/** Dependant Information Area */}
																<div className="tw-w-full tw-h-fit tw-p-2 tw-gap-10 tw-flex tw-flex-col tw-justify-start tw-items-start">
																	<div className="tw-w-full tw-gap-3 tw-flex tw-flex-col tw-justify-start tw-items-start">
																		<h4 className="tw-w-full tw-text-tw-left tw-font-title tw-font-medium tw-text-2xl tw-text-[#7862AF]">
																			{/* Health Information */} Dependants
																			Information
																		</h4>
																		<span className="tw-bg-[#7862AF]/20 tw-w-full tw-h-fit tw-p-3 tw-rounded-lg">
																			<p className="tw-w-full tw-text-left tw-text-xs md:tw-text-sm">
																				Travelling with your family? You can add
																				on your spouse and children here
																			</p>
																		</span>
																	</div>

																	{/**
																	<div className="tw-w-full tw-grid tw-grid-cols-1 tw-gap-5">
																		<Controller
																			name={`insured_person[${index}].existing_conditions`}
																			control={control}
																			defaultValue={''}
																			render={({
																				field: { onChange, ref, ...field },
																				//fieldState: { error, invalid },
																			}) => (
																				<FormControl sx={{ width: '100%' }}>
																					<InputLabel id="existing-conditions-checkbox-label">
																						Pre-existing Medical Conditions
																					</InputLabel>
																					<Select
																						{...field}
																						ref={ref}
																						labelId="existing-conditions-checkbox-label"
																						id="existing-conditions-checkbox"
																						multiple
																						value={existingConditions}
																						onChange={(e) => {
																							onChange(e.target.value);
																							handleChange(e);
																						}}
																						input={
																							<OutlinedInput label="Pre-existing Medical Conditions" />
																						}
																						renderValue={(selected) =>
																							selected.join(', ')
																						}
																						//MenuProps={MenuProps}
																					>
																						{conditions.map((name) => (
																							<MenuItem key={name} value={name}>
																								<Checkbox
																									checked={
																										existingConditions.indexOf(
																											name
																										) > -1
																									}
																								/>
																								<ListItemText primary={name} />
																							</MenuItem>
																						))}
																					</Select>
																				</FormControl>
																			)}
																		/>
																		
																		<Controller
																			name={`insured_person[${index}].allergies`}
																			control={control}
																			defaultValue={''}
																			render={({
																				field: { onChange, ref, ...field },
																				//fieldState: { error, invalid },
																			}) => (
																				<FormControl sx={{ width: '100%' }}>
																					<InputLabel id="allergies-checkbox-label">
																						Allergies
																					</InputLabel>
																					<Select
																						{...field}
																						ref={ref}
																						labelId="allergies-checkbox-label"
																						id="allergies-checkbox"
																						multiple
																						value={existingAllergies}
																						onChange={(e) => {
																							onChange(e.target.value);
																							handleChangeAllergy(e);
																						}}
																						input={
																							<OutlinedInput label="Allergies" />
																						}
																						renderValue={(selected) =>
																							selected.join(', ')
																						}
																						//MenuProps={MenuProps}
																					>
																						{allergies.map((name) => (
																							<MenuItem key={name} value={name}>
																								<Checkbox
																									checked={
																										existingAllergies.indexOf(
																											name
																										) > -1
																									}
																								/>
																								<ListItemText primary={name} />
																							</MenuItem>
																						))}
																					</Select>
																				</FormControl>
																			)}
																		/>
																	</div>
																	 */}

																	<DependantArray
																		nestIndex={index}
																		{...{ control, watch, setValue }}
																	/>
																</div>
															</div>
														</AccordionDetails>
													</MuiAccordion>
												))}
											</div>

											<div className="tw-w-full tw-flex tw-justify-start tw-items-start">
												<div>
													<div
														onClick={() =>
															append({
																first_name: '',
																last_name: '',
																country: '',
																address: '',
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
												</div>
											</div>
										</section>

										{/**
										<section className="tw-flex tw-flex-col tw-gap-10 tw-mt-20 tw-bg-white tw-border tw-border-b-black tw-rounded-lg tw-p-10">
											<span className="tw-flex tw-flex-wrap xl:tw-flex-nowrap tw-justify-between tw-items-center tw-gap-2 xl:tw-gap-20">
												<span className="tw-w-fit tw-relative tw-flex tw-justify-start tw-items-end tw-gap-1">
													<h3 className="tw-font-title tw-font-medium tw-text-2xl tw-text-[#171e41] tw-flex tw-justify-center tw-items-end tw-gap-1">
														Applicant
													</h3>
												</span>
												<div className="tw-w-fit">
													<Controller
														name="//"
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
																name="//">
																<RadioGroup
																	row
																	defaultValue={watch('//')}
																	name="radio-buttons-group"
																	className="tw-w-fit tw-mt-3 lg:tw-mt-0">
																	<FormControlLabel
																		name="//"
																		id="self"
																		value="self"
																		control={<Radio color="secondary" />}
																		label="Self"
																	/>
																	<FormControlLabel
																		name="//"
																		id="other"
																		value="other"
																		control={<Radio color="secondary" />}
																		label="Other"
																	/>
																	<FormControlLabel
																		name="//"
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

											{watch('//') === 'self' ||
											watch('//') === 'other' ? (
												<div className="tw-relative tw-w-full tw-h-full tw-flex tw-flex-col tw-gap-10 tw-justify-center tw-items-center">
													<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
														<Controller
															name={`applicant[${0}].first_name`}
															defaultValue={
																watch('//') === 'self'
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
																watch('//') === 'self'
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
										 */}
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
																<div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-start tw-items-start md:tw-items-center tw-gap-3 md:tw-gap-5">
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
															{/** Personal Information Area */}

															<div className="tw-w-full tw-h-fit tw-p-2 tw-gap-3 tw-flex tw-flex-col tw-justify-start tw-items-start tw-border-[#171e41] tw-pb-4">
																<h4 className="tw-w-full tw-pb-2 tw-border-b-2 tw-border-[#171e41] tw-text-tw-left tw-font-title tw-font-medium tw-text-2xl tw-text-[#171e41]">
																	Personal Information
																</h4>
																<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 2xl:tw-grid-cols-3 tw-gap-5 tw-rounded-md tw-p-3">
																	<div>
																		<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			First name
																		</p>
																		<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																			{person['first_name']}
																		</p>
																	</div>
																	<div>
																		<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			last name
																		</p>
																		<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																			{person['last_name']}
																		</p>
																	</div>
																	<div>
																		<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			gender
																		</p>
																		<p className="tw-capitalize tw-font-medium tw-text-base tw-text-[#171e41]">
																			{person['gender']}
																		</p>
																	</div>

																	<div>
																		<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			passport number
																		</p>
																		<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																			{person['passport_number']}
																		</p>
																	</div>
																	<div>
																		<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			date of birth
																		</p>
																		<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																			{dayjs(person['dob']).format(
																				'MMM DD, YYYY'
																			)}
																		</p>
																	</div>
																	<div>
																		<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			email
																		</p>
																		<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																			{person['email']}
																		</p>
																	</div>
																	<div>
																		<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			telephone
																		</p>
																		<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																			+{person['telephone']}
																		</p>
																	</div>
																	<div>
																		<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			address
																		</p>
																		<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																			{person['address']}
																		</p>
																	</div>
																</div>
															</div>

															{/** Travel Information Area */}

															<div className="tw-w-full tw-h-fit tw-p-2 tw-gap-3 tw-flex tw-flex-col tw-justify-start tw-items-start tw-border-[#171e41] tw-pb-4">
																<h4 className="tw-w-full tw-pb-2 tw-border-b-2 tw-border-[#171e41] tw-text-tw-left tw-font-title tw-font-medium tw-text-2xl tw-text-[#171e41]">
																	Travel Information
																</h4>
																<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 2xl:tw-grid-cols-3 tw-gap-5 tw-rounded-md tw-p-3">
																	<div>
																		<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			country of origin
																		</p>
																		<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																			{person['country']}
																		</p>
																	</div>
																	<div>
																		<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			arrival date
																		</p>
																		<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																			{dayjs(person['arrival_date']).format(
																				'MMM DD, YYYY'
																			)}
																		</p>
																	</div>
																	<div>
																		<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			departure date
																		</p>
																		<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																			{dayjs(person['departure_date']).format(
																				'MMM DD, YYYY'
																			)}
																		</p>
																	</div>
																	<div>
																		<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			address in ghana
																		</p>
																		<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																			{person['address_ghana']}
																		</p>
																	</div>
																</div>
															</div>

															{/** Emergency Contact Information Area */}

															<div className="tw-w-full tw-h-fit tw-p-2 tw-gap-3 tw-flex tw-flex-col tw-justify-start tw-items-start tw-border-[#171e41] tw-pb-4">
																<h4 className="tw-w-full tw-pb-2 tw-border-b-2 tw-border-[#171e41] tw-text-tw-left tw-font-title tw-font-medium tw-text-2xl tw-text-[#171e41]">
																	Emergency Contact Information
																</h4>
																<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 2xl:tw-grid-cols-3 tw-gap-5 tw-rounded-md tw-p-3">
																	<div>
																		<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			first name
																		</p>
																		<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																			{person['emergency_contact_first_name']}
																		</p>
																	</div>
																	<div>
																		<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			last name
																		</p>
																		<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																			{person['emergency_contact_last_name']}
																		</p>
																	</div>
																	<div>
																		<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			address
																		</p>
																		<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																			{person['emergency_contact_address']}
																		</p>
																	</div>
																	<div>
																		<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			phone number
																		</p>
																		<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																			+{person['emergency_contact_telephone']}
																		</p>
																	</div>
																	<div>
																		<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			country
																		</p>
																		<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																			{person['emergency_contact_country']}
																		</p>
																	</div>
																</div>
															</div>

															{/** Emergency Contact in Ghana Information Area */}

															<div className="tw-w-full tw-h-fit tw-p-2 tw-gap-3 tw-flex tw-flex-col tw-justify-start tw-items-start tw-border-[#171e41] tw-pb-4">
																<h4 className="tw-w-full tw-pb-2 tw-border-b-2 tw-border-[#171e41] tw-text-tw-left tw-font-title tw-font-medium tw-text-2xl tw-text-[#171e41]">
																	Emergency Contact in Ghana Information
																</h4>
																<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 2xl:tw-grid-cols-3 tw-gap-5 tw-rounded-md tw-p-3">
																	<div>
																		<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			first name
																		</p>
																		<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																			{
																				person[
																					'emergency_contact_ghana_first_name'
																				]
																			}
																		</p>
																	</div>
																	<div>
																		<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			last name
																		</p>
																		<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																			{
																				person[
																					'emergency_contact_ghana_last_name'
																				]
																			}
																		</p>
																	</div>
																	<div>
																		<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																			phone number
																		</p>
																		<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																			+
																			{
																				person[
																					'emergency_contact_ghana_telephone'
																				]
																			}
																		</p>
																	</div>
																</div>
															</div>

															{/** Dependant Information Area */}

															{person.dependants?.length > 0 ? (
																<div className="tw-w-full tw-h-fit tw-p-2 tw-gap-3 tw-flex tw-flex-col tw-justify-start tw-items-start tw-border-[#171e41] tw-pb-4">
																	<h4 className="tw-w-full tw-pb-2 tw-border-b-2 tw-border-[#171e41] tw-text-tw-left tw-font-title tw-font-medium tw-text-2xl tw-text-[#171e41]">
																		Dependants Information
																	</h4>
																	{person.dependants?.map(
																		(dependant, index) => (
																			<div
																				key={index}
																				className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 2xl:tw-grid-cols-3 tw-gap-5 tw-rounded-md tw-p-3 tw-border-b">
																				<div>
																					<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																						First name
																					</p>
																					<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																						{dependant['first_name']}
																					</p>
																				</div>
																				<div>
																					<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																						Last name
																					</p>
																					<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																						{dependant['last_name']}
																					</p>
																				</div>
																				<div>
																					<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																						Email
																					</p>
																					<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																						{dependant['email']}
																					</p>
																				</div>
																				<div>
																					<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																						Phone number
																					</p>
																					<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																						+{dependant['telephone']}
																					</p>
																				</div>
																				<div>
																					<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																						Date of Birth
																					</p>
																					<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																						{dayjs(dependant['dob']).format(
																							'MMM DD, YYYY'
																						)}
																					</p>
																				</div>
																				<div>
																					<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																						Gender
																					</p>
																					<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																						{dependant['gender']}
																					</p>
																				</div>
																				<div>
																					<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																						Passport number
																					</p>
																					<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																						{dependant['passport_number']}
																					</p>
																				</div>
																				<div>
																					<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																						Relationship type
																					</p>
																					<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																						{dependant['relationship_type']}
																					</p>
																				</div>
																			</div>
																		)
																	)}
																</div>
															) : null}
														</AccordionDetails>
													</MuiAccordion>
												))}
											</div>

											{/**
											<div className="tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-6 tw-bg-white tw-border tw-border-b-black tw-rounded-lg tw-p-10">
												<span className="tw-w-fit tw-relative tw-flex tw-justify-center tw-items-end tw-gap-1">
													<h4 className="tw-font-title tw-font-medium tw-text-2xl tw-text-[#171e41] tw-flex tw-justify-center tw-items-end tw-gap-1">
														Applicant Details
													</h4>
												</span>
												{watch('//') !== 'company' ? (
													<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-3">
														<div>
															<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																First name
															</p>
															<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																{watch(`applicant[${0}].first_name`)}
															</p>
														</div>
														<div>
															<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																last name
															</p>
															<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																{watch(`applicant[${0}].last_name`)}
															</p>
														</div>

														<div>
															<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																email
															</p>
															<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																{watch(`applicant[${0}].telephone`)}
															</p>
														</div>
														<div>
															<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																telephone
															</p>
															<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																{watch(`applicant[${0}].email`)}
															</p>
														</div>
													</div>
												) : (
													<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-3">
														<div>
															<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																company name
															</p>
															<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																{watch(`applicant[${0}].company_name`)}
															</p>
														</div>
														<div>
															<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																company address
															</p>
															<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																{watch(`applicant[${0}].company_address`)}
															</p>
														</div>

														<div>
															<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																company email
															</p>
															<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																{watch(`applicant[${0}].company_telephone`)}
															</p>
														</div>
														<div>
															<p className="tw-capitalize tw-font-normal tw-text-xs tw-text-gray-500">
																company telephone
															</p>
															<p className="tw-font-medium tw-text-base tw-text-[#171e41]">
																{watch(`applicant[${0}].company_email`)}
															</p>
														</div>
													</div>
												)}
											</div>
											 */}
										</div>

										<div className="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-5 tw-bg-white tw-border tw-border-b-black tw-rounded-lg tw-py-3 tw-px-8 tw-shadow-md">
											<h4 className="tw-w-full tw-pb-2 tw-border-b-2 tw-border-[#7862AF] tw-text-tw-left tw-font-title tw-font-medium tw-text-2xl tw-text-[#7862AF]">
												Summary
											</h4>

											{prices.map((traveller, index) => {
												subTotal +=
													traveller?.price * traveller?.no_of_travellers;
												return (
													<div
														key={index}
														className="tw-w-full tw-flex tw-items-center tw-justify-between tw-gap-5 ">
														<div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
															<span className="tw-capitalize tw-w-24 tw-font-normal tw-text-sm tw-text-gray-700 tw-pr-2 tw-border-r-2 tw-border-[#7862AF]">
																Traveller {traveller?.traveller_no}
															</span>

															<p className="tw-text-base">
																{Intl.NumberFormat('en-US', {
																	style: 'currency',
																	currency: 'USD',
																}).format(traveller?.price)}{' '}
																x {traveller?.no_of_travellers}
															</p>
														</div>

														<div className="tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-1">
															<span className="tw-relative tw-flex tw-justify-center tw-items-end tw-gap-1">
																<p className="tw-text-base">
																	{Intl.NumberFormat('en-US', {
																		style: 'currency',
																		currency: 'USD',
																	}).format(
																		traveller?.price *
																			traveller?.no_of_travellers
																	)}
																</p>
															</span>
														</div>
													</div>
												);
											})}

											<div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-gap-5 tw-pt-2 tw-border-t-2 tw-border-[#171e41]">
												<span className="tw-capitalize tw-font-normal tw-text-lg tw-text-[#171e41]">
													Sub Total
												</span>

												<h2 className="tw-font-medium tw-text-xl tw-text-[#7862AF] tw-flex tw-justify-center tw-items-end tw-gap-1">
													{Intl.NumberFormat('en-US', {
														style: 'currency',
														currency: 'USD',
													}).format(subTotal)}
												</h2>
											</div>
										</div>

										<div className="block ">
											<Controller
												control={control}
												name={'terms_and_conditions'}
												defaultValue={false}
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
									</section>
								)}

								<div className="tw-w-full tw-flex tw-justify-end tw-items-end tw-mt-4">
									<div className="tw-w-full lg:w-1/2 tw-flex tw-justify-end tw-items-end">
										{renderButton()}
									</div>
								</div>
							</form>
						</div>

						{showMore && (
							<div className="tw-block">
								<Accordion questionsAnswers={planTabsData} />
							</div>
						)}

						<div
							onClick={handleShowDetails}
							className="tw-font-bold tw-text-sm tw-bg-white tw-py-3 tw-px-6 tw-rounded-xl tw-shadow-sm tw-cursor-pointer tw-w-fit tw-flex tw-justify-start tw-items-center tw-gap-2 tw-mt-6 tw-transition-all tw-duration-500 tw-ease-in-out hover:tw-text-white tw-text-[#8e6abf] hover:tw-bg-[#8e6abf] hover:tw-shadow-lg hover:tw-shadow-[#8e6abf]/50">
							{!showMore ? 'Show Plan Details' : 'Hide Plan Details'}
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
						summary
					</p>

					{watch('insured_person').map((traveller, index) => {
						let travelDuration =
							differenceInDays(
								new Date(watch(`insured_person[${index}].departure_date`)),
								new Date(watch(`insured_person[${index}].arrival_date`))
							) + 1;

						return (
							<div
								key={index}
								//data-aos="fade-up"
								//data-aos-duration="1200"
								className="tw-w-full tw-h-fit tw-p-3 tw-mb-4 tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-4 tw-rounded-lg tw-border-2 tw-border-t-4 tw-border-t-[#8e6abf]">
								<h2 className="tw-w-full tw-capitalize tw-font-title tw-font-semibold tw-text-xl tw-text-[#8e6abf] tw-flex tw-justify-start tw-items-end tw-gap-1 tw-pb-3 tw-border-b">
									traveller {index + 1}
								</h2>

								<div className="tw-w-full tw-flex tw-flex-col tw-space-y-2 tw-pb-3 tw-border-b">
									<h2 className="tw-w-full tw-font-title tw-font-medium tw-text-base tw-text-[#8e6abf] tw-flex tw-justify-start tw-items-end">
										Traveller details
									</h2>
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600">
											Country of Origin
										</div>
										<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-[#8e6abf] tw-font-bold">
											{traveller.country}
										</p>
									</div>
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600">
											Effective Date
										</div>
										<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-[#8e6abf] tw-font-bold">
											{dayjs(
												watch(`insured_person[${index}].arrival_date`)
											).format('MMM DD, YYYY')}
										</p>
									</div>
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600">
											Expiry Date
										</div>
										<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-[#8e6abf] tw-font-bold">
											{dayjs(
												watch(`insured_person[${index}].departure_date`)
											).format('MMM DD, YYYY')}
										</p>
									</div>
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-600">
											Duration
										</div>
										<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-[#8e6abf] tw-font-bold">
											{travelDuration} days
										</p>
									</div>
									{traveller.dependants?.length > 0 ? (
										<div className="tw-grid tw-grid-cols-2">
											<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-600">
												Dependants
											</div>
											<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-[#8e6abf] tw-font-bold">
												{traveller.dependants?.length}
											</p>
										</div>
									) : null}
								</div>
								<div className="tw-w-full tw-flex tw-flex-col tw-gap-2">
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-font-semibold tw-text-gray-500">
											Price
										</div>
										<span className="tw-w-full tw-flex tw-justify-end tw-items-end tw-gap-1 tw-text-base tw-text-[#8e6abf] tw-font-bold">
											{travelDuration > 30 ? (
												<s>
													{travelDuration &&
														Intl.NumberFormat('en-US', {
															style: 'currency',
															currency: 'USD',
														}).format(
															travelDuration <= 30
																? 45
																: travelDuration > 30 && travelDuration <= 60
																? 90
																: travelDuration > 60 && travelDuration <= 90
																? 135
																: travelDuration > 90 && travelDuration <= 120
																? 180
																: travelDuration > 120 && travelDuration <= 150
																? 225
																: travelDuration > 150 &&
																  travelDuration <= 180 &&
																  270
														)}
												</s>
											) : (
												<>
													{travelDuration &&
														Intl.NumberFormat('en-US', {
															style: 'currency',
															currency: 'USD',
														}).format(
															travelDuration <= 30
																? 45
																: travelDuration > 30 && travelDuration <= 60
																? 90
																: travelDuration > 60 && travelDuration <= 90
																? 135
																: travelDuration > 90 && travelDuration <= 120
																? 180
																: travelDuration > 120 && travelDuration <= 150
																? 225
																: travelDuration > 150 &&
																  travelDuration <= 180 &&
																  270
														)}
												</>
											)}{' '}
											<p className="tw-text-gray-600 tw-font-light tw-text-xs">
												/person
											</p>
										</span>
									</div>
									{travelDuration && travelDuration > 30 ? (
										<>
											<div className="tw-grid tw-grid-cols-2">
												<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-font-semibold tw-text-gray-500">
													Discount
												</div>
												<span className="tw-w-full tw-flex tw-justify-end tw-items-end tw-gap-1 tw-text-xl tw-text-[#8e6abf] tw-font-bold">
													{travelDuration > 30 && travelDuration <= 60
														? '10'
														: travelDuration > 60 && travelDuration <= 90
														? '15'
														: travelDuration > 90 && travelDuration <= 120
														? '20'
														: travelDuration > 120 && travelDuration <= 150
														? '25'
														: travelDuration > 150 &&
														  travelDuration <= 180 &&
														  '30'}{' '}
													%
												</span>
											</div>
											<div className="tw-grid tw-grid-cols-2">
												<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-font-semibold tw-text-gray-500">
													Total Price
												</div>
												<span className="tw-w-full tw-flex tw-justify-end tw-items-end tw-gap-1 tw-text-xl tw-text-[#8e6abf] tw-font-bold">
													{travelDuration &&
														Intl.NumberFormat('en-US', {
															style: 'currency',
															currency: 'USD',
														}).format(
															travelDuration > 30 && travelDuration <= 60
																? 90 - 90 / 10
																: travelDuration > 60 && travelDuration <= 90
																? 135 - 135 / 15
																: travelDuration > 90 && travelDuration <= 120
																? 180 - 180 / 20
																: travelDuration > 120 && travelDuration <= 150
																? 225 - 225 / 25
																: travelDuration > 150 &&
																  travelDuration <= 180 &&
																  270 - 270 / 30
														)}{' '}
													<p className="tw-text-gray-600 tw-font-light tw-text-xs">
														/person
													</p>
												</span>
											</div>
										</>
									) : null}
								</div>
							</div>
						);
					})}

					{/**
					<div
						data-aos="fade-up"
						data-aos-duration="1200"
						className="tw-w-full tw-h-fit tw-p-3 tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-4 tw-rounded-lg tw-border-2 tw-border-t-4 tw-border-t-[#8e6abf]">
						<h2 className="tw-w-full tw-capitalize tw-font-title tw-font-semibold tw-text-xl tw-text-[#8e6abf] tw-flex tw-justify-start tw-items-end tw-gap-1 tw-pb-3 tw-border-b">
							standard plan
						</h2>

						<div className="tw-w-full tw-flex tw-flex-col tw-space-y-2 tw-pb-3 tw-border-b">
							<h2 className="tw-w-full tw-font-title tw-font-medium tw-text-base tw-text-[#8e6abf] tw-flex tw-justify-start tw-items-end">
								Traveller details
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
									Effective Date
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-[#8e6abf] tw-font-bold">
									{dayjs(watch(`insured_person[${0}].arrival_date`)).format(
										'MMM DD, YYYY'
									)}
								</p>
							</div>
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-text-gray-600">
									Expiry Date
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-[#8e6abf] tw-font-bold">
									{dayjs(watch(`insured_person[${0}].departure_date`)).format(
										'MMM DD, YYYY'
									)}
								</p>
							</div>
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-text-sm tw-text-gray-600">
									Duration
								</div>
								<p className="tw-w-full tw-flex tw-justify-end tw-text-sm tw-text-[#8e6abf] tw-font-bold">
									{differenceInDays(
										new Date(watch(`insured_person[${0}].departure_date`)),
										new Date(watch(`insured_person[${0}].arrival_date`))
									) + 1}{' '}
									days
								</p>
							</div>
						</div>
						<div className="tw-w-full tw-flex tw-flex-col tw-gap-2">
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-font-semibold tw-text-gray-500">
									Price
								</div>
								<span className="tw-w-full tw-flex tw-justify-end tw-items-end tw-gap-1 tw-text-base tw-text-[#8e6abf] tw-font-bold">
									{duration > 30 ? (
										<s>
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
												)}
										</s>
									) : (
										<>
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
												)}
										</>
									)}{' '}
									<p className="tw-text-gray-600 tw-font-light tw-text-xs">
										/person
									</p>
								</span>
							</div>
							{duration && duration > 30 ? (
								<>
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-font-semibold tw-text-gray-500">
											Discount
										</div>
										<span className="tw-w-full tw-flex tw-justify-end tw-items-end tw-gap-1 tw-text-xl tw-text-[#8e6abf] tw-font-bold">
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
									<div className="tw-grid tw-grid-cols-2">
										<div className="tw-w-full tw-flex tw-justify-start tw-text-sm tw-font-semibold tw-text-gray-500">
											Total Price
										</div>
										<span className="tw-w-full tw-flex tw-justify-end tw-items-end tw-gap-1 tw-text-xl tw-text-[#8e6abf] tw-font-bold">
											{duration &&
												Intl.NumberFormat('en-US', {
													style: 'currency',
													currency: 'USD',
												}).format(
													duration > 30 && duration <= 60
														? 90 - 90 / 10
														: duration > 60 && duration <= 90
														? 135 - 135 / 15
														: duration > 90 && duration <= 120
														? 180 - 180 / 20
														: duration > 120 && duration <= 150
														? 225 - 225 / 25
														: duration > 150 &&
														  duration <= 180 &&
														  270 - 270 / 30
												)}{' '}
											<p className="tw-text-gray-600 tw-font-light tw-text-xs">
												/person
											</p>
										</span>
									</div>
								</>
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
					 */}
				</div>
			</div>
		</>
	);
};

export default Form;
