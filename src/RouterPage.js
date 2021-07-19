import {useHistory} from "react-router-dom";
import {useCallback} from "react";
import Loading from "./components/Loading";
import Recurring from "./components/Recurring";

function RouterPage() {
	const recurring = new Recurring()
	const history = useHistory();
	const goTo = useCallback((path) => history.push('/' + path), [history]);
	const defaultUrl = 'http://' + window.location.hostname + ':8080';

	recurring.request(
		'get',
		defaultUrl + '/route',
		{withCredentials: true},
		(response) => {
			console.log('response: ' + response)
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

	return (
		<Loading/>
	);
}

export default RouterPage