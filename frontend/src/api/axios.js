import axios from 'axios';

// Create an instance of axios with a custom config
const api = axios.create({
    // This tells React to talk to Member 1's backend server
    baseURL: 'http://localhost:5000', 
});

export default api;