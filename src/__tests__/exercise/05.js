// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
// 🐨 you'll need to grab waitForElementToBeRemoved from '@testing-library/react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
// 🐨 you'll need to import rest from 'msw' and setupServer from msw/node
import Login from '../../components/login-submission'
import {setupServer} from 'msw/node'
import {handlers} from 'test/server-handlers'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

// 🐨 get the server setup with an async function to handle the login POST request:
// 💰 here's something to get you started
// rest.post(
//   'https://auth-provider.example.com/api/login',
//   async (req, res, ctx) => {},
// )
// you'll want to respond with an JSON object that has the username.
// 📜 https://mswjs.io/

// 🐨 before all the tests, start the server with `server.listen()`
// 🐨 after all the tests, stop the server with `server.close()`

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  const user = userEvent.setup()

  const usernameInput = screen.getByLabelText(/username/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', {name: /submit/i})

  await user.type(usernameInput, username)
  await user.type(passwordInput, password)
  await user.click(submitButton)

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  const welcomeDiv = screen.getByText(/welcome/i)
  expect(welcomeDiv).toHaveTextContent(username)

  // 🐨 uncomment this and you'll start making the request!
  // await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  // as soon as the user hits submit, we render a spinner to the screen. That
  // spinner has an aria-label of "loading" for accessibility purposes, so
  // 🐨 wait for the loading spinner to be removed using waitForElementToBeRemoved
  // 📜 https://testing-library.com/docs/dom-testing-library/api-async#waitforelementtoberemoved

  // once the login is successful, then the loading spinner disappears and
  // we render the username.
  // 🐨 assert that the username is on the screen
})

test('test login when missing username', async () => {
  render(<Login />)
  const user = userEvent.setup()

  const submitButton = screen.getByRole('button', {name: /submit/i})
  await user.click(submitButton)
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  const alertUsernameDiv = screen.getByRole('alert')
  expect(alertUsernameDiv).toHaveTextContent(/username required/i)
})

test('test login when missing password', async () => {
  render(<Login />)
  const {username} = buildLoginForm()

  const user = userEvent.setup()

  const usernameInput = screen.getByLabelText(/username/i)
  const submitButton = screen.getByRole('button', {name: /submit/i})

  await user.type(usernameInput, username)

  await user.click(submitButton)
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  const alertPasswordDiv = screen.getByRole('alert')
  expect(alertPasswordDiv).toHaveTextContent(/password required/i)
})
