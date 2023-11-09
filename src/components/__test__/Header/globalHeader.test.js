import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import renderer, { act } from 'react-test-renderer'
import GlobalHeader from '../../Header/GlobalHeader'

jest.describe('GlobalHeader', () => {
  test('should call global() function and update dataGlobal state', async () => {
    const mockData = {
      data: {
        active_cryptocurrencies: 10,
        markets: 20,
        market_cap_change_percentage_24h_usd: 5,
        total_market_cap: {
          BTC: 100,
          ETH: 50
        },
        market_cap_percentage: {
          BTC: 60,
          ETH: 30
        }
      }
    }

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      })
    )

    let component
    await act(async () => {
      component = renderer.create(<GlobalHeader />)
    })

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    expect(global.fetch).toHaveBeenCalledTimes(1)
  })
})
