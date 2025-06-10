<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const memory = ref([])
const loading = ref(true)
const token = localStorage.getItem('token')

onMounted(async () => {
  try {
    const res = await axios.get('/api/chat/memory', {
      headers: { Authorization: `Bearer ${token}` }
    })
    memory.value = res.data.memory
  } catch (err) {
    console.error('[Memory Fetch Error]', err.response?.data || err.message)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="memory-map">
    <div class="header">🧠 Memory Map — Z0RKD v0.9</div>
    <div v-if="loading" class="loading">Loading memory...</div>
    <div v-else-if="memory.length === 0" class="empty">No memory found.</div>
    <div v-else class="entries">
      <div v-for="(msg, i) in memory" :key="i" class="entry">
        <strong>{{ msg.sender || 'user' }}:</strong> {{ msg.content }}
        <div class="timestamp">{{ new Date(msg.timestamp).toLocaleString() }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.memory-map {
  font-family: 'Courier New', monospace;
  background: black;
  color: #0ff;
  padding: 1rem;
  max-width: 800px;
  margin: 2rem auto;
  border: 2px solid #0ff;
  border-radius: 12px;
  box-shadow: 0 0 20px #0ff5;
}
.header {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 6px #0ff;
}
.loading,
.empty {
  text-align: center;
  color: #0cf;
}
.entries {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 500px;
  overflow-y: auto;
}
.entry {
  background: #000;
  border: 1px dashed #0ff6;
  padding: 0.5rem;
  border-radius: 6px;
}
.timestamp {
  font-size: 0.8rem;
  color: #0ff9;
  margin-top: 0.25rem;
}
</style>
