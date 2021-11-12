import React, {useContext} from 'react';
import {Box, Heading, ResponsiveContext, Image} from 'grommet';
import SideImg from 'assets/side.png';

const DefaultSideContent = ({sideContent}) => (
	<Box basis='full' justify='between' direction='column'>
		<Box>
			<Heading
				level={3}
				size='large'
				margin={{vertical: 'xsmall'}}
				color='white'>
				Natus Vincere -
			</Heading>
			<Heading
				level={5}
				margin={{vertical: 'xsmall'}}
				color='dark-6'
				size='large'>
				Online Team Management
			</Heading>
		</Box>
		<Box alignSelf='center' align='center'>
			<Image resp src={SideImg} width='90%' />
		</Box>
		<Box
			pad={{bottom: 'xlargee'}}
			alignSelf='center'
			aligh='center'
			margin={{bottom: 'small'}}>
			{sideContent}
		</Box>
	</Box>
);

const SplitLayout = ({mainContent, sideContent}) => {
	const size = useContext(ResponsiveContext);
	return (
		<Box direction='row-responsive' fill>
			<Box
				basis={size !== 'small' ? '50%' : '100%'}
				pad={{horizontal: '10%'}}
				overflow={{vertical: 'auto'}}>
				{mainContent}
			</Box>
			{size !== 'small' && (
				<Box
					background='#272b3f'
					basis='50%'
					pad={{horizontal: 'large', vertical: 'medium'}}
					fill>
					<DefaultSideContent sideContent={sideContent} />
				</Box>
			)}
		</Box>
	);
};

export default SplitLayout;
