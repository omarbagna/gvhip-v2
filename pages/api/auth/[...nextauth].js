import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

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
				//const user = await loginUser(email, password);

				if (email === 'bagna@rxhealth.com' && password === '1234') {
					return {
						id: 1,
						first_name: 'Bagna',
						last_name: 'Omar',
						email: 'bagna@rxhealth.com',
					};
				} else {
					return null;
				}
			},
		}),
	],
});
