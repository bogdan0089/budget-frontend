import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppSelect from '@/components/AppSelect.vue'

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
]

describe('AppSelect', () => {
  it('shows the label of the selected value', () => {
    const wrapper = mount(AppSelect, { props: { modelValue: 'b', options } })
    expect(wrapper.find('.app-select__trigger').text()).toContain('Beta')
  })

  it('falls back to the first option label for an unknown value', () => {
    const wrapper = mount(AppSelect, { props: { modelValue: 'zzz', options } })
    expect(wrapper.find('.app-select__trigger').text()).toContain('Alpha')
  })

  it('opens the dropdown on trigger click', async () => {
    const wrapper = mount(AppSelect, { props: { modelValue: 'a', options } })
    expect(wrapper.find('.app-select__dropdown').exists()).toBe(false)

    await wrapper.find('.app-select__trigger').trigger('click')

    expect(wrapper.find('.app-select__dropdown').exists()).toBe(true)
    expect(wrapper.findAll('.app-select__option')).toHaveLength(2)
  })

  it('emits update:modelValue when an option is chosen', async () => {
    const wrapper = mount(AppSelect, { props: { modelValue: 'a', options } })
    await wrapper.find('.app-select__trigger').trigger('click')

    await wrapper.findAll('.app-select__option')[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['b'])
  })
})
