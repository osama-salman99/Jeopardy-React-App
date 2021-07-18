import {BrowserRouter as Router, Route} from 'react-router-dom'
import RouterPage from "./RouterPage";
import SignUp from "./SignUp";
import Lobby from "./Lobby";
import Game from "./Game";
import Debug from "./Debug";

function App() {
    return (
        <Router>
            <Route exact path='/' component={RouterPage}/>
            <Route path='/sign-up' component={SignUp}/>
            <Route path='/lobby' component={Lobby}/>
            <Route path='/game' component={Game}/>
            <Route path='/debug' component={Debug}/>
        </Router>
    );
}

export default App;
