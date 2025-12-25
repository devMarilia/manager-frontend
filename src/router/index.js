import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Tasks from '@/views/Tasks.vue'
import CreateTask from '@/views/CreateTask.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/create-task',
    name: 'CreateTask',
    component: CreateTask
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
