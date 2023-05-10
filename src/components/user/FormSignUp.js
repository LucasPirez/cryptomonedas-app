import { useState } from 'react'
import { signUp } from '../../client/clientUser'
import { useValidateForms } from '../../hook/useValidateForms'

export default function FormSignUp() {
  const { handleBlur } = useValidateForms()
  const [formValues, setFormValues] = useState({
    email: '',
    completName: '',
    userAlias: '',
    password: ''
  })

  const sendData = async (e) => {
    e.preventDefault()
    try {
      const response = await signUp(formValues)
      // const result = await response.json();
      console.log(response)
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
            name='completName'
            onBlur={handleBlur}
            required
            value={formValues.completName}
            onChange={handleChange}
          />
          <label htmlFor='name'> Complet Name</label>
        </div>
        <div className='container_input'>
          <input
            type='text'
            name='userAlias'
            onBlur={handleBlur}
            required
            value={formValues.userAlias}
            onChange={handleChange}
          />
          <label htmlFor='name'> userAlias</label>
        </div>

        <div className='container_input'>
          <input
            type='email'
            name='email'
            required
            onBlur={handleBlur}
            value={formValues.email}
            onChange={handleChange}
          />
          <label htmlFor='email'>Email Address</label>
        </div>
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
        <a href='#'>Continue visit</a>
        <button onClick={sendData}>Sing In</button>
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

        .container_buttons {
          width: 80%;
          height: auto;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
        }
        a {
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
