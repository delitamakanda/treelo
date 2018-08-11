import 'whatwg-fetch';
import 'babel-polyfill';

const API_URL = 'http://localhost:5000/api';
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'connard'
};


let KanbanAPI = {
    fetchCards() {
        return fetch(`${API_URL}/cards`, {headers: API_HEADERS})
        .then((response) => response.json())
    }
}

export default KanbanAPI;
