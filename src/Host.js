import {useCallback, useEffect, useMemo, useState} from "react";
import Recurring from "./components/Recurring";
import {useHistory} from "react-router-dom";
import Loading from "./components/Loading";

function Host() {
	const [isLoading, setLoading] = useState(true);
	const [isReady, setReady] = useState(false);
	const history = useHistory();
	const jumpBackTo = useCallback((path) => history.replace('/' + path), [history]);
	const goTo = useCallback((path) => history.push('/' + path), [history]);
	const hostUrl = 'https://' + window.location.hostname + ':8433/game/host';
	let recurring = useMemo(() => {
		return new Recurring()
	}, [])

	useEffect(() => {
		recurring.request(
			'get',
			hostUrl + '/is-host',
			{withCredentials: true},
			(response) => {
				let data = response.data
				if (!data) {
					jumpBackTo('');
				}
				setLoading(false)
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
		recurring.request(
			'get',
			hostUrl + '/is-ready',
			{withCredentials: true},
			(response) => {
				let data = response.data
				setReady(data)
				if (!data) {
					goTo('game/host/setup')
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
	}, [goTo, hostUrl, jumpBackTo, recurring])

	if (isLoading || !isReady) {
		return (
			<Loading/>
		)
	}


	return (
		<div>
			Host
		</div>
	)
}

export default Host