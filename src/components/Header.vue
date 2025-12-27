<template>
  <div class="flex h-20 bg-white shadow-md items-center justify-between px-8">
    <h1 class="text-2xl font-bold text-primary">Tarefas</h1>
    <nav class="flex gap-6 items-center">
      <router-link to="/tasks" class="text-gray-700 hover:text-primary transition-colors">
        Minhas Tarefas
      </router-link>
      <Button
        label="Sair"
        backgroundColor="bg-red"
        textColor="text-white"
        hoverColor="hover:bg-red-600"
        @click="handleLogout"
      />
    </nav>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'

const router = useRouter()

const handleLogout = () => {
  // TODO: Chamar serviço de logout
  router.push('/login')
}
</script>

<style scoped>
</style>
