import mockAxios from 'axios'
import AuthService from './auth'

jest.mock('axios')

describe('Auth service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a token when user make login', async () => {
    mockAxios.post.mockImplementationOnce(() => {
      const token = 'some_token'
      return Promise.resolve({ data: { token } })
    })

    const response = await AuthService(mockAxios).login({
      email: 'some@mail.me',
      password: 'somepassword'
    })

    expect(response.data).toHaveProperty('token')
    expect(response).toMatchSnapshot()
  })

  it('should return an user when user register', async () => {
    const user = {
      name: 'User',
      password: 'somepassword',
      email: 'some@mail.me'
    }

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: user })
    })

    const response = await AuthService(mockAxios).register(user)

    expect(response.data).toHaveProperty('name')
    expect(response.data).toHaveProperty('password')
    expect(response.data).toHaveProperty('email')
    expect(response).toMatchSnapshot()
  })

  it('should throw an error when not found', async () => {
    const errors = { status: 404, statusText: 'Not Found' }

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ request: errors })
    })

    const response = await AuthService(mockAxios).login({
      email: 'some@mail.me',
      password: 'somepassword'
    })

    expect(response.errors).toHaveProperty('status')
    expect(response.errors).toHaveProperty('statusText')
  })

  it('should throw an error when server failed on register', async () => {
    const errors = { status: 500, statusText: 'Internal Server Error' }

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ request: errors })
    })

    const response = await AuthService(mockAxios).register({
      name: 'User',
      email: 'some@mail.me',
      password: 'somepassword'
    })

    expect(response.errors).toHaveProperty('status')
    expect(response.errors).toHaveProperty('statusText')
  })
})
