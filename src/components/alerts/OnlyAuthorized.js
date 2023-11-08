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
      console.log('autorizado')
      //   dispatch(deleteData())
    } else {
      // push('/criptos/1')
    }
  }, [])
  console.log(userData)
  return <>{userData.userDataId && <>{children} </>}</>
}
