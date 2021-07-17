import Break from "./Break";
import {useHistory} from "react-router-dom";
import {useCallback} from "react";
import axios from "axios";

function GameJoinInput({ButtonText, operation}) {
    const history = useHistory();
    const goTo = useCallback((path) => history.push('/' + path), [history]);
    const defaultUrl = 'http://' + window.location.hostname + ':8080';

    function invoke() {
        let gameId = document.getElementById('id-' + operation).value
        let formData = new FormData();
        formData.append('game-id', gameId);
        axios.post(defaultUrl + '/' + operation, formData, {
            withCredentials: true
        }).then((response) => {
            console.log(response)
            let data = response.data
            if (data === 'successful') {
                goTo('game')
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

    let _handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            invoke()
        }
    }

    return (
        <div className='Centered'>
            <input
                id={'id-' + operation}
                type="text"
                autoComplete="off"
                className="form-control Input"
                placeholder='Game ID'
                onKeyDown={_handleKeyDown}
            />
            <Break/>
            <button className='btn btn-primary Margin' onClick={invoke}>{ButtonText}</button>
        </div>
    )
}

export default GameJoinInput