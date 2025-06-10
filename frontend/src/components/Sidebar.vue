<template>
    <nav class="sidebar">
      <div class="glitch-icon" @click="$router.push('/')">🏠</div>
      <div class="glitch-icon" @click="$router.push('/terminal')">🧠</div>
      <div class="glitch-icon" @click="$router.push('/memory-map')">📁</div>
    </nav>
  </template>
  
  <script setup>
  // No JS needed yet, but you can add interactivity here later
  </script>
  
  <style scoped>
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 60px;
    height: 100vh;
    background: #000;
    border-right: 2px solid #0ff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1rem;
    box-shadow: 0 0 12px #0ff5;
    z-index: 1000;
  }
  
  .glitch-icon {
    font-size: 1.8rem;
    margin: 1rem 0;
    color: #0ff;
    text-shadow: 0 0 4px #0ff, 0 0 6px #f0f, 0 0 8px #0ff;
    animation: glitch 1.5s infinite;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .glitch-icon:hover {
    transform: scale(1.2);
  }
  
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-1px, 1px); }
    40% { transform: translate(1px, -1px); }
    60% { transform: translate(-2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }
  </style>
  