import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'

test('extra-1', () => {
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
