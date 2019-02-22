import jwtDecode from 'jwt-decode';


export const signupUser = user => dispatch => {
    dispatch(request());
    fetch(`${API_ORIGIN}/auth/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.statusText);
        }
        return res.json();
      })
      .then(authToken => storeAuthInfo(authToken.token, dispatch))
      .catch(err => {
        dispatch(fetchErr(err));
      });
  };