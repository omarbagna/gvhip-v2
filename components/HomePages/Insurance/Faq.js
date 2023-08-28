import React from 'react';
import Accordion from '@/components/Accordion';
import Image from 'next/image';

import faqImg3 from '@/public/images/faq2.webp';

const questionsAnswers = [
	{
		question: 'What happens if I need to cancel my trip unexpectedly?',
		answer:
			'Our insurance does not covers non-refundable expenses like flights and accommodations in case of trip cancellations.',
	},
	{
		question: 'What if I face a medical emergency while traveling?',
		answer:
			'Our coverage includes medical expenses, hospitalization, and medical evacuation if needed.',
	},
	{
		question: 'What if my baggage is lost, stolen, or damaged during the trip?',
		answer: `We do not provide coverage for replacement or reimbursement of personal belongings like clothes and electronics.`,
	},
	{
		question: 'What if my flights are delayed significantly?',
		answer: `Our insurance does not compensate for additional accommodation and meal expenses due to substantial travel delays.`,
	},
];

const Faq = () => {
	return (
		<div className="faq-area ptb-100">
			<div className="container">
				<div className="section-title">
					<span className="sub-title dark-green-color">
						Frequently Asked Questions
					</span>
					<h2 className="nunito-font">
						From policy details to claims processing, find all your answers
						here.
					</h2>
				</div>
				<div className="row align-items-center">
					<div className="col-lg-6 col-md-12">
						<div className="faq-accordion">
							<div className="accordion" id="faqAccordion">
								<Accordion questionsAnswers={questionsAnswers} />
							</div>
						</div>
					</div>
					<div className="col-lg-6 col-md-12">
						<div className="faq-image style-three" data-aos="fade-up">
							<Image
								src={faqImg3}
								alt="faq-image"
								className="tw-rounded-lg tw-overflow-hidden"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Faq;
