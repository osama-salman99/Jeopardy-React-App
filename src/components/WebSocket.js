import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

class WebSocket {
	constructor(topic, destination, callbackMethod) {
		this.topic = topic
		this.destination = destination
		this.callbackMethod = callbackMethod
		this.connect()
	}

	send = (message) => {
		console.log('send executed')
		if (this.stompClient && this.stompClient.connected) {
			this.stompClient.send('/app/' + this.destination, JSON.stringify(message))
		} else {
			this.connect()
		}
	}

	connect = () => {
		this.socket = new SockJS('https://' + window.location.hostname + ':8433/socket');
		this.stompClient = Stomp.over(this.socket);
		this.stompClient.connect(
			{},
			() => {
				this.stompClient.subscribe('/topics/' + this.topic, (response) => {
					this.callbackMethod(response)
				});
			},
			error => {
				console.log('Error:')
				console.log(error);
			}
		);
	}

	disconnect = () => {
		if (this.stompClient) {
			this.stompClient.disconnect();
		}
	}
}

export default WebSocket