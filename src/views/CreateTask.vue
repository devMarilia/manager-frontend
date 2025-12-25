<template>
  <DefaultLayout>
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Criar Nova Tarefa</h1>

      <form @submit.prevent="handleCreateTask" class="space-y-6">
        <!-- Input Título -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Título</label>
          <Input
            v-model="title"
            type="text"
            placeholder="Título da tarefa"
            borderColor="border-gray-300"
            textColor="text-gray-800"
            focusColor="focus:border-primary"
            backgroundColor="bg-white"
          />
        </div>

        <!-- Input Descrição -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
          <textarea
            v-model="description"
            placeholder="Descrição da tarefa"
            class="w-full px-4 py-2 rounded border-2 border-gray-300 focus:border-primary focus:outline-none transition-colors"
            rows="5"
          ></textarea>
        </div>

        <!-- Input Data -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Data de Vencimento</label>
          <Input
            v-model="dueDate"
            type="date"
            borderColor="border-gray-300"
            textColor="text-gray-800"
            focusColor="focus:border-primary"
            backgroundColor="bg-white"
          />
        </div>

        <!-- Botões -->
        <div class="flex gap-4">
          <Button
            label="Criar Tarefa"
            backgroundColor="bg-primary"
            textColor="text-white"
            hoverColor="hover:bg-blue-700"
            @click="handleCreateTask"
          />
          <button
            type="button"
            @click="$router.back()"
            class="px-4 py-2 rounded font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'

const router = useRouter()
const title = ref('')
const description = ref('')
const dueDate = ref('')

const handleCreateTask = async () => {
  if (!title.value) {
    alert('Por favor preencha o título')
    return
  }

  // TODO: Integrar com API
  console.log('Create Task:', {
    title: title.value,
    description: description.value,
    dueDate: dueDate.value
  })
  // router.push('/tasks')
}
</script>

<style scoped>
</style>
