import { describe, it, expect, beforeEach } from 'vitest'
import api from '@/services/api'

describe('api service', () => {
  beforeEach(() => localStorage.clear())

  it('is configured with an http base URL', () => {
    expect(api.defaults.baseURL).toMatch(/^https?:\/\//)
  })

  it('attaches a Bearer token when one is stored', () => {
    localStorage.setItem('access_token', 'tok')
    const requestInterceptor = api.interceptors.request.handlers[0].fulfilled

    const config = requestInterceptor({ headers: {} })

    expect(config.headers.Authorization).toBe('Bearer tok')
  })

  it('does not attach Authorization without a token', () => {
    const requestInterceptor = api.interceptors.request.handlers[0].fulfilled

    const config = requestInterceptor({ headers: {} })

    expect(config.headers.Authorization).toBeUndefined()
  })
})
