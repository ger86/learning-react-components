import getUserInfoFromFacebook from 'Services/getUserInfoFromFacebook';

const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';

export function facebookLoginThunk() {
  return async dispatch => {
    window.FB.login(
      async response => {
        if (response.status === 'connected') {
          const me = await getUserInfoFromFacebook(
            'name,email,picture.width(500).height(500)'
          );
          const user = {
            ...me,
            accessToken: response.authResponse.accessToken
          };
          return dispatch(loginSucceeded(user));
        }
        throw new Error('cannot login');
      },
      { scope: 'public_profile,email' }
    );
  };
}

function loginSucceeded(user) {
  return {
    type: LOGIN_SUCCEEDED,
    user
  };
}

export default (state = { user: null }, action) => {
  switch (action.type) {
    case LOGIN_SUCCEEDED:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export const getCurrentUser = state => state.user;
export const isAuthenticated = state => state.user !== null;
