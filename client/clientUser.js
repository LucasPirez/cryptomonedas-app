import { URL_BASE_DATOS } from '../constants/constants'

export function signUp(data) {
  return fetch(`${URL_BASE_DATOS}/users/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((data) => {
      data.json()
    })
    .catch((err) => {
      console.log(err)
    })
}

export function SesionIn(data) {
  return fetch(`${URL_BASE_DATOS}/users/singup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).catch((err) => {
    console.log(err)
  })
}
