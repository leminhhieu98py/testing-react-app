// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import useCounter from '../../components/use-counter'
import {act} from '@testing-library/react'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()

test('exposes the count and increment/decrement functions', () => {
  // 🐨 render the component
  // 🐨 get the elements you need using screen
  // 🐨 assert on the initial state of the hook
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  let result
  const TestComponent = () => {
    result = useCounter()
    return null
  }
  render(<TestComponent />)

  const {increment, decrement} = result

  expect(result.count).toBe(0)

  act(() => increment())
  expect(result.count).toBe(1)

  act(() => decrement())
  expect(result.count).toBe(0)
})

/* eslint no-unused-vars:0 */
