import axios from "axios";

class Recurring {
	request(method, url, config, success, oncatch) {
		this.requestWithData(method, url, config, null, success, oncatch)
	}

	requestWithData(method, url, config, data, onsuccess, oncatch) {
		this.execute(method, url, config, data, onsuccess, oncatch, 1)
	}

	execute(method, url, config, data, onsuccess, oncatch, waitTime) {
		this.axiosCall(method, url, config, data).then((response) => {
			onsuccess(response)
		}).catch((error) => {
			oncatch(error)
			if (!error.response && error.request) {
				// The request was made but no response was received
				setTimeout(() => {
					this.execute(method, url, config, data, onsuccess, oncatch, waitTime * 2)
				}, waitTime)
			}
		})
	}

	axiosCall(method, url, config, data) {
		method.toLowerCase()
		switch (method) {
			case 'get':
				return axios.get(url, config)
			case 'post':
				return axios.post(url, data, config)
			case 'put':
				return axios.put(url, data, config)
			case 'delete':
				return axios.delete(url, config)
			default:
				return null
		}
	}
}

export default Recurring