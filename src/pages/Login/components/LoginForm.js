import React from 'react';
import {TextInput, Button} from 'grommet';
import {Formik} from 'formik';
import * as Yup from 'yup';

import FormField from 'core/components/FormField';

const LoginForm = ({loginClickHandler}) => {
	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Email is required'),
		password: Yup.string()
			.min(6, 'Minimum 6 Characters')
			.required('Password is Required'),
	});

	const onSubmit = async (values, {setSubmitting, setErrors}) => {
		setErrors({});
		setSubmitting(true);
		try {
			await loginClickHandler(values);
		} catch (e) {
			if (e.errors) setErrors(e.errors);
		}
		setSubmitting(false);
	};

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			validationSchema={validationSchema}
			onSubmit={onSubmit}>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
			}) => (
				<form onSubmit={handleSubmit}>
					<FormField
						name='email'
						label='Your Email'
						error={touched.email && errors.email}>
						<TextInput
							type='email'
							name='email'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.email}
						/>
					</FormField>
					<FormField
						name='password'
						label='Password'
						required
						error={touched.password && errors.password}>
						<TextInput
							type='password'
							name='password'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.password}
						/>
					</FormField>
					<Button
						size='large'
						type='submit'
						fill='horizontal'
						alignSelf='center'
						margin={{top: 'medium'}}
						label={isSubmitting ? 'Signing In...' : 'Sign In'}
						disabled={isSubmitting}
						primary
						color='accent-4'
					/>
				</form>
			)}
		</Formik>
	);
};

export default LoginForm;
