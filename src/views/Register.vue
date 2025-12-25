<template>
  <div class="absolute inset-0 flex overflow-hidden bg-white flex-col md:flex-row">
    <!-- Lado Esquerdo - Background (Hidden em Mobile) -->
    <div class="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-green to-emerald-600 flex-col justify-center items-center">
      <div class="text-center text-white px-8 md:px-16 max-w-md">
        <h1 class="text-3xl md:text-5xl font-bold mb-4">Crie sua Conta</h1>
        <p class="text-base md:text-lg text-emerald-100">Junte-se a nós e comece a organizar suas tarefas</p>
      </div>
    </div>

    <!-- Lado Direito - Formulário -->
    <div class="w-full md:w-1/2 flex flex-col justify-center items-center bg-white px-6 md:px-16 py-8 md:py-0">
      <div class="w-full max-w-sm">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Registrar</h2>

        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Input Nome -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
            <Input
              v-model="name"
              type="text"
              placeholder="Seu nome"
              borderColor="border-gray-300"
              textColor="text-gray-800"
              focusColor="focus:border-green-500"
              backgroundColor="bg-white"
            />
          </div>

          <!-- Input Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <Input
              v-model="email"
              type="email"
              placeholder="seu@email.com"
              borderColor="border-gray-300"
              textColor="text-gray-800"
              focusColor="focus:border-green-500"
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
              focusColor="focus:border-green-500"
              backgroundColor="bg-white"
            />
          </div>

          <!-- Input Confirmar Senha -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Confirmar Senha</label>
            <Input
              v-model="confirmPassword"
              type="password"
              placeholder="••••••••"
              borderColor="border-gray-300"
              textColor="text-gray-800"
              focusColor="focus:border-green-500"
              backgroundColor="bg-white"
            />
          </div>

          <!-- Botão Registrar -->
          <Button
            label="Criar Conta"
            backgroundColor="bg-green"
            textColor="text-white"
            hoverColor="hover:bg-emerald-600"
            @click="handleRegister"
          />
        </form>

        <!-- Link Voltar Login -->
        <div class="mt-6 text-center">
          <p class="text-gray-600">
            Já tem conta?
            <router-link
              to="/login"
              class="text-green font-semibold hover:text-emerald-600 transition-colors"
            >
              Entrar
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

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = async () => {
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    alert('Por favor preencha todos os campos')
    return
  }

  if (password.value !== confirmPassword.value) {
    alert('As senhas não correspondem')
    return
  }

  // TODO: Integrar com authService
  console.log('Register:', {
    name: name.value,
    email: email.value,
    password: password.value
  })
  // router.push('/login')
}
</script>

<style scoped>
</style>
