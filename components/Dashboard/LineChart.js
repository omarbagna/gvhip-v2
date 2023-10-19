import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	//PointElement,
	//LineElement,
	BarElement,
	Title,
	Filler,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
	CategoryScale,
	LinearScale,
	//PointElement,
	//LineElement,
	BarElement,
	Title,
	Filler,
	Tooltip,
	Legend
);

const options = {
	responsive: true,
	animation: true,
	scales: {
		x: {
			grid: {
				display: false,
			},
		},
		y: {
			display: false,
			grid: {
				display: false,
			},
		},
	},
	plugins: {
		legend: {
			position: 'bottom',
			align: 'end',
			labels: {
				usePointStyle: true,
				padding: 30,
				font: {
					size: 14,
				},
			},
		},
		title: {
			display: true,
			color: 'rgb(119, 98, 175)',
			align: 'start',
			font: {
				size: 25,
				weight: 500,
			},
			text: 'Application Verification History',
		},
	},
};

const labels = [
	'12 October',
	'15 October',
	'18 October',
	'20 October',
	'22 October',
	'25 October',
];
console.log(faker.datatype.number({ min: 0, max: 1000 }));

/*
chart = {
	labels: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
	],
	verified: [500, 300, 600],
	declined: [],
};
*/

const data = {
	labels,
	datasets: [
		{
			fill: false,
			label: 'Verified',
			data: [500, 200],
			//labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
			borderColor: 'rgb(119, 98, 175)',
			backgroundColor: 'rgba(119, 98, 175, 1)',
			borderRadius: 3,
		},
		{
			fill: false,
			label: 'Declined',
			data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
			borderColor: 'rgb(255, 236, 244)',
			backgroundColor: 'rgba(255, 236, 244, 1)',
			borderRadius: 3,
		},
	],
};

const LineChart = () => {
	return (
		<Bar
			options={options}
			data={data}
			className="tw-bg-white tw-shadow-sm tw-rounded-lg tw-p-2 tw-w-full"
		/>
	);
};

export default LineChart;
