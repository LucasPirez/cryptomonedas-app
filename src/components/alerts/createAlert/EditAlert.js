import { alertServices } from '../../../services/alertServices'
import { useContextForm } from '../contexts/contextForm'
import { useToastContext } from '../contexts/contextToast'
import { Button } from 'primereact/button'

export default function EditAlert() {
  const { formState, updateAlerts, buttonDisabled } = useContextForm()
  const { toastSucces, toastError } = useToastContext()

  const handleClick = async () => {
    try {
      const response = await alertServices.editAlert({
        ...formState,
        dateCreate: new Date().toISOString()
      })
      toastSucces('The alert was Edited successfully')
      updateAlerts(response)
    } catch (error) {
      toastError(error.message)
    }
  }

  return (
    <Button
      label='Edit'
      type='submit'
      severity='secondary'
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
