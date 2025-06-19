<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  persona: Object, // optional, for editing
})

const emit = defineEmits(['saved'])

const name = ref(props.persona?.name || '')
const avatar = ref(props.persona?.avatar || '🧠')
const description = ref(props.persona?.description || '')
const prompt = ref(props.persona?.prompt || '')

watch(() => props.persona, (p) => {
  name.value = p?.name || ''
  avatar.value = p?.avatar || '🧠'
  description.value = p?.description || ''
  prompt.value = p?.prompt || ''
})

const savePersona = async () => {
  try {
    const data = {
      name: name.value,
      avatar: avatar.value,
      description: description.value,
      prompt: prompt.value
    }

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }

    if (props.persona?._id) {
      await axios.put(`/api/persona/${props.persona._id}`, data, { headers })
    } else {
      await axios.post('/api/persona', data, { headers })
    }

    emit('saved')
  } catch (err) {
    alert('Failed to save persona: ' + (err.response?.data.message || err.message))
  }
}
</script>

<template>
  <div class="persona-form">
    <h3>{{ props.persona ? 'Edit Persona' : 'New Persona' }}</h3>
    <label>Name</label>
    <input v-model="name" placeholder="e.g. Neo, Glitch, Oracle" />

    <label>Avatar</label>
    <input v-model="avatar" placeholder="🧠, 🤖, 🕶" />

    <label>Description</label>
    <textarea v-model="description" rows="2" placeholder="Short personality summary" />

    <label>System Prompt</label>
    <textarea v-model="prompt" rows="4" placeholder="How the AI should behave" />

    <button @click="savePersona">Save Persona</button>
  </div>
</template>

<style scoped>
.persona-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #0ff;
  border-radius: 8px;
  background: #111;
  color: #0ff;
  font-family: 'Courier New', monospace;
  margin-bottom: 1rem;
}

input, textarea {
  background: black;
  color: #0ff;
  border: 1px solid #0ff;
  padding: 0.4rem;
  border-radius: 6px;
  font-family: inherit;
}

button {
  background: #0ff;
  color: black;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #0cc;
}
</style>
