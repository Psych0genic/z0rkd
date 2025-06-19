<script setup>
import UserMenu from './components/UserMenu.vue'
import Sidebar from './components/Sidebar.vue'
import { ref, onMounted } from 'vue'

const isLoggedIn = ref(false)

onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('token')
})
</script>

<template>
  <div id="app">
    <header class="header">
      <div class="title">Z0RKD</div>
      <UserMenu v-if="isLoggedIn" />
    </header>

    <div class="layout">
      <Sidebar />
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: black;
  color: #0ff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: black;
  color: #0ff;
  padding: 1rem;
  border-bottom: 2px solid #0ff;
  box-shadow: 0 0 10px #0ff5;
  z-index: 10;
}

.layout {
  display: flex;
  flex: 1;
  min-height: 0; /* Allows content to scroll properly */
}

.main-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}
</style>
