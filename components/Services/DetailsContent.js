import React from 'react';
import Accordion from '../Accordion';
import Image from 'next/image';

import servicesDetailsImg from '@/public/images/services-details.jpg';
import { questionsAnswers } from 'data/faqData';

const DetailsContent = () => {
	return (
		<div className="services-details-area ptb-100">
			<div className="container">
				<div className="services-details-image">
					<Image src={servicesDetailsImg} alt="services-details" />
				</div>
				<div className="services-details-desc">
					<p>
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam{' '}
						<i>nonumy</i> eirmod tempor invidunt ut labore et dolore magna
						aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
						duo dolores et ea rebum. Stet clita kasd <strong>gubergren</strong>,
						no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
						dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
						tempor invidunt ut labore et dolore magna <a href="#">aliquyam</a>{' '}
						erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
						et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
						lorem ipsum dolor sit amet.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam{' '}
						<a href="#">nonumy</a> eirmod tempor invidunt ut labore et dolore
						magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
						justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea{' '}
						<strong>takimata</strong> sanctus est Lorem ipsum dolor sit amet.
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
					</p>

					<h3>What you&apos;ll get under this service</h3>
					<p>
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam{' '}
						<a href="#">nonumy</a> eirmod tempor invidunt ut labore et dolore
						magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
						justo duo dolores et ea rebum.
					</p>

					<ul>
						<li>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
							nonumy eirmod tempor.
						</li>
						<li>
							Consetetur sadipscing elitr, sed diam nonumy eirmod tempor
							invidunt ut labore et dolore magna.
						</li>
						<li>
							Sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
							aliquyam erat, sed diam.
						</li>
						<li>
							Eirmod tempor invidunt ut labore et dolore magna{' '}
							<a href="#">aliquyam</a> erat, sed diam voluptua. At vero eos et
							accusam et justo.
						</li>
						<li>
							labore et dolore magna <strong>aliquyam</strong> erat, sed diam
							voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
						</li>
					</ul>

					<p>
						Lorem ipsum dolor sit amet, consetetur <strong>sadipscing</strong>{' '}
						elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
						magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
						justo duo dolores et ea rebum. Stet <a href="#">clita</a> kasd
						gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet.
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
					</p>

					<h3>Some Of our design projects</h3>
					<p>
						Lorem ipsum dolor sit amet, consetetur <strong>sadipscing</strong>{' '}
						elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
						magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
						justo duo dolores et ea rebum. Stet <a href="#">clita</a> kasd
						gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet.
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
					</p>

					<h3>Any questions find here</h3>
					<div className="accordion" id="faqAccordion">
						<Accordion questionsAnswers={questionsAnswers} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailsContent;
