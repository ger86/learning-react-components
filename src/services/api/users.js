import request from 'Services/mockRequest';

const extractDataFromResponse = json => json.data;

// eslint-disable-next-line import/prefer-default-export
export const getUsers = async page => {
  const response = await request.get('users', { page });
  return extractDataFromResponse(response);
};
