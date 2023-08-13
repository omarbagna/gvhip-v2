import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from '../axios';

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

				const res = await axios.post('/login', {
					//method: 'POST',
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				});

				console.log(res);

				const user = res.json();

				/*
				const user = {
                    id: '1',
					firstName: 'John',
					lastName: 'Smith',
					role: 'user',
				};
                */

				if (user) {
					return user;
				} else {
					return null;
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
