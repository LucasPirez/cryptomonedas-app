import { useEffect } from 'react'
import { EPExchangesAdapter } from '../../adapters/EPExchagesAdapter'
import useIntersectionObserver from '../../hook/useIntersectionObserver'
import { color } from '../../styles/colors'
import SelectPage from '../inicio/SelectPage'
import Loading from '../Loading'
import RowExchanges from './RowExchanges'
import { useSelector, useDispatch } from 'react-redux'
import { exchanges, updatePage } from '../../redux/features/listExchanges'
import TableHeader from './TableHeader'

export default function Exchanges({ query }) {
  const { container, count, reInitCount } = useIntersectionObserver()
  const { dataExchanges, bitcoin, page } = useSelector(
    (state) => state.exchangesList
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (page !== +query) {
      dispatch(updatePage(parseInt(query)))
      dispatch(exchanges(parseInt(query)))
    }
  }, [query])

  return (
    <>
      <h1>Top Crypto Exchanges Ranked by Trust Score</h1>
      <div>
        <table>
          <TableHeader dataExchanges={dataExchanges} />
          <tbody>
            {dataExchanges ? (
              dataExchanges.map((u, i) => {
                if (i < count) {
                  return (
                    <tr key={u.id}>
                      <RowExchanges
                        data={EPExchangesAdapter(u)}
                        bitcoinPrice={bitcoin}
                      />
                    </tr>
                  )
                }
              })
            ) : (
              <Loading />
            )}
          </tbody>
        </table>
      </div>
      <div
        ref={container}
        style={{ width: '100%', height: 30, background: 'trasparent' }}
      ></div>
      {page && (
        <SelectPage
          max={5}
          reInitCount={reInitCount}
          route={'exchanges'}
          page={page}
        />
      )}
      <style jsx>{`
        h1 {
          margin: 3rem;
          text-align: center;
          font-size: 1.6rem;
        }
        div {
          max-width: 1150px;
          margin: 0 auto;
          position: relative;
          min-height: '90vh';
          overflow-x: auto;
          width: '100%';
        }
        table {
          margin: auto;
          width: 90%;
          min-height: 90vh;
          position: relative;
          opacity: 0.96;
          border-collapse: collapse;
        }
        tbody {
        }

        tr {
          height: 80px;
          border-bottom: 2px solid ${color.letters}50;
          cursor: pointer;
          transition: all 0.3s;
        }
        tr:hover {
          background: #eee;
        }

        @media screen and (max-width: 1000px) {
          .local_tr {
            height: 90px;
          }
        }
      `}</style>
    </>
  )
}
