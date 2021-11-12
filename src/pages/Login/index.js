import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Box, Heading, Anchor, Text} from 'grommet';

import SplitLayout from 'core/components/SplitLayout';
import LoginForm from './components/LoginForm';
import {login} from 'core/controller/auth';

const Login = () => {
	const [error, setError] = useState(null);
	const history = useHistory();

	const loginClickHandler = async (values) => {
		try {
			await login(values);
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
						Sign In
					</Heading>
					<Heading
						level={5}
						size='small'
						color='dark-6'
						margin={{top: 'xsmall'}}>
						Welcome, we missed you!
					</Heading>
					<LoginForm loginClickHandler={loginClickHandler} />
				</Box>
			}
			sideContent={
				<Box direction='row' gap='xsmall'>
					<Text>Don't have an account?</Text>
					<Link to='/register'>
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

export default Login;
