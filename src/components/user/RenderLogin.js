import { useEffect, useRef, useState } from 'react'
import Register from './Register'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from 'primereact/menu'
import { deleteData } from '../../redux/features/userData'
import { useRouter } from 'next/router'

export default function RenderLogin() {
  const [view, setView] = useState(false)
  const [first, setFirst] = useState(true)
  const { userDataId } = useSelector((state) => state.userData)
  const dispatch = useDispatch()
  const menu = useRef(null)
  const { push } = useRouter()

  const handleClose = () => setView(false)

  useEffect(() => {
    setView(false)
  }, [userDataId])

  const logout = [
    {
      label: 'Logout',
      icon: 'pi pi-user-minus',

      command: () => {
        menu.current.toggle(event)
        dispatch(deleteData())
        push('/criptos/1')
      }
    },
    {
      label: 'Cancel',
      icon: 'pi pi-times',
      command: (event) => {
        menu.current.toggle(event)
      }
    }
  ]

  const loginSignUp = [
    {
      label: 'Login',
      icon: 'pi pi-user',

      command: () => {
        menu.current.toggle(event)
        setView(true)
        setFirst(true)
      }
    },
    {
      label: 'SignUp',
      icon: 'pi pi-user-plus',
      command: (event) => {
        menu.current.toggle(event)
        setView(true)
        setFirst(false)
      }
    },
    {
      label: 'Cancel',
      icon: 'pi pi-times',
      command: (event) => {
        menu.current.toggle(event)
      }
    }
  ]

  return (
    <>
      <i
        className='pi pi-user'
        onClick={(event) => menu.current.toggle(event)}
        style={{ transform: 'scale(1.2)', color: 'var(--red-700)' }}
      />
      <Menu
        model={userDataId ? logout : loginSignUp}
        popup
        ref={menu}
        id='popup_menu_left'
      />

      {view && <Register first={first} onClose={handleClose} />}
    </>
  )
}
