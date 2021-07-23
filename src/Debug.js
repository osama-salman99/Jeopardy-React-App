import WebSocket from "./components/WebSocket";

function Debug() {
	let websocket = new WebSocket('test', 'sub', callback);
	console.log('sending')

	function callback(message) {
		console.log('Received: ' + message)
	}

	function perform() {
		console.log('perform executed')
		if (websocket) {
			websocket.send('hhhh');
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