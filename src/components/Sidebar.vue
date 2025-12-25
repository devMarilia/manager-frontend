<template>
  <aside class="w-64 bg-gray-900 text-white flex flex-col h-screen shadow-lg hidden md:flex">
    <!-- Logo -->
    <div class="px-6 py-8 border-b border-gray-800">
      <h1 class="text-2xl font-bold text-primary">Tarefas+</h1>
    </div>

    <!-- Menu -->
    <nav class="flex-1 px-4 py-6 space-y-2">
      <router-link
        to="/tasks"
        class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-100 hover:text-primary"
      >
        <span class="text-xl">📋</span>
        <span>Minhas Tarefas</span>
      </router-link>

      <router-link
        to="/tasks/categorias"
        class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-100 hover:text-primary"
      >
        <span class="text-xl">📂</span>
        <span>Por Categoria</span>
      </router-link>

      <router-link
        to="/tasks/estatisticas"
        class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-100 hover:text-primary"
      >
        <span class="text-xl">📊</span>
        <span>Estatísticas</span>
      </router-link>

      <router-link
        to="/tasks/progresso"
        class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-100 hover:text-primary"
      >
        <span class="text-xl">📈</span>
        <span>Progresso</span>
      </router-link>

      <router-link
        to="/tasks/relatorio"
        class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-100 hover:text-primary"
      >
        <span class="text-xl">📄</span>
        <span>Relatório</span>
      </router-link>
    </nav>

    <!-- Footer -->
    <div class="px-4 py-6 border-t border-gray-800">
      <p class="text-xs text-gray-400 text-center">© 2025 Gerenciador de Tarefas</p>
    </div>
  </aside>
</template>

<script setup>
</script>

<style scoped>
</style>
