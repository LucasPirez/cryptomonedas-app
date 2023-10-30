import { URL_BASE_DATOS } from '../constants/constants'

export const authServices = {
  login: ({ username, password }) => {
    return fetch(`${URL_BASE_DATOS}/User/Login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: { userName: username, password }
    }).then((data) => data.json())
  },
  createUser: (user) => {
    return fetch(`${URL_BASE_DATOS}/User/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: user.userName,
        userEmail: user.userEmail,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: 'User'
      })
    }).then((data) => data.json())
  },
  editUser: (user) => {
    return fetch(`${URL_BASE_DATOS}/User/editUser`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      })
    }).then((data) => data.json())
  },
  obtain: async () => {
    const response = await fetch(`${URL_BASE_DATOS}/User/obtain`)
    return response.json()
  }
}
