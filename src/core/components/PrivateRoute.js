import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {getToken} from 'core/utils/localStorage';

const PrivateRoute = ({component: Component, ...rest}) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				const authToken = getToken();
				if (!authToken) {
					return <Redirect to={{pathname: '/login'}} />;
				}
				return <Component {...props} />;
			}}
		/>
	);
};

export default PrivateRoute;
