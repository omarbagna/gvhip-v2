import React from 'react';
import Accordion from '../Accordion';

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

const Faq = ({ data = null }) => {
	return (
		<div className="faq-area bg-f3feff ptb-100">
			<div className="container">
				<div className="section-title">
					<span className="sub-title">Pricing FAQ</span>
					<h2>Dedicated to help with all your needs</h2>
				</div>
				<div className="faq-accordion style-two">
					<div className="accordion" id="faqAccordion">
						<Accordion questionsAnswers={data ? data : questionsAnswers} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Faq;
