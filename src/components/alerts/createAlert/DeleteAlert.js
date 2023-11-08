import { alertServices } from '../../../services/alertServices'
import { Button } from 'primereact/button'
import { useToastContext } from '../contexts/contextToast'
import { Dialog } from 'primereact/dialog'
import { useState } from 'react'
import { useContextForm } from '../contexts/contextForm'

export default function DeleteAlert({ coinName }) {
  const { toastSucces, toastError } = useToastContext()
  const [visible, setVisible] = useState(false)
  const { updateAlerts } = useContextForm()

  const ptButton = {
    root: {
      style: {
        marginLeft: 15
      }
    }
  }

  const handleClick = async () => {
    try {
      const response = await alertServices.deleteAlert(coinName)
      console.log(response)
      toastSucces('The alert was Deleted')
      updateAlerts()
    } catch (error) {
      console.log(error)
      toastError(error.message)
    }
    setVisible(false)
  }

  return (
    <>
      <Dialog
        header='Are you sure you want to delete the alert?'
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
      >
        <div style={{ float: 'right' }}>
          <p></p>
          <Button
            label='No'
            autoFocus
            outlined
            icon='pi pi-times'
            onClick={() => setVisible(false)}
            style={{
              marginRight: '20px'
            }}
          />
          <Button
            label='Yes'
            raised
            severity='danger'
            icon='pi pi-check'
            onClick={handleClick}
          />
        </div>
      </Dialog>
      <Button
        outlined
        raised
        onClick={() => setVisible(true)}
        severity='danger'
        pt={ptButton}
        title='Delete'
      >
        <i className='pi pi-trash'></i>
      </Button>
    </>
  )
}
