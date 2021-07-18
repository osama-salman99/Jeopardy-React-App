import {useHistory} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import Recurring from "./components/Recurring";
import Loading from "./components/Loading";

function Game() {
    const [isLoading, setLoading] = useState(true);
    const recurring = new Recurring()
    const history = useHistory();
    const goTo = useCallback((path) => history.push('/' + path), [history]);
    const defaultUrl = 'http://' + window.location.hostname + ':8080';
    const gameUrl = 'http://' + window.location.hostname + ':8080/game';

    useEffect(() => {
        recurring.request(
            'get',
            defaultUrl + '/player-in-game',
            {withCredentials: true},
            (response) => {
                let data = response.data
                console.log(data)
                if (data) {
                    setLoading(false)
                } else {
                    goTo('')
                }
            },
            (error) => {
                if (error.response) {
                    console.log(error)
                    let message = error.response.data.message
                    console.log(message)
                    alert(message)
                }
            }
        )
    })

    if (isLoading) {
        return (
            <Loading/>
        )
    }

    recurring.request(
        'get',
        gameUrl + '/is-host',
        {withCredentials: true},
        (response) => {
            let data = response.data
            if (data) {
                goTo('game/host');
            }
        },
        (error) => {
            if (error.response) {
                console.log(error)
                let message = error.response.data.message
                console.log(message)
                alert(message)
            }
        }
    )

    return (
        <div>
            Game
        </div>
    )
}

export default Game