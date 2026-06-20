<template>
  <AuthCard>
    <h3 class="fw-bold mb-1">Forgot password?</h3>
    <p class="text-muted mb-4 small">Enter your email and we'll send you a reset link</p>

    <div v-if="sent" class="alert alert-success py-2 small">
      If an account exists for that email, a reset link is on its way. Check your inbox.
    </div>

    <form v-else @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="form-label small fw-semibold">Email</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-envelope"></i></span>
          <input v-model="email" type="email" class="form-control" placeholder="you@example.com" required />
        </div>
      </div>
      <button type="submit" class="btn btn-primary w-100" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
        Send reset link
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
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AuthCard from '../components/AuthCard.vue'

const auth = useAuthStore()

const email = ref('')
const loading = ref(false)
const sent = ref(false)

async function handleSubmit() {
  loading.value = true
  try {
    await auth.forgotPassword(email.value)
    sent.value = true
  } finally {
    loading.value = false
  }
}
</script>
