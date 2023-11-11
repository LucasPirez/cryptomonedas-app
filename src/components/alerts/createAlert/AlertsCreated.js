import { useEffect } from 'react'
import { alertServices } from '../../../services/alertServices'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import {
  INITIAL_STATE_FORM,
  useContextForm
} from '../contexts/contextForm'
import DeleteAlert from './DeleteAlert'
import { useToastContext } from '../contexts/contextToast'

export default function AlertsCreated() {
  const { handleSetValueForm, formState, alerts, updateAlerts } =
    useContextForm()
  const { toastError } = useToastContext()

  useEffect(() => {
    const abortController = new AbortController()
    ;(async () => {
      try {
        const response = await alertServices.getAllAlerts({
          abort: abortController
        })
        handleSetValueForm(INITIAL_STATE_FORM)
        updateAlerts(response)
      } catch (error) {
        toastError('An Error has occurred')
      }

      return () => abortController.abort()
    })()
  }, [])

  const ptButton = {
    root: {
      style: {
        marginLeft: 15
      }
    }
  }

  return (
    <>
      {alerts?.alerts?.map((alert) => {
        const { coinId, ...rest } = alert

        return (
          <Card
            key={coinId}
            title={coinId}
            pt={{
              root: {
                style: {
                  paddingLeft: '30px',
                  paddingRight: '30px',
                  background: `${
                    coinId === formState.coinName
                      ? 'var(--surface-100)'
                      : ''
                  }`,
                  transitionDuration: '1s'
                }
              },
              title: {
                style: {
                  color: 'var(--cyan-500)'
                }
              },
              content: {
                style: {
                  display: 'flex',
                  justifyContent: 'space-around'
                }
              }
            }}
          >
            <div className='prices_container'>
              <div>
                <span className='text_span'>Min Price: </span>
                <span>$ {alert.minPrice}</span>
              </div>
              <div>
                <span className='text_span'>Max Price: </span>
                <span>$ {alert.maxPrice}</span>
              </div>
            </div>
            <div className='container_buttons'>
              <Button
                outlined
                raised
                severity='help'
                pt={ptButton}
                title='Edit'
                onClick={(e) =>
                  handleSetValueForm({
                    ...rest,
                    coinName: coinId
                  })
                }
              >
                <i className='pi pi-file-edit'></i>
              </Button>

              <DeleteAlert coinName={alert.coinId} />
            </div>
          </Card>
        )
      })}
      <style jsx>
        {`
          .text_span {
            font-weight: bold;
            font-size: 1.2rem;
          }
          .prices_container {
            display: flex;

            width: 70%;
            justify-content: space-around;
          }

          @media screen and (max-width: 700px) {
            .prices_container {
              flex-direction: column;

              width: 90%;
            }
            .container_buttons {
              display: flex;
              flex-direction: column;
              gap: 20px;
            }
          }
        `}
      </style>
    </>
  )
}
