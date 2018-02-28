import fetch from 'isomorphic-fetch';
import qs from 'qs';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = response.statusText;
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}

export default function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        ...newOptions.headers,
      };
      newOptions.body = qs.stringify(newOptions.body);
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        ...newOptions.headers,
      };
    }
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then((response) => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .catch((e) => {
      const status = e.name;
      if (status === 401) {
        // 401
        return;
      }
      if (status === 403) {
        // 403
        return;
      }
      if (status <= 504 && status >= 500) {
        // 500
        return;
      }
      if (status >= 404 && status < 422) {
        // 404
      }
    });
}