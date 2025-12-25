import api from '@/api/api'

class AuthService {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      })

      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      }

      return { success: true, data: response.data }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao fazer login'
      }
    }
  }

  async register(name, email, password) {
    try {
      const response = await api.post('/auth/cadastro', {
        name,
        email,
        password
      })

      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      }

      return { success: true, data: response.data }
    } catch (error) {
      console.error('Erro ao registrar:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao registrar'
      }
    }
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete api.defaults.headers.common['Authorization']
  }

  getCurrentUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isAuthenticated() {
    return !!this.getToken()
  }
}

export default new AuthService()
