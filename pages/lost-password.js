import React from 'react';
import Navbar from '@/components/Layout/Navigations/Navbar4';
import FooterFour from '@/components/Layout/Footer/FooterFour';
import LostPasswordForm from '@/components/Authentication/LostPasswordForm';

const LostPassword = () => {
	return (
		<>
			<Navbar />
			<div className="page-title-area">
				<div className="container">
					<div className="page-title-content">
						<span className="sub-title">Authentication</span>
						<h1>Forgot Your Password?</h1>
					</div>
				</div>
			</div>
			<LostPasswordForm />
			<FooterFour />
		</>
	);
};

export default LostPassword;
