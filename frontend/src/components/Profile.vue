<template>
    <div class="profile">
      <h2>👤 Profile</h2>
  
      <div class="avatar-container">
        <div class="avatar-preview">
          <img v-if="avatar" :src="avatar" alt="Avatar" />
          <div v-else class="initials">{{ initials }}</div>
        </div>
  
        <input type="file" accept="image/*" @change="handleFileUpload" />
        <button @click="uploadAvatar" :disabled="!selectedFile">Upload Avatar</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const avatar = ref('')
  const initials = ref('')
  const selectedFile = ref(null)
  
  const token = localStorage.getItem('token')
  
  onMounted(async () => {
    try {
      const res = await axios.get('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      avatar.value = res.data.avatar
      initials.value = res.data.initials || generateInitials(res.data.username || res.data.email)
    } catch (err) {
      console.error('[Profile Load Error]', err)
    }
  })
  
  function generateInitials(name) {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  
  function handleFileUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      selectedFile.value = reader.result
    }
    reader.readAsDataURL(file)
  }
  
  async function uploadAvatar() {
    if (!selectedFile.value) return
    try {
      const res = await axios.post(
        '/api/user/profile/avatar',
        { avatar: selectedFile.value },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      avatar.value = res.data.avatar
      selectedFile.value = null
    } catch (err) {
      console.error('[Avatar Upload Error]', err)
    }
  }
  </script>
  
  <style scoped>
  .profile {
    font-family: 'Courier New', monospace;
    background: black;
    color: #0ff;
    padding: 2rem;
    max-width: 600px;
    margin: 2rem auto;
    border: 2px solid #0ff;
    border-radius: 12px;
    box-shadow: 0 0 20px #0ff5;
  }
  .avatar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .avatar-preview {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: #111;
    border: 2px solid #0ff;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .avatar-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .initials {
    font-size: 2rem;
    color: #0ff;
    text-shadow: 0 0 6px #0ff;
  }
  button {
    background: #0ff;
    color: black;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  button:hover {
    background: #0cf;
  }
  </style>
  