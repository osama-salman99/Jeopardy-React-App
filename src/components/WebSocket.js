import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

class WebSocket {
	constructor(connectCallback, errorCallback) {
		this.connect(connectCallback, errorCallback)
	}

	connect = (connectCallback, errorCallback) => {
		this.socket = new SockJS('https://' + window.location.hostname + ':8433/socket');
		this.stompClient = Stomp.over(this.socket);
		this.stompClient.connect(
			{},
			connectCallback,
			errorCallback
		);
	}

	disconnect = () => {
		if (this.stompClient) {
			this.stompClient.disconnect();
		}
	}

	subscribe = (destination, callback) => {
		this.stompClient.subscribe(destination, (message) => {
			callback(message)
		});
	}

	send = (destination, message) => {
		this.stompClient.send(destination, message)
	}
}

export default WebSocket