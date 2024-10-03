import { mount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import ActionForm from '@/components/ActionForm.vue'
import ActionButton from '@/components/ActionButton.vue'

// Mocking router related params and methods beacause otherwise it fails
vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    params: { id: '1' }
  })),
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}))

describe('Action Form', () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    wrapper = mount(ActionForm, {
      global: {
        // Mocking implementation of pinia store
        plugins: [createTestingPinia({ createSpy: vi.fn() })],
        components: {
          ActionButton
        }
      }
    })
  })

  it('renders form fields correctly', () => {
    // Check for form fields
    expect(wrapper.find('input#name').exists()).toBe(true)
    expect(wrapper.find('input#rank').exists()).toBe(true)
    expect(wrapper.find('textarea#description').exists()).toBe(true)
  })

  it('adds a new prevention method input when "Add Prevention" button is clicked', async () => {
    const addButton = wrapper
      .findAllComponents(ActionButton)
      .find((b) => b.text() === 'Add Prevention')

    expect(wrapper.findAll('input.form-component__prevention-input').length).toBe(1)

    await addButton?.trigger('click')

    expect(wrapper.findAll('input.form-component__prevention-input').length).toBe(2)
  })

  it('removes a prevention method input when "Delete Prevention" button is clicked', async () => {
    const addButton = wrapper
      .findAllComponents(ActionButton)
      .find((b) => b.text() === 'Add Prevention')

    // Add another prevention to ensure there are two
    await addButton?.trigger('click')

    // Get the delete button and click it
    const deleteButton = wrapper
      .findAllComponents(ActionButton)
      .find((b) => b.text() === 'Delete Prevention')
    await deleteButton?.trigger('click')

    // Verify only one prevention input remains
    expect(wrapper.findAll('input.form-component__prevention-input').length).toBe(1)
  })

  it('emits submit event with correct data when form is submitted', async () => {
    const form = wrapper.find('form')

    await wrapper.find('input#name').setValue('SQL Injection')
    await wrapper.find('input#rank').setValue(5)
    await wrapper.find('textarea#description').setValue('SQL Injection vulnerability')
    await wrapper
      .find('input.form-component__prevention-input')
      .setValue('Use parameterized queries')

    // Submit the form
    await form.trigger('submit.prevent')

    // Check if the event is emitted with correct data
    const emitted = wrapper.emitted('submit-button-clicked') as Array<any>
    expect(emitted).toHaveLength(1)
    expect(emitted[0]).toEqual([
      {
        id: undefined,
        name: 'SQL Injection',
        rank: 5,
        description: 'SQL Injection vulnerability',
        preventions: ['Use parameterized queries']
      }
    ])
  })
})
