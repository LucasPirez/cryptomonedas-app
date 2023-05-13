import { useReducer } from 'react'
import { lista } from '../../client/client'
import useClick from '../../hook/useClick'
import { color } from '../../styles/colors'
import RenderSearch from './RenderSearch'

const INITIAL_STATE = {
  list: [],
  listFiltered: [],
  wordTiped: ''
}

const TYPES = {
  cargarList: (state, payload) => {
    return { ...state, list: payload }
  },
  filtrar: (state, payload) => {
    return { ...state, listFiltered: payload }
  },
  escribir: (state, payload) => {
    return { ...state, wordTiped: payload }
  }
}

const reducer = (state, { type, payload }) => TYPES[type](state, payload)

export default function Search() {
  const [{ list, listFiltered, wordTiped }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE
  )
  const ref = useClick(() => dispatch({ type: 'escribir', payload: '' }))

  const handleChange = (e) => {
    const { value } = e.target

    dispatch({ type: 'escribir', payload: value })
    storage(value)
    if (value.length > 1) {
      const order = list
        .filter((u) => u.includes(value))
        .toSorted((a, b) => a.length - b.length)
      dispatch({
        type: 'filtrar',
        payload: order
      })
    }
    if (value.length === 0) {
      dispatch({ type: 'filtrar', payload: [] })
    }
  }

  const storage = (value) => {
    // localStorage.removeItem("listSearch");
    if (!list.length) {
      const storage = JSON.parse(localStorage.getItem('listSearch'))
      if (storage) {
        dispatch({ type: 'cargarList', payload: storage })
      } else {
        if (value.length > 1) {
          lista().then((data) => {
            const arr = data.map((u, i) => u.id.toLowerCase())
            localStorage.setItem('listSearch', JSON.stringify(arr))

            dispatch({
              type: 'cargarList',
              payload: arr
            })
          })
        }
      }
    }
  }

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
                listFiltered.map((u) => <RenderSearch u={u} key={u} />)}
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
