import WebSocket from "./components/WebSocket";

function Debug() {
	let websocket = new WebSocket(() => {
			websocket.subscribe('/user/queue/game/update', (message) => {
				console.log('Got message: ' + message)
			})
		},
		(error) => {
			console.log(error)
		});

	function perform() {
		if (websocket) {
			websocket.send('/app/game/event', 'boi');
		}
	}

	return (
		<div>
			Debug
			<button onClick={perform}>Send</button>
		</div>
	)
}

export default Debug