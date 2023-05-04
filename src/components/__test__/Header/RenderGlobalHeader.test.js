import RenderGlobarHeader from '../../Header/RenderGlobalHeader'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { findDOMNode } from 'react-dom'

it('test_happy_path_data_and_marketCap_defined', () => {
  const dataGlobal = {
    data: {
      active_cryptocurrencies: 10,
      markets: 5,
      market_cap_change_percentage_24h_usd: 2.5,
    },
  }
  const marketCap = {
    total: 1000000000,
    Dominance: 60,
  }
  const { getByText } = render(
    <RenderGlobarHeader dataGlobal={dataGlobal} marketCap={marketCap} />
  )

  expect(getByText('Cryptos:')).toBeInTheDocument()
  expect(getByText('10')).toBeInTheDocument()
  expect(getByText('Exchanges:')).toBeInTheDocument()
  expect(getByText('5')).toBeInTheDocument()
  expect(getByText('Dominance:')).toBeInTheDocument()
  expect(getByText('60')).toBeInTheDocument()
  expect(getByText('Market Cap:')).toBeInTheDocument()
  expect(getByText('1,000,000,000')).toBeInTheDocument()
  expect(getByText('2.50%')).toBeInTheDocument()
})
