import './SignUp.css'
import Break from './components/Break'
import {ReactComponent as WelcomeImage} from './images/welcome.svg'
import axios from "axios";
import {useHistory} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import Loading from "./components/Loading";
import Recurring from "./components/Recurring";

function SignUp() {
    const [isLoading, setLoading] = useState(true);
    const recurring = new Recurring()
    const history = useHistory();
    const goTo = useCallback((path) => history.push('/' + path), [history]);
    const defaultUrl = 'http://' + window.location.hostname + ':8080';
    let _handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            signUp()
        }
    }

    useEffect(() => {
        recurring.request(
            'get',
            defaultUrl + '/player-in-sign-up',
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
    });

    function signUp() {
        console.log('Sign up clicked')
        let nickname = document.getElementById('nicknameInput').value
        let formData = new FormData();
        formData.append('nickname', nickname);
        axios.post(defaultUrl + '/sign-up', formData, {
            withCredentials: true
        }).then((response) => {
            let data = response.data
            console.log(data)
            if (data === 'accepted') {
                goTo('lobby')
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
        <div className="SignUp">
            <WelcomeImage alt="jeopardy-font" border="0"/>
            <Break/>
            <input
                id='nicknameInput'
                type="text"
                className="form-control Margin Input"
                placeholder="Your nickname"
                autoComplete="off"
                onKeyDown={_handleKeyDown}
            />
            <Break/>
            <button className="btn btn-primary Margin" onClick={signUp}>Join</button>
        </div>
    );
}

export default SignUp;