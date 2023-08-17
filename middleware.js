import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
	function middleware(req) {
		if (
			req.nextUrl.pathname.startsWith('/company') &&
			req.nextauth.token?.user?.role === 'company'
		) {
			return NextResponse.redirect(new URL('/company', req.url));
		}

		if (
			req.nextUrl.pathname.startsWith('/immigration') &&
			req.nextauth.token?.user?.role === 'immigration'
		) {
			return NextResponse.redirect(new URL('/immigration', req.url));
		}
		if (
			req.nextUrl.pathname.startsWith('/guest') &&
			req.nextauth.token?.user?.role === 'guest'
		) {
			return NextResponse.redirect(new URL('/guest', req.url));
		}
		if (
			req.nextUrl.pathname.startsWith('/policy-holder') &&
			req.nextauth.token?.user?.role === 'policy_holder'
		) {
			return NextResponse.redirect(new URL('/policy-holder', req.url));
		}
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
	}
);

export const config = {
	matcher: [
		'/company/:path*',
		'/guest/:path*',
		'/policy-holder/:path*',
		'/immigration/:path*',
	],
};
