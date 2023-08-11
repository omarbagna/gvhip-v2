import React from 'react';
import { BsDot } from 'react-icons/bs';

const AccordionItem = ({
	showDescription,
	ariaExpanded,
	fontWeightBold,
	item,
	index,
	onClick,
}) => (
	<div className="faq__question">
		<dt>
			<button
				aria-expanded={ariaExpanded}
				aria-controls={`faq${index + 1}_desc`}
				data-qa="faq__question-button"
				className={`faq__question-button ${fontWeightBold}`}
				type="button"
				onClick={onClick}>
				{item?.question || item?.name}
			</button>
		</dt>
		<dd>
			{item?.answer ? (
				<p
					id={`faq${index + 1}_desc`}
					data-qa="faq__desc"
					className={`faq__desc ${showDescription}`}>
					{item?.answer}
				</p>
			) : (
				item?.content && (
					<ul
						id={`faq${index + 1}_desc`}
						data-qa="faq__desc"
						className={`faq__desc ${showDescription}`}>
						{item?.content?.map((item, index) => (
							<li
								className="tw-mb-2 tw-pb-2 tw-text-sm tw-flex tw-justify-start tw-items-start tw-gap-2"
								key={index}>
								<BsDot className="tw-text-lg tw-shrink-0" />
								{item}
							</li>
						))}
					</ul>
				)
			)}
		</dd>
	</div>
);

export default AccordionItem;
