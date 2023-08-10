import React from 'react';
import Navbar from '@/components/Layout/Navigations/Navbar4';
import Login from '@/components/Authentication/Login';
//import Signup from '@/components/Authentication/Signup';
//import FooterFour from '@/components/Layout/Footer/FooterFour';

const Authentication = () => {
	return (
		<>
			<Navbar />
			<div className="page-title-area">
				<div className="container">
					<div className="page-title-content">
						<span className="sub-title">Login</span>
						<h1>Welcome</h1>
					</div>
				</div>
			</div>
			<div className="profile-authentication-area ptb-75">
				<div className="container">
					<div className="row justify-content-center">
						<Login />
						{/**
						<Signup />
						 */}
					</div>
				</div>
			</div>
		</>
	);
};

export default Authentication;
