import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddDeleteFavorite from '../../favorites/AddDeleteFavorite'
import React, { useState } from 'react'

describe('<AddDeleteFavorites/>', () => {
  test('test_add_favorites: add data to LocalStorgae and set Fill to true when button is clicked', () => {
    const mockSetOpacity = jest.fn()
    const mockData = 'bitcoin'
    const mockYes = 'yellow'
    const mockNo = 'grey'
    const mockSetItem = jest.spyOn(window.localStorage.__proto__, 'setItem')

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
    expect(mockSetItem).toHaveBeenCalledWith(
      'favorites_coin',
      JSON.stringify([mockData])
    )
    fireEvent.click(button)

    expect(mockSetItem).toHaveBeenCalledWith(
      'favorites_coin',
      JSON.stringify([])
    )

    expect(mockSetOpacity.mock.calls).toEqual([[true], [false]])
  })
})
