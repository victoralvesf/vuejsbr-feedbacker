import useStore from '../hooks/useStore'
import { setCurrentUser, resetUserStore, setApiKey, clearCurrentUser } from './user'

let store = null

describe('User store', () => {
  beforeEach(() => {
    store = useStore()
  })

  afterEach(() => {
    resetUserStore()
  })

  it('should set current user', () => {
    setCurrentUser({ name: 'Some' })

    expect(store.user.currentUser.name).toBe('Some')
  })

  it('should set api_key on current user', () => {
    setApiKey('a12bc34d')

    expect(store.user.currentUser.apiKey).toBe('a12bc34d')
  })

  it('should clear the current user', () => {
    setCurrentUser({ name: 'Some' })
    expect(store.user.currentUser.name).toBe('Some')

    clearCurrentUser()
    expect(store.user.currentUser.name).toBeFalsy()
  })
})
