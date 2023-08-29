import { TextField } from '@mui/material';
//import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import enGB from 'date-fns/locale/en-GB';
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';
//import { format } from 'date-fns';

const DefaultInput = (props) => {
	const { onChange, name, type, helpertext, error } = props;

	return (
		<>
			{type === 'text-area' ? (
				(<div className="tw-flex tw-flex-col tw-gap-1 tw-w-full tw-justify-start tw-items-start">
					<TextField
						{...props}
						//ref={ref}
						//value={value}

						name={name}
						error={error}
						onChange={onChange}
						multiline
						rows={4}
						helperText={helpertext}
						variant="outlined"
						//size="lg"
						fullWidth
					/>
					{/*error && (
						<Typography className="text-xs text-red-400">
							{helpertext}
						</Typography>
					)*/}
				</div> /*: type === 'date' ? (
				<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
					<DatePicker
						{...props}
						name={name}
						type={type}
						format="dd MMM yyyy"
						//value={format(new Date(value), 'dd/MM/yyyy')}
						onChange={onChange}
						helperText={helpertext}
						variant="outlined"
						size="large"
						fullWidth
					/>
				</LocalizationProvider>
			)*/ /*: type === 'date' ? (
				<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
					<DatePicker
						{...props}
						name={name}
						type={type}
						format="dd MMM yyyy"
						//value={format(new Date(value), 'dd/MM/yyyy')}
						onChange={onChange}
						helperText={helpertext}
						variant="outlined"
						size="large"
						fullWidth
					/>
				</LocalizationProvider>
			)*/ /*: type === 'date' ? (
				<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
					<DatePicker
						{...props}
						name={name}
						type={type}
						format="dd MMM yyyy"
						//value={format(new Date(value), 'dd/MM/yyyy')}
						onChange={onChange}
						helperText={helpertext}
						variant="outlined"
						size="large"
						fullWidth
					/>
				</LocalizationProvider>
			)*/ /*: type === 'date' ? (
				<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
					<DatePicker
						{...props}
						name={name}
						type={type}
						format="dd MMM yyyy"
						//value={format(new Date(value), 'dd/MM/yyyy')}
						onChange={onChange}
						helperText={helpertext}
						variant="outlined"
						size="large"
						fullWidth
					/>
				</LocalizationProvider>
			)*/ /*: type === 'date' ? (
				<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
					<DatePicker
						{...props}
						name={name}
						type={type}
						format="dd MMM yyyy"
						//value={format(new Date(value), 'dd/MM/yyyy')}
						onChange={onChange}
						helperText={helpertext}
						variant="outlined"
						size="large"
						fullWidth
					/>
				</LocalizationProvider>
			)*/ /*: type === 'date' ? (
				<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
					<DatePicker
						{...props}
						name={name}
						type={type}
						format="dd MMM yyyy"
						//value={format(new Date(value), 'dd/MM/yyyy')}
						onChange={onChange}
						helperText={helpertext}
						variant="outlined"
						size="large"
						fullWidth
					/>
				</LocalizationProvider>
			)*/ /*: type === 'date' ? (
				<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
					<DatePicker
						{...props}
						name={name}
						type={type}
						format="dd MMM yyyy"
						//value={format(new Date(value), 'dd/MM/yyyy')}
						onChange={onChange}
						helperText={helpertext}
						variant="outlined"
						size="large"
						fullWidth
					/>
				</LocalizationProvider>
			)*/ /*: type === 'date' ? (
				<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
					<DatePicker
						{...props}
						name={name}
						type={type}
						format="dd MMM yyyy"
						//value={format(new Date(value), 'dd/MM/yyyy')}
						onChange={onChange}
						helperText={helpertext}
						variant="outlined"
						size="large"
						fullWidth
					/>
				</LocalizationProvider>
			)*/ /*: type === 'date' ? (
				<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
					<DatePicker
						{...props}
						name={name}
						type={type}
						format="dd MMM yyyy"
						//value={format(new Date(value), 'dd/MM/yyyy')}
						onChange={onChange}
						helperText={helpertext}
						variant="outlined"
						size="large"
						fullWidth
					/>
				</LocalizationProvider>
			)*/ /*: type === 'date' ? (
				<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
					<DatePicker
						{...props}
						name={name}
						type={type}
						format="dd MMM yyyy"
						//value={format(new Date(value), 'dd/MM/yyyy')}
						onChange={onChange}
						helperText={helpertext}
						variant="outlined"
						size="large"
						fullWidth
					/>
				</LocalizationProvider>
			)*/ /*: type === 'date' ? (
				<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
					<DatePicker
						{...props}
						name={name}
						type={type}
						format="dd MMM yyyy"
						//value={format(new Date(value), 'dd/MM/yyyy')}
						onChange={onChange}
						helperText={helpertext}
						variant="outlined"
						size="large"
						fullWidth
					/>
				</LocalizationProvider>
			)*/)
			) : (
				<div className="tw-flex tw-flex-col tw-gap-1 tw-w-full tw-justify-start tw-items-start">
					<TextField
						{...props}
						//ref={ref}
						//value={value}
						name={name}
						type={type}
						error={error}
						onChange={onChange}
						helperText={helpertext}
						variant="outlined"
						size="large"
						fullWidth
					/>
					{/*error && (
						<Typography className="text-xs text-red-400">
							{helpertext}
						</Typography>
					)*/}
				</div>
			)}
		</>
	);
};

export default DefaultInput;
