import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://be-procheck-57f2af579b8e.herokuapp.com',
    headers: {
        'Content-Type': 'application/json'
      }
})