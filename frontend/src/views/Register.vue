<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const username = ref('')
const password = ref('')
const errorMsg = ref('')
const router = useRouter()

const handleRegister = async () => {
  errorMsg.value = ''

  if (!username.value || !email.value || !password.value) {
    errorMsg.value = 'All fields are required.'
    return
  }

  try {
    const res = await axios.post('/api/auth/register', {
      email: email.value,
      username: username.value,
      password: password.value
    })
    console.log('✅ Register response:', res)
    localStorage.setItem('token', res.data.token)
    router.push('/')
  } catch (error) {
    errorMsg.value = error.response?.data?.message || 'Registration failed. Please try again.'
    console.error('❌ Register error:', errorMsg.value)
  }
}
</script>

<template>
  <div class="register-container">
    <h2 class="cy-title">Z0RKD // Register</h2>
    <form class="cy-box" @submit.prevent="handleRegister">
      <input v-model="username" placeholder="Username" required class="cy-input" />
      <input v-model="email" placeholder="Email" required type="email" class="cy-input" />
      <input v-model="password" placeholder="Password" type="password" required class="cy-input" />
      <button type="submit" class="cy-button">Register</button>
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