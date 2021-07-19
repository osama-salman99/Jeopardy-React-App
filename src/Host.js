import {useCallback, useEffect, useMemo, useState} from "react";
import Recurring from "./components/Recurring";
import {useHistory} from "react-router-dom";
import Loading from "./components/Loading";

function Host() {
	const [isLoading, setLoading] = useState(true);
	const history = useHistory();
	const jumpBackTo = useCallback((path) => history.replace('/' + path), [history]);
	const gameUrl = 'http://' + window.location.hostname + ':8080/game';
	let recurring = useMemo(() => {
		return new Recurring()
	}, [])

	useEffect(() => {
		recurring.request(
			'get',
			gameUrl + '/host/is-host',
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
	}, [gameUrl, jumpBackTo, recurring])

	if (isLoading) {
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