import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ActionButton from '@/components/ActionButton.vue'

describe('Action Button', () => {
  it('renders button with the correct text', () => {
    const wrapper = mount(ActionButton, {
      props: {
        buttonText: 'Click Me'
      }
    })

    expect(wrapper.find('button').text()).toBe('Click Me')
  })

  it('emits "button-clicked" event when clicked with enabled listener', async () => {
    const wrapper = mount(ActionButton, {
      props: {
        buttonText: 'Click Me',
        withListener: true
      }
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('button-clicked')).toBeTruthy()
    expect(wrapper.emitted('button-clicked')?.length).toBe(1)
  })

  it('does not emit "button-clicked" event with disabled listener', async () => {
    const wrapper = mount(ActionButton, {
      props: {
        buttonText: 'Click Me',
        withListener: false
      }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('button-clicked')).toBeFalsy()
  })
})
