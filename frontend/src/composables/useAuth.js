// src/composables/useAuth.js
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isLoggedIn = ref(!!localStorage.getItem('token'))
const token = ref(localStorage.getItem('token') || null)
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))

export function useAuth() {
  const router = useRouter()

  const login = (newToken, userData) => {
    token.value = newToken
    isLoggedIn.value = true
    user.value = userData
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    token.value = null
    isLoggedIn.value = false
    user.value = {}
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  return {
    isLoggedIn,
    token,
    user,
    login,
    logout,
  }
}
