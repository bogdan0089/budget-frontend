<template>
  <div>
    <h4 class="fw-bold mb-4">Settings</h4>

    <div class="card p-4" style="max-width: 480px">
      <h6 class="fw-bold mb-3">Change password</h6>

      <div v-if="error" class="alert alert-danger py-2 small">{{ error }}</div>
      <div v-if="success" class="alert alert-success py-2 small">Password changed successfully.</div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="form-label small fw-semibold">Current password</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-lock"></i></span>
            <input v-model="oldPassword" type="password" class="form-control" required />
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label small fw-semibold">New password</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
            <input v-model="newPassword" type="password" class="form-control" placeholder="Min 8 characters" required minlength="8" />
          </div>
        </div>
        <div class="mb-4">
          <label class="form-label small fw-semibold">Confirm new password</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
            <input v-model="confirm" type="password" class="form-control" required />
          </div>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
          Update password
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()

const oldPassword = ref('')
const newPassword = ref('')
const confirm = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

async function handleSubmit() {
  error.value = ''
  success.value = false
  if (newPassword.value !== confirm.value) {
    error.value = 'New passwords do not match'
    return
  }
  loading.value = true
  try {
    await auth.changePassword(oldPassword.value, newPassword.value)
    success.value = true
    oldPassword.value = ''
    newPassword.value = ''
    confirm.value = ''
  } catch (e) {
    error.value = e.response?.data?.detail || 'Could not change password'
  } finally {
    loading.value = false
  }
}
</script>
