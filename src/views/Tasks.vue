<template>
  <DefaultLayout>
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Minhas Tarefas</h1>
        <router-link to="/create-task">
          <Button
            label="+ Nova Tarefa"
            backgroundColor="bg-primary"
            textColor="text-white"
            hoverColor="hover:bg-blue-700"
          />
        </router-link>
      </div>

      <!-- Lista de Tarefas -->
      <div class="grid gap-4">
        <TaskCard
          v-for="task in tasks"
          :key="task.id"
          :id="task.id"
          :title="task.title"
          :description="task.description"
          :dueDate="task.dueDate"
          :completed="task.completed"
          @toggle="handleToggleTask"
          @delete="handleDeleteTask"
        />
      </div>

      <!-- Mensagem Vazia -->
      <div v-if="tasks.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">Nenhuma tarefa criada ainda</p>
        <router-link to="/create-task" class="text-primary hover:text-blue-700 font-semibold">
          Criar primeira tarefa
        </router-link>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TaskCard from '@/components/TaskCard.vue'
import Button from '@/components/Button.vue'

const tasks = ref([])

onMounted(() => {
  // TODO: Buscar tarefas da API
  console.log('Carregando tarefas...')
})

const handleToggleTask = (id) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    task.completed = !task.completed
    // TODO: Atualizar tarefa na API
  }
}

const handleDeleteTask = (id) => {
  tasks.value = tasks.value.filter(t => t.id !== id)
  // TODO: Deletar tarefa na API
}
</script>

<style scoped>
</style>
