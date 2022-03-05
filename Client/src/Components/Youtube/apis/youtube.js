import axios from 'axios';
const KEY = 'AIzaSyB8DVjpMR4NCZ28VnVfZMC-HMEolm1l1Kw';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 100,
        key: KEY
    },
    playerVars: {
        controls: 1,
        fs: 0
    },
})