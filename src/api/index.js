import axios from 'axios';

export default axios.create({
    baseURL: 'https://vpic.nhtsa.dot.gov/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});