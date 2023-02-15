import useAppContext from '../../context/TableContext'
import { color } from '../../styles/colors'
import { useSelector } from 'react-redux'
import OrderTable from '../OrderTable'

export default function TableComponent() {
  const { setCoinTable, coinTable } = useAppContext()
  return (
    <>
      <th>
        <OrderTable
          setCoinTable={setCoinTable}
          coinTable={coinTable}
          type={'number'}
          nameConvert={'market_cap_rank'}
        >
          <span>#</span>
        </OrderTable>
      </th>
      <th>
        <OrderTable
          setCoinTable={setCoinTable}
          coinTable={coinTable}
          type={'string'}
          nameConvert={'id'}
        >
          <span>Name</span>
        </OrderTable>
      </th>
      <th>
        <OrderTable
          setCoinTable={setCoinTable}
          coinTable={coinTable}
          type={'number'}
          nameConvert={'current_price'}
        >
          <span>Price</span>
        </OrderTable>
      </th>
      <th>
        <OrderTable
          setCoinTable={setCoinTable}
          coinTable={coinTable}
          type={'number'}
          nameConvert={'price_change_percentage_24h_in_currency'}
        >
          <span>24h %</span>
        </OrderTable>
      </th>
      <th>
        <OrderTable
          setCoinTable={setCoinTable}
          coinTable={coinTable}
          type={'number'}
          nameConvert={'price_change_percentage_7d_in_currency'}
        >
          <span>7d %</span>
        </OrderTable>
      </th>
      <th>
        <OrderTable
          setCoinTable={setCoinTable}
          coinTable={coinTable}
          type={'number'}
          nameConvert={'total_volume'}
        >
          <span>Total Volume</span>
        </OrderTable>
      </th>
      <th>
        <OrderTable
          setCoinTable={setCoinTable}
          coinTable={coinTable}
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
