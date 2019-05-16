import { API_URL } from 'Config/consts';

function Request() {}

Request.prototype.get = function get(path, query) {
  if (path === 'users') {
    let users = [];
    const { page } = query;
    for (let i = 1; i <= 5; i++) {
      const identifier = 5 * (page - 1) + i;
      users = [
        ...users,
        {
          id: identifier,
          name: `name${identifier}`,
          email: `email${identifier}@mail.com`
        }
      ];
    }
    return { data: users };
  }
  return {};
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
