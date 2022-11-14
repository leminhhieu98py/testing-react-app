// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render} from '@testing-library/react'
import useCounter from '../../components/use-counter'
import {act} from '@testing-library/react'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()

const result = {}
const TestComponent = props => {
  Object.assign(
    result,
    useCounter({
      initialCount: props?.initialCount || 0,
      step: props?.step || 1,
    }),
  )
  return null
}

test('exposes the count and increment/decrement functions', () => {
  // 🐨 render the component
  // 🐨 get the elements you need using screen
  // 🐨 assert on the initial state of the hook
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  render(<TestComponent />)

  const {increment, decrement} = result

  expect(result.count).toBe(0)

  act(() => increment())
  expect(result.count).toBe(1)

  act(() => decrement())
  expect(result.count).toBe(0)
})

test('allows customization of the initial count', () => {
  render(<TestComponent initialCount={1} />)

  const {increment, decrement} = result

  expect(result.count).toBe(1)

  act(() => increment())
  expect(result.count).toBe(2)

  act(() => decrement())
  expect(result.count).toBe(1)
})

test('allows customization of the step', () => {
  render(<TestComponent step={5} />)

  const {increment, decrement} = result

  expect(result.count).toBe(0)

  act(() => increment())
  expect(result.count).toBe(5)

  act(() => decrement())
  expect(result.count).toBe(0)
})

/* eslint no-unused-vars:0 */
