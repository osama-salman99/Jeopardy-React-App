import {useHistory} from "react-router-dom";
import {useCallback} from "react";
import axios from "axios";

function Game() {
    const history = useHistory();
    const goTo = useCallback((path) => history.push('/' + path), [history]);
    const defaultUrl = 'http://' + window.location.hostname + ':8080';

    axios.get(defaultUrl + '/player-in-game', {
        withCredentials: true
    }).then((response) => {
        let data = response.data
        console.log(data)
        if (!data) {
            goTo('')
        }
    }).catch((error) => {
        if (error.response) {
            console.log(error)
            let message = error.response.data.message
            console.log(message)
            alert(message)
        }
    })

    return (
        <div>
            Game
        </div>
    )
}

export default Game