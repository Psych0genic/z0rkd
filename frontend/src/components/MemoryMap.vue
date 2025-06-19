<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const memories = ref([])

const fetchMemory = async () => {
  try {
    const res = await axios.get('/api/chat/history', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    memories.value = res.data.history
  } catch (err) {
    console.error('Memory load failed:', err)
  }
}

onMounted(fetchMemory)
</script>

<template>
  <div class="memory-map">
    <h2>🧠 Memory Map</h2>
    <div v-if="memories.length === 0">No memories yet. Try chatting first.</div>
    <div v-for="(msg, i) in memories" :key="i" class="memory-line">
      <span class="timestamp">{{ new Date(msg.timestamp).toLocaleString() }}</span>
      <span :class="['sender', msg.sender]">{{ msg.sender.toUpperCase() }}</span>
      <span v-if="msg.personaName" class="persona-tag">{{ msg.personaName }}</span>
      <span class="content">{{ msg.content }}</span>
    </div>

  </div>
</template>

<style scoped>
.memory-map {
  max-width: 800px;
  margin: 2rem auto;
  color: #0ff;
  font-family: 'Courier New', monospace;
}

.memory-line {
  padding: 0.5rem;
  border-bottom: 1px solid #0ff3;
  display: flex;
  flex-direction: column;
}

.timestamp {
  font-size: 0.75rem;
  color: #777;
}

.sender {
  font-weight: bold;
  font-size: 0.9rem;
}

.sender.user {
  color: #0ff;
}
.sender.ai {
  color: #f0f;
}

.content {
  margin-top: 0.25rem;
  color: #ccc;
}

.persona-tag {
  font-size: 0.75rem;
  background: #0ff2;
  color: #0ff;
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
  margin: 0.2rem 0;
}

</style>
