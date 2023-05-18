//import Vue from 'vue';
import axios from 'axios';

const options = {};
  options.baseURL = "https://restcountries.com/v3.1/";

const axiosInstance = axios.create(options);

axiosInstance.interceptors.response.use(response => {
    console.log('Successed');
    return response;
  }, error => {
    return Promise.reject(error);
  });

//Vue.prototype.$axios = axiosInstance;

export default axiosInstance;
//module.exports = axiosInstance;