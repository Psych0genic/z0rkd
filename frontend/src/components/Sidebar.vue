<script setup>
import { useAuth } from '../composables/useAuth'
const { isLoggedIn } = useAuth()
</script>

<template>
  <div class="sidebar">
    <div class="logo">Z0RKD</div>
    <nav>
      <router-link to="/">🖥 Terminal</router-link>
      <router-link to="/memory">🧠 Memory Map</router-link>
      <router-link to="/profile">👤 Profile</router-link>
      <router-link to="/personas">🎭 Personas</router-link>
      <router-link to="/memory">🧠 Memory Map</router-link>
      <router-link v-if="!isLoggedIn" to="/login">🔐 Login</router-link>
      <router-link v-if="!isLoggedIn" to="/register">🆕 Register</router-link>
    </nav>
  </div>
</template>

  
  <style scoped>
  .sidebar {
    display: flex;
    flex-direction: column;
    background: black;
    border-right: 2px solid #0ff;
    padding: 1rem;
    min-height: 100vh;
    width: 180px;
    box-shadow: 0 0 20px #0ff5;
  }
  .logo {
    font-family: 'Courier New', monospace;
    font-size: 1.5rem;
    color: #0ff;
    margin-bottom: 2rem;
    text-shadow: 0 0 6px #0ff;
  }
  nav {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  router-link {
    color: #0ff;
    text-decoration: none;
    font-family: 'Courier New', monospace;
    text-shadow: 0 0 5px #0ff;
  }
  router-link:hover {
    color: black;
    background: #0ff;
    padding: 0.25rem;
    border-radius: 6px;
  }
  </style>
  