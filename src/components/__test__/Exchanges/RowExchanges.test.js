import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import RowExchanges from '../../exchanges/RowExchanges'

describe('test component RowExchanges', () => {
  const mockdata = {
    id: 'BNB',
    name: 'Binance',
    country: 'EEUU',
    url: 'https:mockURL.com',
    image: 'https://prueba.com',
    trustScore: 2,
    trustScoreRank: 3,
    tradeVolume24hBTC: 2000,
    tradeVolume24hBTCNormalized: 1000,
    description: 'texto descripcion',
  }

  beforeEach(() => {
    render(<RowExchanges data={mockdata} bitcoinPrice={3000} />)
  })

  test('test component', () => {
    expect(screen.queryByText('Read Description')).toBeInTheDocument()
    expect(screen.getAllByText('Binance')).toHaveLength(2)
    expect(screen.queryByText('2')).toBeInTheDocument()
    expect(screen.queryByText('3')).toBeInTheDocument()
    expect(
      screen.queryByText(`$${(1000 * 3000).toLocaleString()}`)
    ).toBeInTheDocument()
    expect(
      screen.queryByText(`$${(3000 * 2000).toLocaleString()}`)
    ).toBeInTheDocument()
  })

  test('test hover description part', () => {
    const description = screen.queryByText('Read Description')
    fireEvent.mouseEnter(description)
    expect(screen.queryByText('texto descripcion')).toBeInTheDocument()
  })
})
