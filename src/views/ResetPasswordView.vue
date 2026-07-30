<template>
  <AuthCard>
    <h3 class="fw-bold mb-1">Set a new password</h3>
    <p class="text-muted mb-4 small">Choose a strong password for your account</p>

    <div v-if="error" class="alert alert-danger py-2 small">{{ error }}</div>
    <div v-if="success" class="alert alert-success py-2 small">Password updated! Redirecting to sign in...</div>

    <div v-if="!token" class="alert alert-warning py-2 small">
      This reset link is invalid or incomplete. Please request a new one.
    </div>

    <form v-else-if="!success" @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label class="form-label small fw-semibold">New password</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-lock"></i></span>
          <input v-model="password" type="password" class="form-control" placeholder="Min 8 characters" required minlength="8" />
        </div>
      </div>
      <div class="mb-4">
        <label class="form-label small fw-semibold">Confirm password</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
          <input v-model="confirm" type="password" class="form-control" placeholder="Repeat password" required />
        </div>
      </div>
      <button type="submit" class="btn btn-primary w-100" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
        Update password
      </button>
    </form>

    <p class="text-center mt-3 mb-0 small text-muted">
      <RouterLink to="/login" class="text-primary fw-semibold">
        <i class="bi bi-arrow-left me-1"></i>Back to sign in
      </RouterLink>
    </p>
  </AuthCard>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AuthCard from '../components/AuthCard.vue'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const token = route.query.token || ''
const password = ref('')
const confirm = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

async function handleSubmit() {
  error.value = ''
  if (password.value !== confirm.value) {
    error.value = 'Passwords do not match'
    return
  }
  loading.value = true
  try {
    await auth.resetPassword(token, password.value)
    success.value = true
    setTimeout(() => router.push('/login'), 1500)
  } catch (e) {
    error.value = e.response?.data?.detail || 'Reset link is invalid or expired'
  } finally {
    loading.value = false
  }
}
</script>
