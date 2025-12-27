<template>
  <div class="flex h-screen w-screen overflow-hidden bg-gray-100">
    <!-- Conteúdo Principal -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">Tarefas</h1>
        <div class="flex items-center gap-4">
          <span class="text-gray-700">{{ userName }}</span>
          <Button
            label="Sair"
            backgroundColor="bg-red"
            textColor="text-white"
            hoverColor="hover:bg-red-600"
            @click="handleLogout"
          />
        </div>
      </header>

      <!-- Conteúdo -->
      <main class="flex-1 overflow-auto p-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Formulário Adicionar Tarefa -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-6">Adicionar Nova Tarefa</h2>

              <form @submit.prevent="handleAddTask" class="space-y-4">
                <!-- Título -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Título <span class="text-red">*</span></label>
                  <Input
                    v-model="newTask.title"
                    type="text"
                    placeholder="Título da tarefa"
                    borderColor="border-gray-300"
                    textColor="text-gray-800"
                    focusColor="focus:border-primary"
                    backgroundColor="bg-white"
                    required
                  />
                </div>

                <!-- Descrição -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Descrição <span class="text-red">*</span></label>
                  <textarea
                    v-model="newTask.description"
                    placeholder="Descrição da tarefa"
                    class="w-full px-4 py-2 rounded border-2 border-gray-300 focus:border-primary focus:outline-none transition-colors resize-none"
                    rows="4"
                    required
                  ></textarea>
                </div>

                <!-- Categoria -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Categoria <span class="text-red">*</span></label>
                  <select
                    v-model="newTask.category"
                    class="w-full px-4 py-2 rounded border-2 border-gray-300 focus:border-primary focus:outline-none transition-colors bg-white text-gray-800"
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="trabalho">Trabalho</option>
                    <option value="pessoal">Pessoal</option>
                    <option value="saude">Saúde</option>
                    <option value="lazer">Lazer</option>
                    <option value="estudos">Estudos</option>
                  </select>
                </div>

                <!-- Botão Adicionar -->
                <Button
                  label="Adicionar Tarefa"
                  backgroundColor="bg-primary"
                  textColor="text-white"
                  hoverColor="hover:bg-blue-700"
                  type="submit"
                />
              </form>
            </div>

            <!-- Lista de Tarefas -->
            <div class="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-6">Minhas Tarefas</h2>

              <div v-if="tasks.length === 0" class="text-center py-8">
                <p class="text-gray-500">Nenhuma tarefa criada ainda</p>
              </div>

              <div v-else class="space-y-4">
                <TaskCard
                  v-for="task in tasks"
                  :key="task.id"
                  :id="task.id"
                  :title="task.title"
                  :description="task.description"
                  :category="task.category"
                  :completed="task.completed"
                  @toggle="handleToggleTask"
                  @delete="handleDeleteTask"
                />
              </div>
            </div>
          </div>

          <!-- Painel Lateral Info -->
          <div class="space-y-6">
            <!-- Estatísticas Rápidas -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-bold text-gray-800 mb-4">Resumo</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Total de Tarefas:</span>
                  <span class="font-bold text-primary">{{ tasks.length }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Concluídas:</span>
                  <span class="font-bold text-green">{{ completedTasks }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Pendentes:</span>
                  <span class="font-bold text-red">{{ pendingTasks }}</span>
                </div>
                <div class="mt-4 pt-4 border-t">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-gray-600">Progresso:</span>
                    <span class="font-bold">{{ progressPercentage }}%</span>
                  </div>
                  <div class="w-full bg-gray-300 rounded-full h-2">
                    <div
                      :style="{ width: progressPercentage + '%' }"
                      class="bg-primary h-2 rounded-full transition-all duration-300"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tarefas por Categoria -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-bold text-gray-800 mb-4">Por Categoria</h3>
              <div class="space-y-2 text-sm">
                <div v-for="(count, category) in tasksByCategory" :key="category" class="flex justify-between">
                  <span class="text-gray-600 capitalize">{{ category }}:</span>
                  <span class="font-bold text-gray-800">{{ count }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import TaskCard from '@/components/TaskCard.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import authService from '@/services/authService'

const router = useRouter()
const userName = ref('Usuário')
const tasks = ref([])

// Carregar dados do usuário ao montar
onMounted(async () => {
  // Aguarda localStorage estar disponível
  await new Promise(resolve => setTimeout(resolve, 300))
  await nextTick()
  loadUser()
  loadTasks()
  
  // Se ainda não carregou, tenta novamente
  if (userName.value === 'Usuário') {
    setTimeout(() => {
      loadUser()
    }, 500)
  }
})

const loadUser = () => {
  const user = authService.getCurrentUser()
  console.log('Usuário carregado:', user)
  if (user && user.name) {
    userName.value = user.name
    console.log('Nome definido como:', userName.value)
  } else if (user && user.email) {
    userName.value = user.email
  } else {
    // Se não conseguir carregar o usuário, volta ao login
    console.log('Usuário não encontrado, redirecionando para login')
    router.push('/login')
  }
}

const loadTasks = () => {
  const user = authService.getCurrentUser()
  if (!user || !user.email) {
    console.log('Não há usuário logado')
    tasks.value = []
    return
  }

  // Usar email como chave única para cada usuário
  const taskKey = `tasks_${user.email}`
  const savedTasks = localStorage.getItem(taskKey)
  
  if (savedTasks) {
    try {
      tasks.value = JSON.parse(savedTasks)
      console.log(`Tarefas carregadas para ${user.email}:`, tasks.value)
    } catch (e) {
      console.error('Erro ao carregar tarefas:', e)
      tasks.value = []
    }
  } else {
    tasks.value = []
  }
}

const saveTasks = () => {
  const user = authService.getCurrentUser()
  if (!user || !user.email) {
    console.log('Não há usuário logado para salvar tarefas')
    return
  }

  // Salvar com chave única por usuário
  const taskKey = `tasks_${user.email}`
  localStorage.setItem(taskKey, JSON.stringify(tasks.value))
  console.log(`Tarefas salvas para ${user.email}`)
}

// Watch para mudanças no localStorage
watch(() => localStorage.getItem('user'), () => {
  loadUser()
}, { immediate: true })

const newTask = ref({
  title: '',
  description: '',
  category: ''
})

const completedTasks = computed(() => tasks.value.filter(t => t.completed).length)
const pendingTasks = computed(() => tasks.value.length - completedTasks.value)
const progressPercentage = computed(() => {
  if (tasks.value.length === 0) return 0
  return Math.round((completedTasks.value / tasks.value.length) * 100)
})

const tasksByCategory = computed(() => {
  const categories = {}
  tasks.value.forEach(task => {
    const cat = task.category || 'sem-categoria'
    categories[cat] = (categories[cat] || 0) + 1
  })
  return categories
})

const handleAddTask = async () => {
  if (!newTask.value.title.trim()) {
    alert('Por favor preencha o título')
    return
  }

  if (!newTask.value.description.trim()) {
    alert('Por favor preencha a descrição')
    return
  }

  if (!newTask.value.category) {
    alert('Por favor selecione uma categoria')
    return
  }

  const task = {
    id: Date.now(),
    title: newTask.value.title,
    description: newTask.value.description,
    category: newTask.value.category,
    completed: false,
    createdAt: new Date()
  }

  tasks.value.push(task)
  newTask.value = { title: '', description: '', category: '' }
  saveTasks()
  // TODO: Salvar na API
}

const handleToggleTask = (id) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    task.completed = !task.completed
    saveTasks()
    // TODO: Atualizar na API
  }
}

const handleDeleteTask = (id) => {
  tasks.value = tasks.value.filter(t => t.id !== id)
  saveTasks()
  // TODO: Deletar na API
}

const handleLogout = () => {
  authService.logout()
  router.push('/login')
}
</script>

<style scoped>
</style>
