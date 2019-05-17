import queryString from 'query-string';
import { API_URL } from 'Config/consts';
import ApiError from 'Utils/ApiError';

function Request() {}

Request.prototype.get = async function get(path, query) {
  let url = `${API_URL}/${path}`;
  if (query) {
    url = `${url}?${queryString.stringify(query)}`;
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const responseJson = await response.json();
  if (response.ok) {
    return responseJson;
  }
  const apiError = new ApiError(response.status, responseJson.message);
  throw apiError;
};

Request.prototype.post = async function post(path, data) {
  const response = await fetch(`${API_URL}/${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const responseJson = await response.json();
  if (response.ok) {
    return responseJson;
  }
  const apiError = new ApiError(response.status, responseJson.message);
  throw apiError;
};

const request = new Request();

export default request;
