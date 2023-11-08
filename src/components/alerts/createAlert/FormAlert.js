import { useRef } from 'react'
import { useSearchCoin } from '../../../hook/useSearchCoin'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { Card } from 'primereact/card'
import { useContextForm } from '../contexts/contextForm'
import AddAlert from './AddAlert'
// import FormLogin from '../../user/FormLogin'
import EditAlert from './EditAlert'

export default function FormAlert() {
  const { state, handleChange } = useSearchCoin()
  const { listFiltered } = state
  const refDropdown = useRef()
  const { formState, handleSetValueForm, isCoinExist } =
    useContextForm()
  const { coinName, minPrice, maxPrice } = formState

  if (coinName.length > 1 && coinName.length < 3) {
    refDropdown.current?.show()
  }
  console.log(formState)

  return (
    <>
      {state && (
        <>
          {/* <FormLogin /> */}
          <Card
            title='Create new Alert'
            style={{
              background: 'var(--highlight-bg)',
              textAlign: 'center'
            }}
          >
            <form>
              <div className='container'>
                <div>
                  <div className='p-float-label'>
                    <Dropdown
                      value={coinName}
                      onChange={(e) => {
                        let { value } = e.target

                        value =
                          typeof value === 'string' ? value : value.id

                        handleChange(value)
                        handleSetValueForm({
                          coinName: value
                        })
                      }}
                      options={listFiltered}
                      optionLabel='id'
                      inputId='dd-crypto'
                      className='w-full md:w-14rem'
                      ref={refDropdown}
                      style={{ width: '200px' }}
                      editable
                    />
                    <label htmlFor='dd-crypto'>Search a Crypto</label>
                  </div>
                  <small style={{ marginLeft: '15px' }}>hola</small>
                </div>
                <div className='p-float-label'>
                  <InputNumber
                    maxFractionDigits={5}
                    onChange={(e) =>
                      handleSetValueForm({ minPrice: e.value })
                    }
                    inputId='min-crypto'
                    value={minPrice}
                  />
                  <label htmlFor='min-crypto'>Min Price - USD</label>
                </div>
                <div className='p-float-label'>
                  <InputNumber
                    maxFractionDigits={5}
                    onChange={(e) =>
                      handleSetValueForm({ maxPrice: e.value })
                    }
                    inputId='max-crypto'
                    value={maxPrice}
                  />
                  <label htmlFor='max-crypto'>Max Price - USD</label>
                </div>
              </div>

              {!isCoinExist ? <AddAlert /> : <EditAlert />}
            </form>
          </Card>
        </>
      )}

      <style jsx>
        {`
          div {
            position: relative;
          }
          input {
          }
          .container {
            display: flex;
            margin: 20px;
            align-items: start;
            justify-content: center;
            gap: 5px;
          }

          @media screen and (max-width: 700px) {
            .container {
              flex-direction: column;
              align-items: center;
              gap: 30px;
            }
          }
        `}
      </style>
    </>
  )
}
