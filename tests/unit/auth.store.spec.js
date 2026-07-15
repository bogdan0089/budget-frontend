import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

vi.mock('@/services/api', () => ({
  default: { post: vi.fn() },
}))

import api from '@/services/api'
import { useAuthStore } from '@/stores/auth'

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('is logged out by default', () => {
    const store = useAuthStore()
    expect(store.token).toBe(null)
    expect(store.isLoggedIn).toBe(false)
  })

  it('login stores the token and persists it', async () => {
    api.post.mockResolvedValue({ data: { access_token: 'abc123' } })
    const store = useAuthStore()

    await store.login('user@test.com', 'pw')

    expect(api.post).toHaveBeenCalledWith('/auth/login', {
      email: 'user@test.com',
      password: 'pw',
    })
    expect(store.token).toBe('abc123')
    expect(store.isLoggedIn).toBe(true)
    expect(localStorage.getItem('access_token')).toBe('abc123')
  })

  it('reads an existing token from localStorage on init', () => {
    localStorage.setItem('access_token', 'stored-tok')
    setActivePinia(createPinia())

    const store = useAuthStore()

    expect(store.token).toBe('stored-tok')
    expect(store.isLoggedIn).toBe(true)
  })

  it('logout clears token, user and storage', () => {
    localStorage.setItem('access_token', 'abc123')
    setActivePinia(createPinia())
    const store = useAuthStore()

    store.logout()

    expect(store.token).toBe(null)
    expect(store.user).toBe(null)
    expect(store.isLoggedIn).toBe(false)
    expect(localStorage.getItem('access_token')).toBe(null)
  })
})
