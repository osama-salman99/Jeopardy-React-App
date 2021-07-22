import SockJS from 'sockjs-client'
import SockJsClient from 'react-stomp'

let socket = new SockJS('/endpoint');
let sockClient = new SockJsClient()

function Debug() {
	return (
		<div>
			Debug
		</div>
	)
}

export default Debug