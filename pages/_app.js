import { SessionProvider } from 'next-auth/react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import React, { useState } from 'react';
import AOS from 'aos';
import '../node_modules/aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/styles/flaticon.css';
import '/styles/boxicons.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'swiper/css/bundle';
import 'react-tabs/style/react-tabs.css';
import '/styles/faq.css';
import '/styles/global.css';
import '/styles/style.css';
import '/styles/header.css';
import '/styles/footer.css';
import '/styles/responsive.css';
import NextNProgress from 'nextjs-progressbar';

import ScrollToTop from '@/components/Layout/ScrollToTop';

import Head from 'next/head';

function MyApp({ Component, pageProps }) {
	const [queryClient] = useState(() => new QueryClient());
	React.useEffect(() => {
		AOS.init();
	}, []);
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>GVHIP - Ghana Visitors Health Insurance Platform</title>
			</Head>

			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<SessionProvider session={pageProps.session}>
						<NextNProgress color="#8e6abf" height={5} />
						<Component {...pageProps} />
					</SessionProvider>
				</Hydrate>

				<ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
			</QueryClientProvider>

			<ScrollToTop />
		</>
	);
}

export default MyApp;
