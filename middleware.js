import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
	function middleware(req) {
		if (
			req.nextUrl.pathname.startsWith('/dashboard') &&
			req.nextauth.token?.user?.role !== 'guest'
		) {
			return NextResponse.redirect(new URL('/immigration', req.url));
		}

		if (
			req.nextUrl.pathname.startsWith('/admin') &&
			req.nextauth.token?.user?.role !== 'immigration'
		) {
			return NextResponse.redirect(new URL('/dashboard', req.url));
		}
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
	}
);

export const config = { matcher: ['/dashboard/:path*', '/immigration/:path*'] };
