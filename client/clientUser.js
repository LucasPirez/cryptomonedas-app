import { URL_BASE_DATOS } from "../constants/constants";

export default function login(data) {
  return fetch(`${URL_BASE_DATOS}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((err) => {
    console.log(err);
  });
}
