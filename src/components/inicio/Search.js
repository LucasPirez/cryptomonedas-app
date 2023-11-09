import { useSearchCoin } from '../../hook/useSearchCoin'
import { color } from '../../styles/colors'
import RenderSearch from './RenderSearch'
import { InputText } from 'primereact/inputtext'

export default function Search() {
  const { state, handleChange } = useSearchCoin()
  const { listFiltered, wordTiped } = state

  return (
    <>
      <div className='container'>
        <InputText
          type='text'
          onChange={(e) => handleChange(e.target.value)}
          style={{ width: '500px' }}
          className='input'
          placeholder='Search'
        />
        {wordTiped.length > 2 && (
          <div className='sub_container'>
            {listFiltered.length &&
              listFiltered.map((cripto) => (
                <RenderSearch cripto={cripto} key={cripto.id} />
              ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .container {
          margin: 40px auto;
          max-width: 500px;
          width: auto;
          position: relative;
        }

        .sub_container {
          margin: auto;
          width: 100%;
          max-height: 400px;
          position: absolute;
          background: var(--blueray-200);
          z-index: 9;
          overflow: auto;
        }
      `}</style>
    </>
  )
}
