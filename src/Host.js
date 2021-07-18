import axios from "axios";

function Host() {
    const gameUrl = 'http://' + window.location.hostname + ':8080/game';
    axios.get(gameUrl + '/host/info', {
        withCredentials: true
    }).then((response) => {
        console.log(response.data)
    })
    return (
        <div>
            Host
        </div>
    )
}

export default Host