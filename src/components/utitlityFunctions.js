import { useState } from 'react'
import axios from 'axios'



const uploadImage = (file) => {
    return api.post("/upload", file)
    .then(res => res.data)
    .catch(err => { console.log(err) });
};

const api = axios.create({
    // make sure you use PORT = 5005 (the port where our server is running)
    baseURL: "http://localhost:5005/api"
    // withCredentials: true // => you might need this option if using cookies and sessions
});

export {uploadImage, api}
