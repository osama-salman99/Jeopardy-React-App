import './Lobby.css'
import React, {useCallback, useEffect, useState} from 'react'
import WelcomeImage from './images/welcome.png'
import JoinGameImage from './images/join_game_square.png'
import CreateGameImage from './images/create_game_square.png'
import GameJoinInput from "./components/GameJoinInput";
import RevealHalfs from "./components/RevealHalfs";
import {useHistory} from "react-router-dom";
import axios from "axios";
import Loading from "./components/Loading";
import Recurring from "./components/Recurring";

function Lobby() {
    const [isLoading, setLoading] = useState(true);
    const recurring = new Recurring()
    const history = useHistory();
    const goTo = useCallback((path) => history.push('/' + path), [history]);
    const defaultUrl = 'http://' + window.location.hostname + ':8080';

    useEffect(() => {
        recurring.request(
            'get',
            defaultUrl + '/player-in-lobby',
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

    function logOut() {
        axios.delete(defaultUrl + '/logOut', {
            withCredentials: true
        }).then((response) => {
            let data = response.data
            if (data === 'successful') {
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
    }

    if (isLoading) {
        return (
            <Loading/>
        )
    }

    return (
        <div>
            <div className="Banner">
                <img src={WelcomeImage} alt='Welcome Banner'/>
            </div>
            <RevealHalfs
                imageLeft={JoinGameImage}
                innerLeft={
                    <GameJoinInput
                        ButtonText='Join Game'
                        operation='join-game'
                    />
                }
                imageRight={CreateGameImage}
                innerRight={
                    <GameJoinInput
                        ButtonText='Create Game'
                        operation='create-game'
                    />
                }
            />
            <button className='btn btn-danger LogOutButton' onClick={logOut}>Log Out</button>
        </div>
    )
}

export default Lobby