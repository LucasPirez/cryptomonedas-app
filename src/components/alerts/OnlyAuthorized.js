import { useEffect } from 'react'
import { deleteData } from '../../redux/features/userData'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

export default function OnlyAuthorized({ children }) {
  const { push } = useRouter()
  const userData = useSelector((state) => state.userData)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userData.userDataId) {
      console.log(userData)
    } else {
      dispatch(deleteData())
      push('/criptos/1')
    }
  }, [])

  return <>{userData.userDataId && <>{children} </>}</>
}
