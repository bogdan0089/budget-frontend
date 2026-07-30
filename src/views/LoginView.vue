<template>
  <AuthCard>
    <h3 class="fw-bold mb-1">Welcome back</h3>
    <p class="text-muted mb-4 small">Sign in to your Smart Budget account</p>

    <div v-if="error" class="alert alert-danger py-2 small">{{ error }}</div>

    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label class="form-label small fw-semibold">Email</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-envelope"></i></span>
          <input v-model="form.email" type="email" class="form-control" placeholder="you@example.com" required />
        </div>
      </div>
      <div class="mb-2">
        <label class="form-label small fw-semibold">Password</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-lock"></i></span>
          <input v-model="form.password" type="password" class="form-control" placeholder="••••••••" required />
        </div>
      </div>
      <div class="text-end mb-4">
        <RouterLink to="/forgot-password" class="small text-primary">Forgot password?</RouterLink>
      </div>
      <button type="submit" class="btn btn-primary w-100" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
        Sign in
      </button>
    </form>

    <p class="text-center mt-3 mb-0 small text-muted">
      Don't have an account?
      <RouterLink to="/register" class="text-primary fw-semibold">Register</RouterLink>
    </p>
  </AuthCard>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AuthCard from '../components/AuthCard.vue'

const auth = useAuthStore()
const router = useRouter()

const form = ref({ email: '', password: '' })
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''
  try {
    await auth.login(form.value.email, form.value.password)
    router.push('/')
  } catch (e) {
    error.value = e.response?.data?.detail || 'Invalid credentials'
  } finally {
    loading.value = false
  }
}
</script>
