// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'

// NOTE: this is a new requirement in React 18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  //
  // 🐨 append the div to document.body (💰 document.body.append)
  //
  // 🐨 use createRoot to render the <Counter /> to the div
  // 🐨 get a reference to the increment and decrement buttons:
  //   💰 div.querySelectorAll('button')
  // 🐨 get a reference to the message div:
  //   💰 div.firstChild.querySelector('div')
  //
  // 🐨 expect the message.textContent toBe 'Current count: 0'
  // 🐨 click the increment button (💰 act(() => increment.click()))
  // 🐨 assert the message.textContent
  // 🐨 click the decrement button (💰 act(() => decrement.click()))
  // 🐨 assert the message.textContent
  //
  // 🐨 cleanup by removing the div from the page (💰 div.remove())
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak

  const div = document.createElement('div')
  document.body.append(div)
  const root = createRoot(div)
  act(() => root.render(<Counter />))

  const increaseClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })

  const decreaseClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })

  const buttons = document.querySelectorAll('button')
  const increment = buttons[0]
  const decrement = buttons[1]
  const message = div.firstChild.querySelector('div')

  expect(message).toHaveTextContent('0')

  act(() => increment.dispatchEvent(increaseClickEvent))
  expect(message).toHaveTextContent('1')

  act(() => decrement.dispatchEvent(decreaseClickEvent))
  expect(message).toHaveTextContent('0')

  root.unmount()
})

/* eslint no-unused-vars:0 */
