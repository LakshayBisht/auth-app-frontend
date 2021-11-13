import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import PublicOnlyRoute from 'core/components/PublicOnlyRoute';
import PrivateRoute from 'core/components/PrivateRoute';
import {Grommet, grommet} from 'grommet';

import Login from 'pages/Login';
import Register from 'pages/Register';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';

function App() {
	return (
		<Grommet theme={grommet} full>
			<Router>
				<Switch>
					<Route exact path='/'>
						<Redirect to='/login' />
					</Route>
					<PublicOnlyRoute exact path='/login' component={Login} />
					<PublicOnlyRoute exact path='/register' component={Register} />
					<PrivateRoute exact path='/home' component={Home} />
					<Route component={() => <NotFound />} />
				</Switch>
			</Router>
		</Grommet>
	);
}

export default App;
