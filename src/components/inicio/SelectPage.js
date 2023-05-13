import { color } from '../../styles/colors'
import Button from '../Button'
import { usePagination } from '../../hook/usePagination'

export default function SelectPage({ route, max, reInitCount, page }) {
  const { handleClickValue } = usePagination(route)

  return (
    <>
      <div>
        {page > 1 && (
          <Button onClick={(e) => handleClickValue(e, page - 1)}>
            <span>PREV</span>
          </Button>
        )}
        {page > 3 && (
          <Button onClick={(e) => handleClickValue(e, 1)}>
            <span>1</span>
          </Button>
        )}
        <Button select={true} onClick={(e) => handleClickValue(e, page)}>
          <span>{page}</span>
        </Button>
        {page < max && (
          <Button onClick={(e) => handleClickValue(e, page + 1)}>
            <span>{page + 1}</span>
          </Button>
        )}
        {page < max - 1 && (
          <Button onClick={(e) => handleClickValue(e, page + 2)}>
            <span>{page + 2}</span>
          </Button>
        )}

        <span>...</span>
        <Button onClick={(e) => handleClickValue(e, max)}>
          <span>{max}</span>
        </Button>
        {page < max && (
          <Button onClick={(e) => handleClickValue(e, page + 1)}>
            <span>NEXT</span>
          </Button>
        )}
      </div>
      <style jsx>{`
        div {
          text-align: center;
          margin: 15px 0;
          width: 100%;
        }
        span {
          font-family: monospace;
          font-weight: 600;
          font-size: 1.3em;
          padding: 0.4em 0.5em;
          transition: color 0.3s;
        }

        span:hover {
          color: ${color.lightBlue};
        }
      `}</style>
    </>
  )
}
