<template>
  <div class="absolute inset-0 flex overflow-hidden bg-white flex-col md:flex-row">
    <!-- Lado Esquerdo - Background (Hidden em Mobile) -->
    <div class="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-primary to-blue-600 flex-col justify-center items-center">
      <div class="text-center text-white px-8 md:px-16 max-w-md">
        <h1 class="text-3xl md:text-5xl font-bold mb-4">Gerenciador de Tarefas</h1>
        <p class="text-base md:text-lg text-blue-100">Organize suas tarefas e aumente sua produtividade</p>
      </div>
    </div>

    <!-- Lado Direito - Formulário -->
    <div class="w-full md:w-1/2 flex flex-col justify-center items-center bg-white px-6 md:px-16 py-8 md:py-0">
      <div class="w-full max-w-sm">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Bem-vindo</h2>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Input Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <Input
              v-model="email"
              type="email"
              placeholder="seu@email.com"
              borderColor="border-gray-300"
              textColor="text-gray-800"
              focusColor="focus:border-primary"
              backgroundColor="bg-white"
            />
          </div>

          <!-- Input Senha -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Senha</label>
            <Input
              v-model="password"
              type="password"
              placeholder="••••••••"
              borderColor="border-gray-300"
              textColor="text-gray-800"
              focusColor="focus:border-primary"
              backgroundColor="bg-white"
            />
          </div>

          <!-- Botão Login -->
          <Button
            label="Entrar"
            backgroundColor="bg-primary"
            textColor="text-white"
            hoverColor="hover:bg-blue-700"
            type="submit"
          />
        </form>

        <!-- Link Criar Conta -->
        <div class="mt-6 text-center">
          <p class="text-gray-600">
            Não tem conta?
            <router-link
              to="/register"
              class="text-primary font-semibold hover:text-blue-700 transition-colors"
            >
              Criar conta
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import authService from '@/services/authService'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert('Por favor preencha todos os campos')
    return
  }

  const result = await authService.login(email.value, password.value)
  
  if (result.success) {
    console.log('Login bem-sucedido:', result.data)
    console.log('User no localStorage:', localStorage.getItem('user'))
    console.log('Token no localStorage:', localStorage.getItem('token'))
    // Delay maior para garantir que localStorage foi salvo
    await new Promise(resolve => setTimeout(resolve, 800))
    router.push('/tasks')
  } else {
    alert(result.error)
  }
}
</script>

<style scoped>
</style>
