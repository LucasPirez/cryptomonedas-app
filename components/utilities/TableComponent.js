import { color } from '../../styles/colors'
import { useSelector } from 'react-redux'
import { coinReduceTable } from '../../redux/features/listCriptos'
import OrderTable from '../OrderTable'

export default function TableComponent() {
  const { criptoList, currencySelect } = useSelector(
    (state) => state.criptoList
  )

  return (
    <>
      <th>
        <OrderTable
          action={coinReduceTable}
          coinTable={criptoList}
          type={'number'}
          nameConvert={'market_cap_rank'}
        >
          <span>#</span>
        </OrderTable>
      </th>
      <th>
        <OrderTable
          action={coinReduceTable}
          coinTable={criptoList}
          type={'string'}
          nameConvert={'id'}
        >
          <span>Name</span>
        </OrderTable>
      </th>
      <th>
        <OrderTable
          action={coinReduceTable}
          coinTable={criptoList}
          type={'number'}
          nameConvert={'current_price'}
        >
          <span>Price</span>
        </OrderTable>
      </th>
      <th>
        <OrderTable
          action={coinReduceTable}
          coinTable={criptoList}
          type={'number'}
          nameConvert={'price_change_percentage_24h_in_currency'}
        >
          <span>24h %</span>
        </OrderTable>
      </th>
      <th>
        <OrderTable
          action={coinReduceTable}
          coinTable={criptoList}
          type={'number'}
          nameConvert={'price_change_percentage_7d_in_currency'}
        >
          <span>7d %</span>
        </OrderTable>
      </th>
      <th>
        <OrderTable
          action={coinReduceTable}
          coinTable={criptoList}
          type={'number'}
          nameConvert={'total_volume'}
        >
          <span>Total Volume</span>
        </OrderTable>
      </th>
      <th>
        <OrderTable
          action={coinReduceTable}
          coinTable={criptoList}
          type={'number'}
          nameConvert={'market_cap'}
        >
          <span>Market Cap</span>
        </OrderTable>
      </th>
      <th>Last 7 Days</th>

      <style jsx>
        {`
          th {
            min-height: 60px;

            min-width: 60px;
            position: relative;
            text-align: center;
            border-top: 2px solid ${color.letters}20;
            align-self: bottom;
          }
        `}
      </style>
    </>
  )
}
