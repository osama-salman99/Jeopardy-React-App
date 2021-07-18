import axios from "axios";

class Recurring {
    request(method, url, config, success, error) {
        this.requestWithData(method, url, config, null, success, error)
    }

    requestWithData(method, url, config, data, success, error) {
        this.axiosCall(method, url, config, data).then((response) => {
            success(response)
        }).catch((response) => {
            error(response)
            this.request(method, url, config, data, success, error)
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