<template>
  <button
    :class="[
      'px-4 py-2 rounded font-semibold transition-colors duration-200',
      buttonClasses
    ]"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  backgroundColor: {
    type: String,
    default: 'bg-primary'
  },
  textColor: {
    type: String,
    default: 'text-white'
  },
  hoverColor: {
    type: String,
    default: 'hover:bg-blue-700'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const buttonClasses = computed(() => {
  return `${props.backgroundColor} ${props.textColor} ${props.hoverColor} ${
    props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  }`
})
</script>

<style scoped>
</style>
