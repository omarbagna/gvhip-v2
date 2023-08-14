import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from '../axios';
//import axios from '../axios';

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
			async authorize(credentials) {
				//const { email, password } = credentials;

				try {
					const response = await axios.post('/login', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(credentials),
					});

					console.log(response);

					const data = response;

					if (
						//response.ok && data.user
						data
					) {
						/*
						return Promise.resolve({
							id: data.user.id,
							email: data.user.email,
						});
						*/

						return data;
					} else {
						return Promise.resolve(null);
					}
				} catch (error) {
					console.error('Login error:', error);
					return Promise.resolve(null);
				}

				/*
				const res = await axios.post('/login', {
					//method: 'POST',
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				});

				console.log(res);

				const user = res.json();
				
				const user = {
					id: 1,
					first_name: 'John',
					last_name: 'Smith',
					email: 'bagna@email.com',
					password: '1234',
					role: 'admin',
				};
				
				if (user.email === email && user.password === password) {
					return user;
				} else {
					return null;
				}
				*/
			},
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		async session({ session, token, user }) {
			session.user = token;
			return session;
		},
		async redirect({ url, baseUrl }) {
			return '/dashboard';
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
