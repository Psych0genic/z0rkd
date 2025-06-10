import { createRouter, createWebHistory } from 'vue-router'

import ChatTerminal from './views/ChatTerminal.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import MemoryMap from './views/MemoryMap.vue'
import Profile from './views/Profile.vue'

const routes = [
  { path: '/', component: ChatTerminal },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/memory', component: MemoryMap },
  { path: '/profile', component: Profile },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
