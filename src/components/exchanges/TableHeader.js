import { exchangeReducer } from '../../redux/features/listExchanges'
import { color } from '../../styles/colors'
import OrderTable from '../OrderTable'
export default function TableHeader({ dataExchanges }) {
  return (
    <>
      <thead>
        {dataExchanges && (
          <tr className='local_tr'>
            <th>
              <OrderTable
                action={exchangeReducer}
                coinTable={dataExchanges}
                type={'number'}
                nameConvert={'trust_score_rank'}
              >
                <span>#</span>
              </OrderTable>
            </th>
            <th>
              <OrderTable
                action={exchangeReducer}
                coinTable={dataExchanges}
                type={'string'}
                nameConvert={'id'}
              >
                <span>Name</span>
              </OrderTable>
            </th>
            <th>
              <OrderTable
                action={exchangeReducer}
                coinTable={dataExchanges}
                type={'number'}
                nameConvert={'trust_score'}
              >
                <span>Trust Score</span>
              </OrderTable>
            </th>
            <th>
              <OrderTable
                action={exchangeReducer}
                coinTable={dataExchanges}
                type={'number'}
                nameConvert={'trade_volume_24h_btc_normalized'}
              >
                <span>Volume 24h Normalized</span>
              </OrderTable>
            </th>
            <th>
              <OrderTable
                action={exchangeReducer}
                coinTable={dataExchanges}
                type={'number'}
                nameConvert={'trade_volume_24h_btc'}
              >
                <span>Volume 24h</span>
              </OrderTable>
            </th>

            <th>Description</th>
          </tr>
        )}
      </thead>
      <style jsx>
        {`
          th {
            height: 50px;
            position: relative;
            text-align: center;
            border-top: 2px solid ${color.letters}20;
            align-self: bottom;
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

          .local_tr {
            height: 80px;
          }
        `}
      </style>
    </>
  )
}
