import {useCallback, useEffect, useMemo, useState} from "react";
import {useHistory} from "react-router-dom";
import Loading from "./components/Loading";
import Recurring from "./components/Recurring";

function Game() {
	const [isLoading, setLoading] = useState(true);
	const history = useHistory();
	const goTo = useCallback((path) => history.push('/' + path), [history]);
	const defaultUrl = 'https://' + window.location.hostname + ':8433';
	const gameUrl = 'https://' + window.location.hostname + ':8433/game';
	const recurring = useMemo(() => {
		return new Recurring()
	}, [])

	useEffect(() => {
		recurring.request(
			'get',
			defaultUrl + '/player-in-game',
			{withCredentials: true},
			(response) => {
				let data = response.data
				console.log(data)
				if (data) {
					setLoading(false)
				} else {
					goTo('')
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
	}, [defaultUrl, goTo, recurring])

	if (isLoading) {
		return (
			<Loading/>
		)
	}

	recurring.request(
		'get',
		gameUrl + '/host/is-host',
		{withCredentials: true},
		(response) => {
			let data = response.data
			if (data) {
				goTo('game/host');
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
		<div>
			Game
		</div>
	)
}

export default Game