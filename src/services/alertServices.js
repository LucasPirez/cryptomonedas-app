import { URL_BASE_DATOS } from '../constants/constants'
import { storageUser } from '../storage/localStorageUser'
import { tokenAccess } from '../storage/tokenAccess'

const userData = () => JSON.parse(storageUser().getData())

export const alertServices = {
  /**
   *
   * @param {abort} AbortController
   *
   * @return - backend Response
   */
  getAllAlerts: ({ abort }) => {
    return fetch(
      `${URL_BASE_DATOS}/Alerts/obtainAlerts?idUser=${
        userData()?.userDataId
      }`,
      {
        signal: abort.signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenAccess.get()}`
        }
      }
    ).then((data) => data.json())
  },
  /**
   *
   * @param {data} param0- alert to add
   * -
   * @return backend response
   */
  addAlert: (data) => {
    return fetch(
      `${URL_BASE_DATOS}/Alerts/Add?userDataId=${
        userData()?.userDataId
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenAccess.get()}`
        },
        body: JSON.stringify(data)
      }
    ).then((data) => console.log(data))
  },
  /**
   *
   * @param {data} param0- alert to edit
   * -
   * @return backend response
   */
  editAlert: (data) => {
    return fetch(
      `${URL_BASE_DATOS}/Alerts/Edit?userDataId=${
        userData()?.userDataId
      }`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenAccess.get()}`
        },
        body: JSON.stringify(data)
      }
    ).then((data) => {
      console.log(data)
      if (data.ok) {
        return data
      } else {
        throw new Error('Error al editar la alerta')
      }
    })
  },
  /**
   *
   * @param {coinName} param0 -- nombre de criptomoneda
   * @returns
   */
  deleteAlert: (coinName) => {
    return fetch(
      `${URL_BASE_DATOS}/Alerts/Delete?userDataId=${
        userData()?.userDataId
      }&CoinName=${coinName}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenAccess.get()}`
        }
      }
    ).then((data) => {
      if (data.ok) {
        return data
      } else {
        throw new Error('Error al editar la alerta')
      }
    })
  }
}
