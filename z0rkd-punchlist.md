
# 🧠 Z0RKD AI Chatroom – Project Roadmap & Punchlist

This document outlines the next steps to polish and enhance the Z0RKD AI Chatroom for portfolio and job-seeking purposes.

---

## ✅ Core Features Already Working

- Cyberpunk terminal-style chat UI
- JWT-based login and register (frontend + backend)
- AI chat integration using Ollama (via node-fetch)
- MongoDB for message history persistence
- Functional routing and component structure with Vue 3 + Vite

---

## 🛠 Recommended Next Steps

### 1. 🧹 Polish Existing Features

- [ ] Add logout button to `UserMenu.vue`
- [ ] Hide login/register links when already authenticated
- [ ] Add loading/typing indicator while waiting for AI response
- [ ] Convert Sidebar to dynamic thread list (optional)
- [ ] Use global `auth` composable instead of raw `localStorage` access

---

### 2. 🧠 Add Memory + Persona System

- [ ] Create a `Persona` model (with tone, avatar, voice, etc.)
- [ ] Link personas to chat threads or sessions
- [ ] Expand `MemoryMap.vue` to visualize what the AI remembers per user/persona

---

### 3. ⚡ Improve Real-Time Experience

- [ ] Implement streaming AI response (if supported by backend/ollama)
- [ ] Add typing animation while AI is "thinking"
- [ ] Add sound effects or Web Speech API voices for personas (optional)

---

### 4. 📁 Folder Structure Additions

```bash
/backend/
  models/Persona.js
  routes/personaRoutes.js

/frontend/src/
  composables/useAuth.js
  components/PersonaSelector.vue
  views/MemoryMap.vue
```

---

### 5. 🧪 Final Portfolio Polish

- [ ] Write a detailed `README.md` (tech stack, setup, screenshots)
- [ ] Add `.env.example` and clean up `.gitignore`
- [ ] Create animated GIFs of chat and memory map
- [ ] Record a 2-minute walkthrough video
- [ ] Optional: Deploy backend or share via GitHub Pages frontend + local API

---

## 🚀 Milestone Phases

- **Phase 1**: UI/UX Cleanup & Auth Polishing
- **Phase 2**: Persona + Memory System
- **Phase 3**: Real-time UX upgrades
- **Phase 4**: Documentation & Portfolio Media

---

Inspired by neon-drenched terminals and glitchy consciousness.
