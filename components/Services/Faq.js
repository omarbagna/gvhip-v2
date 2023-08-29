import React from 'react';
import Accordion from '../Accordion';
import Image from 'next/image';

import faqImg1 from '@/public/images/faq1.png';
import { questionsAnswers } from 'data/faqData';

const Faq = () => {
	return (
		<div className="faq-area with-top-border ptb-100">
			<div className="container">
				<div className="row m-0 align-items-end">
					<div className="col-lg-6 col-md-12 p-0">
						<div className="faq-accordion">
							<div className="section-title">
								<span className="sub-title">Frequently Ask & Question</span>
								<h2>Dedicated to help anything people’s needs</h2>
							</div>
							<div className="accordion" id="faqAccordion">
								<Accordion questionsAnswers={questionsAnswers} />
							</div>
						</div>
					</div>
					<div className="col-lg-6 col-md-12 p-0">
						<div className="faq-image" data-aos="fade-up">
							<Image src={faqImg1} alt="faq-image" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Faq;
