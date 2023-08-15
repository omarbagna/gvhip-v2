import React from 'react';
import Link from 'next/link';
//import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

const Login = () => {
	const {
		control,

		handleSubmit,
	} = useForm({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	});
	//const router = useRouter();

	const logIn = (data) => {
		signIn('credentials', {
			...data,
			//redirect: false,
			callbackUrl: '/dashboard',
		});
	};

	return (
		<div className="col-lg-6 col-md-12">
			<div className="login-form">
				{/**
				<h2>Login</h2>
				 */}

				<form onSubmit={handleSubmit(logIn)}>
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
									type="email"
									className="form-control"
									placeholder="Email"
								/>
								{invalid && (
									<p className="tw-text-xs tw-text-red-400">{error.message}</p>
								)}
							</div>
						)}
					/>

					<Controller
						control={control}
						name={`password`}
						defaultValue={''}
						rules={{ required: 'Please enter your password' }}
						render={({
							field: { ref, ...field },
							fieldState: { error, invalid },
						}) => (
							<div className="form-group">
								<label>Password</label>
								<input
									{...field}
									ref={ref}
									type="password"
									className="form-control"
									placeholder="Password"
								/>
								{invalid && (
									<p className="tw-text-xs tw-text-red-400">{error.message}</p>
								)}
							</div>
						)}
					/>
					<div className="row align-items-center">
						<div className="col-lg-6 col-md-6 remember-me-wrap">
							{/**
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="remember-me"
								/>
								<label className="form-check-label" htmlFor="remember-me">
									Remember me
								</label>
							</div>
						*/}
						</div>
						<div className="col-lg-6 col-md-6 lost-your-password-wrap">
							<Link href="/lost-password">
								<a className="lost-your-password">Forgot your password?</a>
							</Link>
						</div>
					</div>
					<button type="submit">Log In</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
