// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import Counter from '../../examples/counter-hook'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()

test('exposes the count and increment/decrement functions', async () => {
  // 🐨 render the component
  // 🐨 get the elements you need using screen
  // 🐨 assert on the initial state of the hook
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  render(<Counter />)
  const countDiv = screen.getByText(/current count/i)
  const increaseButton = screen.getByRole('button', {name: /increment/i})
  const decreaseButton = screen.getByRole('button', {name: /decrement/i})

  expect(countDiv).toHaveTextContent('Current count: 0')

  await userEvent.click(increaseButton)
  expect(countDiv).toHaveTextContent('Current count: 1')

  await userEvent.click(decreaseButton)
  expect(countDiv).toHaveTextContent(/0/)
})

/* eslint no-unused-vars:0 */
