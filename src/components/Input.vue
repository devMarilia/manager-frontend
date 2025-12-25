<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    :class="[
      'px-4 py-2 rounded border-2 transition-colors duration-200 focus:outline-none',
      inputClasses
    ]"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  borderColor: {
    type: String,
    default: 'border-primary'
  },
  textColor: {
    type: String,
    default: 'text-gray-700'
  },
  focusColor: {
    type: String,
    default: 'focus:border-blue-500'
  },
  backgroundColor: {
    type: String,
    default: 'bg-white'
  }
})

const inputClasses = computed(() => {
  return `${props.borderColor} ${props.textColor} ${props.focusColor} ${props.backgroundColor}`
})
</script>

<style scoped>
</style>
