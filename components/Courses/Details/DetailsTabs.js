import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const DetailsTabs = ({ tabsData }) => {
	return (
		<div className="col-lg-8 col-md-12">
			<div className="courses-details-desc">
				<Tabs>
					<TabList>
						{tabsData?.map((tabData, index) => (
							<Tab key={index}>{tabData?.name}</Tab>
						))}
					</TabList>

					{tabsData?.map((tabData, index) => (
						<TabPanel key={index}>
							<div
								className="courses-overview"
								data-aos="fade-left"
								data-aos-duration="800">
								<ul>
									{tabData?.content?.map((item, index) => (
										<li key={index}>{item}</li>
									))}
								</ul>
							</div>
						</TabPanel>
					))}
				</Tabs>
			</div>
		</div>
	);
};

export default DetailsTabs;
