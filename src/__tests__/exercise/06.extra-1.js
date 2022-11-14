import React, {useState} from 'react'
import {render, screen, act} from '@testing-library/react'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

jest.mock('react-use-geolocation')

test('displays the users current location', () => {
  const fakePosition = {
    coords: {
      latitude: 2903,
      longitude: 98,
    },
  }

  let setValue

  const useMockCurrentPosition = () => {
    const [state, setState] = useState([])
    setValue = setState
    return state
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setValue([fakePosition, null])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent('2903')
  expect(screen.getByText(/longitude/i)).toHaveTextContent('98')
})

test('when there is error', () => {
  const fakeErrorMessage = new Error('Something went wrong')

  let setValue

  const useMockCurrentPosition = () => {
    const [state, setState] = useState([])
    setValue = setState
    return state
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setValue([null, fakeErrorMessage])
  })

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"Something went wrong"`,
  )
})
