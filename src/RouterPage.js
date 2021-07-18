import axios from "axios";
import {useHistory} from "react-router-dom";
import {useCallback} from "react";
import Loading from "./components/Loading";

function RouterPage() {
    const history = useHistory();
    const goTo = useCallback((path) => history.push('/' + path), [history]);
    const defaultUrl = 'http://' + window.location.hostname + ':8080';
    console.log(defaultUrl)
    axios.get(defaultUrl + '/route', {
        withCredentials: true
    }).then((response) => {
        let data = response.data
        console.log(data)
        switch (data) {
            case 'sign-up':
            case 'lobby':
            case 'game':
                goTo(data)
                break
            default:
                console.log('Invalid data received: \'' + data + '\'')
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
        <Loading/>
    );
}

export default RouterPage