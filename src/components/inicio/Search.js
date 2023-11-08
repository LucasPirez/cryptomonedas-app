import { useSearchCoin } from '../../hook/useSearchCoin'
import { color } from '../../styles/colors'
import RenderSearch from './RenderSearch'

export default function Search() {
  const { state, handleChange, ref } = useSearchCoin()
  const { listFiltered, wordTiped } = state

  return (
    <>
      <div className='container' ref={ref}>
        <div className='container_input'>
          <input
            type='text'
            onChange={handleChange}
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
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: auto;
        }

        .container_input {
          margin: 40px auto;
          max-width: 700px;
          width: auto;
          position: relative;
        }

        .input {
          font-size: 1.2em;
          width: 100%;
          outline: none;
          padding: 0.3em 0.5em;
          background: ${color.letters};
          color: ${color.reduceBackground};
          border: 1.5px solid ${color.letters};
          border-radius: 3px;
        }
        .input::placeholder {
          color: ${color.background}90;
          color: ${color.reduceBackground}96;
        }
        .input:focus {
          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
            rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
          border: 1.5px solid ${color.blue};
        }
        .sub_container {
          margin: auto;
          width: 100%;
          height: 400px;
          position: absolute;
          background: ${color.letters};
          z-index: 9;
          overflow: auto;
        }
      `}</style>
    </>
  )
}
