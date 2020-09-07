import axios from 'axios';

const baseInstance = axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 1000,
});

export default baseInstance;