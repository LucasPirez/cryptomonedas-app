import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SelectCurrency from '../../Header/SelectCurrency'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])
let store

beforeEach(() => {
  store = mockStore({
    criptoList: {
      currencySelect: { currency: 'usd' },
    },
  })
})
const mockfn = jest.fn()
const mockfn2 = jest.fn()

describe('test <SelectCurrency />', () => {
  test('testo de renderizado de selector de moneda', () => {
    const { getByRole, getAllByRole, getAllByTestId, getAllByLabelText } =
      render(
        <Provider store={store}>
          <SelectCurrency
            handleClick={mockfn}
            viewSelect={false}
            handleVisibility={mockfn2}
          />
        </Provider>
      )

    const button = getByRole('button')
    fireEvent.click(button)
    const buttonChangeCurrency = getAllByTestId('idButton')
    for (let i = 0; i < buttonChangeCurrency.length; i++) {
      fireEvent.click(buttonChangeCurrency[i])
    }
    const pCount = document.getElementsByTagName('p')

    expect(pCount.length).toBe(21)
    expect(mockfn2.mock.calls).toHaveLength(1)
    expect(mockfn.mock.calls).toHaveLength(46)
  })
})
