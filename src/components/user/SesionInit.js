import { useState } from 'react'
import { SesionIn } from '../../client/clientUser'

export default function SesionItit() {
  const [formValue, setFormValue] = useState({
    userAlias: '',
    password: ''
  })

  const handleChange = ({ target }) => {
    const { name, value } = target

    setFormValue({ ...formValue, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('hola')

    try {
      const response = await SesionIn(formValue)
      const result = await response.json()
      console.log(result)
      window.localStorage.setItem('loggedUser', JSON.stringify(result))
    } catch (error) {}
  }

  return (
    <form>
      <input
        type='text'
        name='userAlias'
        placeholder='userName'
        value={formValue.userAlias}
        onChange={handleChange}
      />
      <input
        type='password'
        name='password'
        placeholder='password'
        value={formValue.password}
        onChange={handleChange}
      />
      <button type='submit' onClick={handleSubmit}>
        login
      </button>
    </form>
  )
}
