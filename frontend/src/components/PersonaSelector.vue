<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const personas = ref([])
const selectedId = ref(null)

const emit = defineEmits(['select'])

const fetchPersonas = async () => {
  try {
    const res = await axios.get('/api/persona', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    personas.value = res.data
  } catch (err) {
    console.error('Failed to load personas:', err)
  }
}

const selectPersona = (persona) => {
  selectedId.value = persona._id
  localStorage.setItem('persona', JSON.stringify(persona))
  emit('select', persona)
}

onMounted(fetchPersonas)
</script>

<template>
  <div class="persona-selector">
    <h2>Select Your Persona</h2>
    <div class="persona-list">
      <div
        v-for="p in personas"
        :key="p._id"
        :class="['persona-card', { selected: p._id === selectedId }]"
        @click="selectPersona(p)"
      >
        <div class="avatar">{{ p.avatar }}</div>
        <div class="info">
          <strong>{{ p.name }}</strong>
          <p>{{ p.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.persona-selector {
  padding: 1rem;
  color: #0ff;
  font-family: 'Courier New', monospace;
}
h2 {
  margin-bottom: 1rem;
}
.persona-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.persona-card {
  display: flex;
  background: #111;
  border: 1px solid #0ff;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 0 4px #0ff5;
}
.persona-card.selected {
  background: #0ff;
  color: black;
}
.avatar {
  font-size: 1.5rem;
  margin-right: 0.75rem;
}
.info p {
  font-size: 0.85rem;
  color: #ccc;
}
</style>
