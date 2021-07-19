import axios from "axios";
import Dropzone from "./components/Dropzone";

function Host() {
	const gameUrl = 'http://' + window.location.hostname + ':8080/game';
	axios.get(gameUrl + '/host/info', {
		withCredentials: true
	}).then((response) => {
		console.log(response.data)
	})

	function onDrop(file) {
		console.log('File dropped')
		let data = new FormData()
		data.append('file', file)
		axios.post(gameUrl + '/host/upload-file', data, {
			withCredentials: true
		}).then((response) => {
			console.log(response)
		}).catch((error) => {
			if (error.response) {
				console.log(error)
				let message = error.response.data.message
				console.log(message)
				alert(message)
			}
		})
	}

	return (
		<div>
			<Dropzone onDrop={onDrop} dropStatement='Drop files here'/>
		</div>
	)
}

export default Host