import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import React from 'react';
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

import ScrollToTop from '@/components/Layout/ScrollToTop';

import Head from 'next/head';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
	React.useEffect(() => {
		AOS.init();
	}, []);
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>GSTI - Ghana Safe Stay Program</title>
			</Head>

			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
				<ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
			</QueryClientProvider>

			<ScrollToTop />
		</>
	);
}

export default MyApp;
