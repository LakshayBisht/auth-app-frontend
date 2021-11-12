import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Box, Heading, Anchor, Text} from 'grommet';

import SplitLayout from 'core/components/SplitLayout';
import RegisterForm from './components/RegisterForm';
import {register} from 'core/controller/auth';

const Register = () => {
	const [error, setError] = useState(null);
	const history = useHistory();

	const registerClickHandler = async (values) => {
		try {
			await register(values);
			history.push({pathname: '/home'});
		} catch (error) {
			console.log(error.message);
			setError(error.message);
		}
	};
	return (
		<SplitLayout
			mainContent={
				<Box width='large' flex='grow'>
					{error && (
						<Box
							align='center'
							margin={{top: 'medium'}}
							pad='xsmall'
							border={{side: 'bottom', size: 'medium'}}
							background='status-error'>
							<Text>{error}</Text>
						</Box>
					)}
					<Heading level={3} size='large' margin={{bottom: 'xsmall'}}>
						Sign Up
					</Heading>
					<Heading
						level={5}
						size='small'
						color='dark-6'
						margin={{top: 'xsmall'}}>
						Don't have an account?
					</Heading>
					<RegisterForm registerClickHandler={registerClickHandler} />
				</Box>
			}
			sideContent={
				<Box direction='row' gap='xsmall'>
					<Text>I have an account!</Text>
					<Link to='/login'>
						<Anchor
							as='span'
							label='Click here.'
							color='#f0ae4b'
							size='small'
						/>
					</Link>
				</Box>
			}
		/>
	);
};

export default Register;
