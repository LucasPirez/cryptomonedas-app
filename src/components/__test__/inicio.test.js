import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SelectPage from '../inicio/SelectPage'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

let store
const mockF = jest.fn()

beforeEach(() => {
  store = mockStore({
    criptoList: {
      currencySelect: { currency: 'usd' },
    },
  })
})

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: { pe: 3 },
  }),
}))

const page = 2
describe('<SelectPage />', () => {
  test('rendesrs Content Header', () => {
    render(
      <Provider store={store}>
        <SelectPage
          route={'criptos'}
          max={100}
          reInitCount={mockF}
          page={page}
        />
      </Provider>
    )
    screen.getByText(/NEXT/i)
    screen.getByText(page)
    screen.getByText(page + 1)
    screen.getByText(page + 2)

    // expect(mockF.mock.calls).toHaveLength(1)
    // const button = screen.getByText(/PREV/i)

    // expect(letter).toBeInTheDocument()
  })
})
