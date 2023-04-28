import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddDeleteFavorite from '../../favorites/AddDeleteFavorite'

describe('<AddDeleteFavorites/>', () => {
  test('test_add_favorites: add data to LocalStorgae and set Fill to true when button is clicked', () => {
    const mockSetOpacity = jest.fn()
    const mockData = 'bitcoin'
    const mockYes = 'yellow'
    const mockNo = 'grey'

    const { getByRole } = render(
      <AddDeleteFavorite
        yes={mockYes}
        no={mockNo}
        data={mockData}
        setOpacity={mockSetOpacity}
      />
    )

    const button = getByRole('button')
    expect(button).toHaveClass('no_fill')

    fireEvent.click(button)

    expect(button).toHaveClass('fill')
    expect(mockSetOpacity).toHaveBeenCalledWith(true)
  })
})
