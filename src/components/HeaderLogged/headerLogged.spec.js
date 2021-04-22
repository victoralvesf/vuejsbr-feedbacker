import { shallowMount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import HeaderLogged from '.'
import { routes } from '../../router'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

const mockStore = { currentUser: {} }

jest.mock('../../hooks/useStore', () => {
  return () => {
    return mockStore
  }
})

describe('Header logged', () => {
  it('should render header logged correctly', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render 3 dots when there is no user logged in', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    const buttonLogout = wrapper.get('.loggout-button')

    expect(buttonLogout.text()).toBe('...')
  })

  it('should render user name when there is a user logged in', async () => {
    router.push('/')
    await router.isReady()

    mockStore.currentUser.name = 'Victor'

    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    const logoutButton = wrapper.get('.loggout-button')

    expect(logoutButton.text()).toBe('Victor (sair)')
  })
})
