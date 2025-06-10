<script setup>
import UserMenu from './components/UserMenu.vue'
import { ref, onMounted } from 'vue'

const isLoggedIn = ref(false)

onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('token')
})
</script>

<template>
  <div id="app">
    <Sidebar />
    <div class="main-content">
      <header class="header">
        <div class="title">Z0RKD</div>
        <UserMenu v-if="isLoggedIn" />
      </header>
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: black;
  color: #0ff;
  padding: 1rem;
  border-bottom: 2px solid #0ff;
}
</style>
