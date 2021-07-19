import {BrowserRouter as Router, Route} from 'react-router-dom'
import RouterPage from "./RouterPage";
import SignUp from "./SignUp";
import Lobby from "./Lobby";
import Game from "./Game";
import Host from "./Host";
import Debug from "./Debug";
import InvalidRoute from "./InvalidRoute";

function App() {
	return (
		<Router>
			<Route exact path='/' component={RouterPage}/>
			<Route exact path='/sign-up' component={SignUp}/>
			<Route exact path='/lobby' component={Lobby}/>
			<Route exact path='/game' component={Game}/>
			<Route exact path='/game/host' component={Host}/>
			<Route exact path='/debug' component={Debug}/>
			<Route path='/!(sign-up|lobby|game|game/host|debug)' component={InvalidRoute}/>
		</Router>
	);
}

export default App;
