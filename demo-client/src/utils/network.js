import axios from 'axios';
import { API_URL, } from './constants';

// axios default configs
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.timeout = 10000;
// axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

export const apiRequest = (endpoint, options = {}) => {
  return axios(
    {
      url: endpoint,
      method: options.method || 'GET',
      data: options.data,
    })
    .then((response) => {
      if (response.status !== undefined && response.status !== 200) {
        return Promise.reject(response);
      }
      return response.data;
    })
    .catch(error => error);
};
