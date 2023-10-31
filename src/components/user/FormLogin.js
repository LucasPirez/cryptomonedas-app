import { useState } from 'react'
import { useValidateForms } from '../../hook/useValidateForms'
import { authServices } from '../../services/authServices'
import { storageUser } from '../../util/localStorageUser'
import { tokenAccess } from '../../util/tokenAccess'

export default function FormLogin() {
  const { handleBlur } = useValidateForms()
  const [formValues, setFormValues] = useState({
    userName: '',
    password: ''
  })

  const sendData = async (e) => {
    e.preventDefault()
    try {
      const { token, userData } = await authServices.login(formValues)

      console.log(token, userData)

      tokenAccess.set(token)
      storageUser.setData(userData)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  return (
    <>
      <form>
        <div className='container_input'>
          <input
            type='text'
            name='userName'
            onBlur={handleBlur}
            required
            value={formValues.userName}
            onChange={handleChange}
          />
          <label htmlFor='firstName'> UserName </label>
        </div>{' '}
        <div className='container_input'>
          <input
            type='password'
            onBlur={handleBlur}
            name='password'
            required
            value={formValues.password}
            onChange={handleChange}
          />
          <label htmlFor='password'> Passoword</label>
        </div>
      </form>

      <div className='container_buttons'>
        <button onClick={sendData}>Login</button>
      </div>
      <style jsx>{`
        form {
          width: 90%;
          margin-bottom: 1rem;
        }
        .container_title {
          width: 100%;
          height: auto;
          padding: 1rem 2.3rem;
          line-height: 0.2;
        }
        a {
          color: #1a73e8;
          font-size: 1.1rem;
        }

        .container_input {
          display: flex;
          justify-content: center;
          flex-direction: column;
          width: 100%;
          margin: 1rem 0;
        }

        label {
          margin: 0.3rem 1rem;
          position: absolute;
        }

        input {
          padding: 0.7rem 1.5rem;
          border-radius: 9999px;
          border: none;
          background: #dadce0;
        }
        input:focus + label,
        input:valid + label {
          visibility: hidden;
        }

        button {
          padding: 0.8rem 1.8rem;
          font-size: 1.2rem;

          border-radius: 999px;
          border: none;
          background: #1a73e8;
          color: #fafafa;
        }
      `}</style>
    </>
  )
}
