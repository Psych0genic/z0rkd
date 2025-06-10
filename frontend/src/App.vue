<template>
  <div class="app-layout">
    <Sidebar />

    <div class="main-content">
      <header class="app-header">
        <div class="title">Z0RKD</div>

        <div class="right" v-if="isLoggedIn">
          <div class="user-menu" @click="toggleDropdown">
            <span class="user-icon">👤</span>
            <div class="dropdown" v-if="showDropdown">
              <router-link to="/memory">🧠 Memory</router-link>
              <router-link to="/profile">👤 Profile</router-link>
              <a @click.prevent="logout">🚪 Logout</a>
            </div>
          </div>
        </div>
      </header>

      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showDropdown = ref(false)
const toggleDropdown = () => (showDropdown.value = !showDropdown.value)

const isLoggedIn = computed(() => !!localStorage.getItem('token'))

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: black;
  padding: 1rem;
  color: #0ff;
  font-family: 'Courier New', monospace;
  border-bottom: 2px solid #0ff;
}
.user-menu {
  position: relative;
  cursor: pointer;
}
.user-icon {
  font-size: 1.2rem;
  text-shadow: 0 0 5px #0ff;
}
.dropdown {
  position: absolute;
  top: 2rem;
  right: 0;
  background: black;
  border: 1px solid #0ff;
  box-shadow: 0 0 10px #0ff5;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
}
.dropdown a,
.dropdown router-link {
  padding: 0.5rem 1rem;
  color: #0ff;
  text-decoration: none;
  white-space: nowrap;
}
.dropdown a:hover,
.dropdown router-link:hover {
  background: #0ff;
  color: black;
}
</style>
