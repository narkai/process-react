import axios from 'axios';

let API_URL = 'http://localhost/your-site/api/'

switch (process.env.STAGE) {
  case 'production':
    {
      API_URL = 'https://your-site/api/'
      break
    }
  default: break
}

export const performRequest = (method, url, auth) => {
  const config = {
    method: method,
    url: url,
    baseURL: API_URL
  }

  if (auth) {
    config.headers = {
      Authorization: `Bearer ${localStorage.authToken}`
    }
  }

  return axios.request(config)
}
