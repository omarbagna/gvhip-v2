import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios, { axiosPrivate } from '../axios';

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'email',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				const { email, password } = credentials;

				/*
				const res = await axios.post('/login', {
					//method: 'POST',
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				});
				const user = {
                    id: '1',
					firstName: 'John',
					lastName: 'Smith',
					role: 'user',
				};
                
				if (email === 'bagna@email.com' && password === 'bagna') {
                    return user;
				} else {
                    return null;
				}
                */

				const formData = new FormData();
				formData.append('name', 'rxcorpapi');
				formData.append('password', 'dtthqw@@rty^yu*gff');
				formData.append(
					'apikey',
					'$2y$10$9KEVGnYthPwTlMUBm3XFPuDFsDJvQfZ5x9Y9lA3W3Dyk3JabNZ9Qy'
				);
				formData.append('userid', '1');

				const loginData = new FormData();
				loginData.append('method', 'login');
				loginData.append('email', email);
				loginData.append('password', password);

				try {
					const response = await axios.post('verify', formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					});

					if (response?.data?.STATUSCODE === '001') {
						console.log('Token generation failed');
						return null;
					} else if (response?.data?.STATUSCODE === '000') {
						try {
							const response = await axiosPrivate.post('Provider', loginData, {
								headers: {
									'Content-Type': 'multipart/form-data',
								},
							});

							if (response?.data?.STATUSCODE === '001') {
								console.log('Error logging in. Check email and password');
								return null;
							} else if (response?.data?.STATUSCODE === '000') {
								console.log(response?.data?.RESULTS[0]);
								return response?.data?.RESULTS[0];
							}
						} catch (err) {
							let errMessage;
							if (err.response?.status === 400) {
								errMessage = 'Server Error';
								console.log(errMessage);
							}
						}
					}
				} catch (err) {
					let errMessage;
					if (err.response?.status === 400) {
						errMessage = 'Server Error';
						console.log(errMessage);
					}
				}
			},
		}),
	],
	callbacks: {
		session({ session, token }) {
			session.user.id = token.id;
			session.user.username = token.username;
			return session;
		},
		jwt({ token, account, user }) {
			if (account) {
				token.accessToken = account.access_token;
				token.id = user.id;
				token.username = user.username;
				console.log({ user });
			}
			return token;
		},
	},
	pages: {
		signIn: '/authentication',
		error: '/authentication',
	},
	session: {
		strategy: 'jwt',
	},
});
