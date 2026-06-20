import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('access_token') || null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    async login(email, password) {
      const { data } = await api.post('/auth/login', { email, password })
      this.token = data.access_token
      localStorage.setItem('access_token', data.access_token)
    },

    async register(email, password, full_name) {
      await api.post('/auth/register', { email, password, full_name })
    },

    async forgotPassword(email) {
      await api.post('/auth/forgot-password', { email })
    },

    async resetPassword(token, new_password) {
      await api.post('/auth/reset-password', { token, new_password })
    },

    async changePassword(old_password, new_password) {
      await api.post('/auth/change-password', { old_password, new_password })
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('access_token')
    },
  },
})
