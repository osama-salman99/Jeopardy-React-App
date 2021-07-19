import './HostSetup.css'
import axios from "axios";
import Dropzone from "./components/Dropzone";
import Break from "./components/Break";
import {useCallback, useEffect, useMemo, useState} from "react";
import Loading from "./components/Loading";
import {useHistory} from "react-router-dom";
import Recurring from "./components/Recurring";

function HostSetup() {
	const [uploaded, setUploaded] = useState(false);
	const [isLoading, setLoading] = useState(false);
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

	function onDrop(file) {
		setLoading(true)
		console.log('File dropped')
		let data = new FormData()
		data.append('file', file)
		axios.post(gameUrl + '/host/upload-file', data, {
			withCredentials: true
		}).then((response) => {
			setUploaded(true)
			console.log(response)
		}).catch((error) => {
			if (error.response) {
				console.log(error)
				let message = error.response.data.message
				console.log(message)
				alert(message)
			}
		}).finally(() => {
			setLoading(false)
		})
	}

	if (isLoading) {
		return (
			<Loading/>
		)
	}

	if (uploaded) {
		jumpBackTo('game/host')
		return (
			<Loading/>
		)
	}

	return (
		<div className='Host'>
			<p className='InfoParagraph'>Please upload a properly-formatted boards file for your game</p>
			<Break/>
			<Dropzone onDrop={onDrop} dropStatement='Drop boards file here'/>
		</div>
	)
}

export default HostSetup