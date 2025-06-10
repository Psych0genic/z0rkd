<script setup>
import { ref, nextTick } from 'vue'
import axios from 'axios'

const messages = ref([])
const input = ref('')
const token = localStorage.getItem('token')
const messagesEnd = ref(null)

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
  scrollToBottom()

  try {
    const res = await axios.post('/api/chat/send', {
      message: input.value
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    console.log('[AI Response]', res.data.response)
    messages.value.push({ text: res.data.response, sender: 'ai' })
    input.value = ''
    scrollToBottom()
  } catch (err) {
    console.error('[Send Error]', err.response?.data || err.message)
    messages.value.push({ text: 'Error sending message.', sender: 'system' })
    scrollToBottom()
  }
}
</script>

<template>
  <div class="terminal">
    <div class="header">Z0RKD v0.9 — AI Terminal</div>
    <div class="auth-links">
      <button @click="$router.push('/login')">Login</button>
      <button @click="$router.push('/register')">Register</button>
    </div>
    <div class="messages">
      <div
        v-for="(msg, i) in messages"
        :key="i"
        :class="['message', msg.sender]"
      >
        <span>{{ msg.sender === 'user' ? '> ' : '' }}{{ msg.text }}</span>
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
  box-shadow: 0 0 20px #0ff5;
}
.header {
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 0 0 5px #0ff;
}
.auth-links {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-bottom: 1rem;
}
.auth-links button {
  background: black;
  color: #0ff;
  border: 1px solid #0ff;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  text-shadow: 0 0 5px #0ff;
}
.auth-links button:hover {
  background: #0ff;
  color: black;
}
.messages {
  min-height: 200px;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
}
.message.user {
  color: #0ff;
}
.message.ai {
  color: #f0f;
  text-shadow: 0 0 4px #f0f5;
}
.message.system {
  color: red;
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
}
button {
  background: #0ff;
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
}
button:hover {
  background: #0cf;
}
</style>
