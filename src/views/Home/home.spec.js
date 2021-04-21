import { shallowMount } from '@vue/test-utils'
import Home from '.'
import { routes } from '../../router'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

describe('<Home />', () => {
  it('should render home correctly', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = shallowMount(Home, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should see the footer', async () => {
    const wrapper = shallowMount(Home, {
      global: {
        plugins: [router]
      }
    })

    const footerText = wrapper.get('p').text()

    expect(footerText).toContain('feedbacker')
    expect(footerText).toContain('2021')
  })
})
