import {BrowserRouter as Router, Redirect} from "react-router-dom";

function InvalidRoute() {
	console.log('Invalid route')
	return (
		<Router>
			<Redirect from='/' to='/'/>
		</Router>
	);
}

export default InvalidRoute;