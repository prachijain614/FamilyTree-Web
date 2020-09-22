import axios from 'axios';

axios.defaults.baseURL = "http://localhost:4000/api/v1"

export default class WebService {
    static WebRequest = {
        API: {
            getFamily: 'family/get',
            addFamily: 'family/add',
            deleteFamily: 'family/delete',

            getMember: 'family/members/get',
            addMember: 'family/members/add',
        }
    }

    static async post(action, params) {
        let response = await axios.post(action, params)
        return response.data
    }
    static async put(action, params) {
        let response = await axios.put(action, params)
        return response.data
    }
    static async get(action) {
        let response = await axios.get(action)
        return response.data
    }
}
