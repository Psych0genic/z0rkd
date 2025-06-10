<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const errorMsg = ref('')
const router = useRouter()

const handleLogin = async () => {
  errorMsg.value = ''

  if (!username.value || !password.value) {
    errorMsg.value = 'Username and password are required.'
    return
  }

  try {
    const res = await axios.post('/api/auth/login', {
      username: username.value,
      password: password.value
    })
    console.log('✅ Login response:', res)
    localStorage.setItem('token', res.data.token)
    router.push('/')
  } catch (error) {
    errorMsg.value = error.response?.data?.message || 'Login failed. Please try again.'
    console.error('❌ Login error:', errorMsg.value)
  }
}
</script>

<template>
  <div class="login-container">
    <h2 class="cy-title">Z0RKD // Login</h2>
    <form class="cy-box" @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Username" required class="cy-input" />
      <input v-model="password" placeholder="Password" type="password" required class="cy-input" />
      <button type="submit" class="cy-button">Login</button>
      <p v-if="errorMsg" class="cy-error">{{ errorMsg }}</p>
    </form>
  </div>
</template>

<style>
.cy-error {
  color: #f0f;
  margin-top: 1rem;
  font-family: monospace;
  text-shadow: 0 0 5px #f0f, 0 0 10px #f0f;
}
</style>
