import { API_URL } from 'Config/consts';

function Request() {}

Request.prototype.get = async function get(path) {
  const response = await fetch(`${API_URL}/${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const responseJson = await response.json();
  return responseJson;
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
  const apiError = new Error(responseJson.message);
  throw apiError;
};

const request = new Request();

export default request;
