import { useState } from 'react'
import { useValidateForms } from '../../hook/useValidateForms'
import { authServices } from '../../services/authServices'
import { storageUser } from '../../storage/localStorageUser'
import { tokenAccess } from '../../storage/tokenAccess'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

export default function FormSignUp() {
  const { handleBlur } = useValidateForms()
  const [formValues, setFormValues] = useState({
    userEmail: '',
    firstName: '',
    lastName: '',
    userName: '',
    password: ''
  })

  const sendData = async (e) => {
    e.preventDefault()
    try {
      const { token, userData } = await authServices.createUser(
        formValues
      )

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
          <InputText
            type='text'
            name='firstName'
            placeholder='First Name'
            onBlur={handleBlur}
            required
            value={formValues.firstName}
            onChange={handleChange}
          />
          {/* <label htmlFor='firstName'> First Name</label> */}
        </div>{' '}
        <div className='container_input'>
          <InputText
            type='text'
            name='lastName'
            placeholder='Last Name'
            onBlur={handleBlur}
            required
            value={formValues.lastName}
            onChange={handleChange}
          />
          {/* <label htmlFor='lastName'> Last Name</label> */}
        </div>
        <div className='container_input'>
          <InputText
            type='text'
            name='userName'
            placeholder='Username'
            onBlur={handleBlur}
            required
            value={formValues.userName}
            onChange={handleChange}
          />
          {/* <label htmlFor='name'> userAlias</label> */}
        </div>
        <div className='container_input'>
          <InputText
            type='email'
            name='userEmail'
            placeholder='Email'
            required
            onBlur={handleBlur}
            value={formValues.userEmail}
            onChange={handleChange}
          />
          {/* <label htmlFor='email'>Email Address</label> */}
        </div>
        <div className='container_input'>
          <InputText
            type='password'
            onBlur={handleBlur}
            name='password'
            placeholder='Password'
            required
            value={formValues.password}
            onChange={handleChange}
          />
          {/* <label htmlFor='password'> Passoword</label> */}
        </div>
      </form>

      <div className='container_buttons'>
        <Button
          label='Create an Account'
          onClick={sendData}
          severity='info'
        />
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
