import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import ChatTerminal from './views/ChatTerminal.vue'
import MemoryMap from './views/MemoryMap.vue'

const routes = [
  { path: '/', component: ChatTerminal },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/terminal', component: ChatTerminal },
  { path: '/memory-map', component: MemoryMap }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
