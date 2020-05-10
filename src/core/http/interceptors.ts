import { AxiosStatic } from 'axios';

// Request Handle Processor function
const requestHandleProcessor = () => {
  // 
};

// Response Handle Processor function
const responseHandleProcessor = () => {
  // 
};

// Hijack function
function Hijack (axios: AxiosStatic) {
  // the Axios use Hijack requset
  axios.interceptors.request.use(
    request => {
      // console.log('Hijack requset: ', request);
      return request;
    },
    err => {
      return Promise.reject(err);
    },
  );

  // the Axios use Hijack response
  axios.interceptors.response.use(
    response => {
      // console.log('Hijack response: ', response);
      return response;
    },
    err => {
      return Promise.reject(err);
    },
  );

  return axios;
}

export default Hijack;
