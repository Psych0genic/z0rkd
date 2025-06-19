<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import PersonaForm from '../components/PersonaForm.vue'

const personas = ref([])
const editing = ref(null)

const fetchPersonas = async () => {
  try {
    const res = await axios.get('/api/persona', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    personas.value = res.data
    editing.value = null
  } catch (err) {
    console.error('Failed to fetch personas:', err)
  }
}

const editPersona = (p) => {
  editing.value = { ...p }
}

const deletePersona = async (id) => {
  if (!confirm('Delete this persona?')) return
  try {
    await axios.delete(`/api/persona/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    fetchPersonas()
  } catch (err) {
    console.error('Failed to delete persona:', err)
  }
}

onMounted(fetchPersonas)
</script>

<template>
  <div class="manage-personas">
    <h2>Manage Personas</h2>

    <PersonaForm :persona="editing" @saved="fetchPersonas" />

    <div v-if="personas.length === 0">No personas yet. Create one!</div>

    <div v-for="p in personas" :key="p._id" class="persona-card">
      <div class="left">
        <div class="avatar">{{ p.avatar }}</div>
        <div>
          <strong>{{ p.name }}</strong>
          <p>{{ p.description }}</p>
        </div>
      </div>
      <div class="actions">
        <button @click="editPersona(p)">Edit</button>
        <button @click="deletePersona(p._id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.manage-personas {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
  color: #0ff;
  font-family: 'Courier New', monospace;
}

.persona-card {
  display: flex;
  justify-content: space-between;
  background: #111;
  border: 1px solid #0ff;
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  align-items: center;
}

.persona-card .left {
  display: flex;
  gap: 1rem;
}

.avatar {
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 50%;
  background: #0ff;
  color: black;
  box-shadow: 0 0 6px #0ff;
}

.actions button {
  margin-left: 0.5rem;
  padding: 0.3rem 0.6rem;
  border: none;
  background: #0ff;
  color: black;
  border-radius: 6px;
  cursor: pointer;
}

.actions button:hover {
  background: #0cc;
}
</style>
