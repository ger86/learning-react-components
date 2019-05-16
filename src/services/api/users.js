import request from 'Services/mockRequest';

const extractDataFromResponse = json => json.data;

// eslint-disable-next-line import/prefer-default-export
export const getUsers = page =>
  extractDataFromResponse(request.get('users', { page }));
