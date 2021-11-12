import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Box, Button, Heading} from 'grommet';
import {logout, getUser} from 'core/controller/auth';

const Home = () => {
	const [userName, setUserName] = useState('Lakshay');
	const history = useHistory();

	const logoutClickHandler = () => {
		logout();
		history.push({pathname: '/login'});
	};

	useEffect(() => {
		const getUsername = async () => {
			try {
				const user = await getUser();
				console.log(user);
				setUserName(user.username);
			} catch (error) {
				console.log(error.message);
			}
		};
		getUsername();
	}, []);

	return (
		<Box pad={{horizontal: 'large'}} align='center'>
			<Heading level={3} size='xlarge'>
				Welcome {userName}
			</Heading>
			<Button
				label='Logout'
				secondary
				onClick={logoutClickHandler}
				size='medium'
			/>
		</Box>
	);
};

export default Home;
