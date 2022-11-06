// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
const {build, fake} = require('@jackfranklin/test-data-bot')

test('submitting the form calls onSubmit with username and password', async () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  //
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  //
  // 🐨 get the username and password fields via `getByLabelText`
  // 🐨 use `await userEvent.type...` to change the username and password fields to
  //    whatever you want
  //
  // 🐨 click on the button with the text "Submit"
  //
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue

  const onSubmit = jest.fn()
  const loginFormBuilder = build('loginInfo', {
    fields: {
      username: fake(faker => faker.internet.userName()),
      password: fake(faker => faker.internet.password()),
    },
  })

  const {username, password} = loginFormBuilder()

  render(<Login onSubmit={onSubmit} />)
  const user = userEvent.setup()

  const usernameInput = screen.getByRole('textbox', {name: /username/i})
  const passwordInput = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', {name: /submit/i})

  await user.type(usernameInput, username)
  await user.type(passwordInput, password)
  await user.click(submitButton)

  expect(onSubmit).toHaveBeenCalledTimes(1)
  expect(onSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
})

/*
eslint
  no-unused-vars: "off",
*/
