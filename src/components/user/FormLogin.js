import { useState } from 'react'
import { useValidateForms } from '../../hook/useValidateForms'
import { authServices } from '../../services/authServices'
import { tokenAccess } from '../../storage/tokenAccess'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../redux/features/userData'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

export default function FormLogin() {
  const { handleBlur } = useValidateForms()
  const [formValues, setFormValues] = useState({
    userName: '',
    password: ''
  })
  const dispatch = useDispatch()

  const sendData = async (e) => {
    e.preventDefault()
    try {
      const { token, userData } = await authServices.login(formValues)

      console.log(token, userData)
      dispatch(setUserData({ userData, token }))
      tokenAccess.set(token)
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
          <InputText
            type='text'
            name='userName'
            placeholder='UserName'
            onBlur={handleBlur}
            required
            value={formValues.userName}
            onChange={handleChange}
          />
          {/* <label htmlFor='firstName'> UserName </label> */}
        </div>{' '}
        <div className='container_input'>
          <InputText
            type='password'
            onBlur={handleBlur}
            name='password'
            placeholder='password'
            required
            value={formValues.password}
            onChange={handleChange}
          />
          {/* <label htmlFor='password'> Passoword</label> */}
        </div>
      </form>

      <div className='container_buttons'>
        <Button label='Login' onClick={sendData} severity='info' />
      </div>
      <style jsx>{`
        form {
          width: 90%;
          margin-bottom: 1rem;
          z-index: 99;
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
