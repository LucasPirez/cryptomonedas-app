import { Button } from 'primereact/button'
import { useContextForm } from '../contexts/contextForm'
import { useToastContext } from '../contexts/contextToast'
import { alertServices } from '../../../services/alertServices'

export default function AddAlert() {
  const { formState, updateAlerts, buttonDisabled } = useContextForm()
  const { toastSucces, toastError } = useToastContext()

  const handleClick = async () => {
    try {
      const response = await alertServices.addAlert({
        ...formState,
        dateCreate: new Date()
      })
      toastSucces('The alert was created successfully')
      updateAlerts(response)
    } catch (error) {
      toastError(error.message)
    }
  }

  return (
    <Button
      label='Create'
      type='submit'
      disabled={buttonDisabled}
      onClick={handleClick}
      style={{
        float: 'right',
        marginBottom: '30px',
        marginRight: '20px'
      }}
    />
  )
}
