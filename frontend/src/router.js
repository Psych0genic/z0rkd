import { createRouter, createWebHistory } from 'vue-router'

import ChatTerminal from './components/ChatTerminal.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import MemoryMap from './components/MemoryMap.vue'
import Profile from './components/Profile.vue'

const routes = [
  { path: '/', component: ChatTerminal },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/memory', component: MemoryMap },
  { path: '/profile', component: Profile },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
