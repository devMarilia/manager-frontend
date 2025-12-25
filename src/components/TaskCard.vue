<template>
  <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary hover:shadow-lg transition-shadow">
    <div class="flex justify-between items-start mb-4">
      <div class="flex items-start gap-3 flex-1">
        <input
          type="checkbox"
          :checked="completed"
          @change="$emit('toggle', id)"
          class="mt-1 w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
        />
        <div class="flex-1">
          <h3 :class="['text-lg font-semibold', completed ? 'line-through text-gray-400' : 'text-gray-800']">
            {{ title }}
          </h3>
          <p v-if="description" class="text-gray-600 text-sm mt-2">{{ description }}</p>
          <p v-if="dueDate" class="text-gray-500 text-sm mt-2">
            <span class="font-semibold">Vencimento:</span> {{ formatDate(dueDate) }}
          </p>
        </div>
      </div>
      <button
        @click="$emit('delete', id)"
        class="text-red hover:text-red-600 font-semibold transition-colors"
      >
        Deletar
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  dueDate: {
    type: String,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle', 'delete'])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR')
}
</script>

<style scoped>
</style>
