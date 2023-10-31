// intermediario para acceder al token, por si luego cambio lugar de guardado de token por ejemplo una cookie.

import { storageUser } from './localStorageUser'

export const tokenAccess = {
  get: () => storageUser.getToken(),
  set: (token) => storageUser.setToken(token)
}
