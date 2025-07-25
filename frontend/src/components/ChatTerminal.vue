<script setup>
import { ref, nextTick } from 'vue'
import axios from 'axios'
import { useAuth } from '../composables/useAuth'
import PersonaSelector from './PersonaSelector.vue'

const { isLoggedIn } = useAuth()
const messages = ref([])
const input = ref('')
const loading = ref(false)
const token = localStorage.getItem('token')
const messagesEnd = ref(null)
const activePersona = ref(JSON.parse(localStorage.getItem('persona') || 'null'))

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesEnd.value) {
      messagesEnd.value.scrollIntoView({ behavior: 'smooth' })
    }
  })
}

const sendMessage = async () => {
  if (!input.value.trim()) return

  messages.value.push({ text: input.value, sender: 'user' })
  const userInput = input.value
  input.value = ''
  scrollToBottom()
  loading.value = true

  try {
    const resHistory = await axios.get('/api/chat/history', {
      headers: { Authorization: `Bearer ${token}` }
    })

    const formattedHistory = resHistory.data.history
      .map(m => `${m.sender === 'user' ? 'User' : 'AI'}: ${m.content}`)
      .join('\n')

    const prompt =
      (activePersona.value?.prompt || 'You are a helpful AI in a neon-drenched cyberpunk world.') +
      '\n\n' +
      formattedHistory +
      `\nUser: ${userInput}\nAI:`

    const res = await axios.post(
      '/api/chat/send',
      { message: prompt },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    messages.value.push({ text: res.data.response, sender: 'ai' })
  } catch (err) {
    messages.value.push({
      text: '⚠ Error sending message.',
      sender: 'system'
    })
    console.error('[Send Error]', err.response?.data || err.message)
  } finally {
    loading.value = false
    scrollToBottom()
  }
}
</script>

<template>
  <div class="terminal">
    <div class="header">
      <span>Z0RKD v0.9 — AI Terminal</span>
      <span v-if="activePersona" class="persona-chip">
        {{ activePersona.avatar }} {{ activePersona.name }}
        <button @click="activePersona = null">✖</button>
      </span>
    </div>


    <PersonaSelector @select="p => (activePersona = p)" />

    <div v-if="!isLoggedIn" class="auth-links">
      <button @click="$router.push('/login')">Login</button>
      <button @click="$router.push('/register')">Register</button>
    </div>

    <div class="messages">
      <div
        v-for="(msg, i) in messages"
        :key="i"
        :class="['message', msg.sender]"
      >
        <span v-if="msg.personaName" class="persona-tag">{{ msg.personaName }}</span>
        <span>{{ msg.sender === 'user' ? '> ' : '' }}{{ msg.text }}</span>
      </div>



      <div v-if="loading" class="message loading">
        <span>AI is typing<span class="dots">...</span></span>
      </div>

      <div ref="messagesEnd" />
    </div>

    <div class="input-row">
      <input
        v-model="input"
        @keyup.enter="sendMessage"
        placeholder="Type a message..."
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<style scoped>
.terminal {
  font-family: 'Courier New', monospace;
  background: black;
  color: #0ff;
  padding: 1rem;
  max-width: 700px;
  margin: 2rem auto;
  border: 2px solid #0ff;
  border-radius: 12px;
}

.header {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 4px #0ff;
}

.auth-links {
  margin-bottom: 1rem;
}

.auth-links button {
  margin-right: 0.5rem;
  background: transparent;
  border: 1px solid #0ff;
  color: #0ff;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
}

.auth-links button:hover {
  background: #0ff;
  color: black;
}

.messages {
  background: #111;
  padding: 1rem;
  border-radius: 8px;
  min-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.message {
  margin-bottom: 0.5rem;
}

.message.user {
  color: #0ff;
}

.message.ai {
  color: #f0f;
}

.message.system {
  color: #888;
  font-style: italic;
}

.message.loading {
  font-style: italic;
  color: #999;
}

.dots::after {
  content: '...';
  animation: blink 1s infinite steps(1, start);
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.input-row {
  display: flex;
  gap: 0.5rem;
}

input {
  flex: 1;
  background: black;
  border: 1px solid #0ff;
  color: #0ff;
  padding: 0.5rem;
  border-radius: 6px;
  font-family: inherit;
}

button {
  background: #0ff;
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #0cc;
}

.persona-chip {
  margin-left: auto;
  background: #0ff3;
  color: black;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 0 5px #0ff;
}
.persona-chip button {
  background: transparent;
  color: black;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.persona-tag {
  font-size: 0.75rem;
  background: #0ff2;
  color: #0ff;
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.25rem;
  display: inline-block;
}

.persona-tag {
  font-size: 0.75rem;
  background: #0ff2;
  color: #0ff;
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.25rem;
  display: inline-block;
}


</style>
