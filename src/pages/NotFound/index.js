import {Box, Button, Heading} from 'grommet';
import {LinkPrevious} from 'grommet-icons';
import React from 'react';
import {useHistory, Link} from 'react-router-dom';

const NotFound = () => {
	const history = useHistory();
	return (
		<Box align='center'>
			<Heading level={1} size='xlarge'>
				404
			</Heading>
			<Button
				icon={<LinkPrevious />}
				secondary
				label='Go Back'
				onClick={() => history.goBack()}
			/>
		</Box>
	);
};

export default NotFound;
