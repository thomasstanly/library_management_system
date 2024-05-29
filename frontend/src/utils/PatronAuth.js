import { jwtDecode } from 'jwt-decode'
import axios from '../Axios'

const UpdateUserToken = async () => {

  const refreshToken = JSON.parse(localStorage.getItem("refresh"));
  console.log('user refresh', refreshToken)
  try {
    const res = await axios.post('token/refresh/',
      {
        "refresh": refreshToken
      })
    if (res.status === 200) {
      localStorage.setItem('access', JSON.stringify(res.data.access))
      localStorage.setItem('refresh', JSON.stringify(res.data.refresh))
      let decoded = jwtDecode(res.data.access);
      console.log('user access', res.data.access)
      return {
        user_id: decoded.user_id,
        'name': decoded.first_name,
        isAuthenticated: true,
        isAdmin: decoded.is_superuser
      }
    }
    else {
      return {
        'email': null,
        'name': null,
        isAuthenticated: false,
        isAdmin: false
      }
    }

  }
  catch (error) {
    return {
      'email': null,
      'name': null,
      isAuthenticated: false,
      isAdmin: false
    }
  }
};


const isAuthUser = async () => {

  const accessToken = localStorage.getItem("access");
  if (!accessToken) {
    return { 'name': null, isAuthenticated: false }
  }
  const currentTime = Date.now() / 1000;
  let decoded = jwtDecode(accessToken);
  if (decoded.exp > currentTime) {
    return {
      user_id: decoded.user_id,
      name: decoded.first_name,
      isAuthenticated: true,
      isAdmin: decoded.is_superuser
        }
  } else {
    const updateSuccess = await UpdateUserToken();
    return updateSuccess;
  }

}
export default isAuthUser