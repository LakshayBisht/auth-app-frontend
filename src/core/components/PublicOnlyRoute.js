import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {getToken} from 'core/utils/localStorage';

const PublicOnlyRoute = ({component: Component, ...rest}) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				const authToken = getToken();
				if (authToken) {
					return <Redirect to={{pathname: '/home'}} />;
				}
				return <Component {...props} />;
			}}
		/>
	);
};

export default PublicOnlyRoute;
