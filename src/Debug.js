// import {w3cwebsocket as WebSocket} from 'websocket'
// const socket = new WebSocket('wss://localhost:8433/endpoint', 'echo-protocol');
import SockJS from 'sockjs-client'

let socket = new SockJS('/endpoint');

function Debug() {
	return (
		<div>
			Debug
		</div>
	)
}

export default Debug