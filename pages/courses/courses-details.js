import React from 'react';
import Navbar4 from '@/components/Layout/Navigations/Navbar4';
import DetailsTop from '@/components/Courses/Details/DetailsTop';
import DetailsContent from '@/components/Courses/Details/DetailsContent';
import YouAlsoLike from '@/components/Courses/Details/YouAlsoLike';
import AppDownload from '@/components/Courses/AppDownload';
import FooterFour from '@/components/Layout/Footer/FooterFour';

const CoursesDetails = () => {
	return (
		<>
			<Navbar4 />
			<DetailsTop />
			<DetailsContent />
			<YouAlsoLike />
			<AppDownload />
			<FooterFour />
		</>
	);
};

export default CoursesDetails;
