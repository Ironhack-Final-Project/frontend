import axios from 'axios'

const uploadImage = (file) => {
    return api.post("/upload", file)
        .then(res => res.data)
        .catch(err => { console.log(err) });
};

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export { uploadImage, api }
