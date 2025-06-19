<template>
  <div class="user-menu" @click.stop="toggleDropdown">
    <div class="avatar">{{ initials }}</div>
    <div v-if="dropdownOpen" class="dropdown" ref="dropdown">
      <router-link to="/profile">👤 Profile</router-link>
      <a href="#" @click.prevent="logout">🚪 Logout</a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const dropdownOpen = ref(false)
const initials = ref('U')

const toggleDropdown = () => (dropdownOpen.value = !dropdownOpen.value)

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user') // optional, if you store it
  router.push('/login')
}


const clickOutside = (e) => {
  if (!e.target.closest('.user-menu')) dropdownOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', clickOutside)
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  initials.value = user.name?.slice(0, 2).toUpperCase() || 'U'
})

onBeforeUnmount(() => {
  document.removeEventListener('click', clickOutside)
})
</script>

<style scoped>
.user-menu {
  position: relative;
  cursor: pointer;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #0ff;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0 0 6px #0ff;
}
.dropdown {
  position: absolute;
  top: 40px;
  right: 0;
  background: black;
  border: 1px solid #0ff;
  padding: 0.5rem;
  box-shadow: 0 0 10px #0ff;
  z-index: 999;
  display: flex;
  flex-direction: column;
}
.dropdown a {
  color: #0ff;
  padding: 0.25rem 0;
  text-decoration: none;
}
.dropdown a:hover {
  background: #0ff;
  color: black;
}
</style>
