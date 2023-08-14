import { Backdrop, CircularProgress } from '@mui/material';
import axios from 'pages/api/axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
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

const LostPasswordForm = () => {
	const { control, handleSubmit } = useForm({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
		},
	});

	const triggerPasswordReset = async (data) => {
		const { data: response } = await axios.post(
			'/send-password-reset-link',
			data
		);
		return response;
	};

	const resetPassword = useMutation(
		(resetPasswordData) => triggerPasswordReset(resetPasswordData),
		{
			onSuccess: (data) => {
				console.log('Success response ', data);
				if (data?.status === 200) {
					//window.location.replace(data.redirect_url);
					alert('Success', 'Reset link sent successfully', 'success');

					reset();
				} else if (data?.status !== 200) {
					alert('Failed to send rest link', 'Please try again later', 'error');
				}
			},
			onError: (error) => {
				console.log(error);
			},
		}
	);

	const resetPasswordRequest = (data) => {
		const passwordResetData = JSON.stringify(data);

		resetPassword.mutate(passwordResetData);

		//window.sessionStorage.setItem('basicData', basicData);

		//router.push(`/form/purchase-plan`);
	};

	return (
		<>
			<div className="profile-authentication-area ptb-100">
				<div className="container">
					<div className="lost-password-box">
						<p>
							Lost your password? Please enter your email address. You will
							receive a link to create a new password via email.
						</p>
						<form onSubmit={handleSubmit(resetPasswordRequest)}>
							<Controller
								control={control}
								name={`email`}
								defaultValue={''}
								rules={{
									pattern: {
										value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gi,
										message: 'Please enter a valid email address',
									},
									required: 'Please enter your email',
								}}
								render={({
									field: { ref, ...field },
									fieldState: { error, invalid },
								}) => (
									<div className="form-group">
										<label>Email</label>
										<input
											{...field}
											ref={ref}
											type="text"
											className="form-control"
										/>
										{invalid && (
											<p className="tw-text-xs tw-text-red-400">
												{error.message}
											</p>
										)}
									</div>
								)}
							/>
							<button type="submit">Reset Password</button>
						</form>
					</div>
				</div>
			</div>

			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={resetPassword.isLoading}>
				<div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-5">
					<CircularProgress color="inherit" />
					<p className="tw-text-white tw-font-medium tw-text-center tw-text-lg tw-w-2/3">
						Sending reset link, please wait...
					</p>
				</div>
			</Backdrop>
		</>
	);
};

export default LostPasswordForm;
