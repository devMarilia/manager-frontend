import api from '@/api/api'

class AuthService {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      })
      console.log('Resposta completa login:', response.data)

      // A resposta vem em response.data.data
      const loginData = response.data.data
      
      if (loginData && loginData.token && loginData.user) {
        localStorage.setItem('token', loginData.token)
        localStorage.setItem('user', JSON.stringify(loginData.user))
        console.log('User salvo:', loginData.user)
        api.defaults.headers.common['Authorization'] = `Bearer ${loginData.token}`
        return { success: true, data: loginData }
      } else {
        console.error('Resposta inválida: falta token ou user', loginData)
        return { 
          success: false, 
          error: 'Resposta inválida do servidor'
        }
      }
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
      const response = await api.post('/auth/register', {
        name,
        email,
        password
      })

      console.log('Resposta completa registro:', response.data)

      // A resposta vem em response.data.data
      const registerData = response.data.data
      
      if (registerData && registerData.user) {
        // Tentar fazer login automático com as credenciais fornecidas
        const loginResult = await this.login(email, password)
        
        if (loginResult.success) {
          console.log('Registro e login automático bem-sucedidos')
          return { success: true, data: loginResult.data }
        } else {
          // Se login falhar, avisar o usuário para fazer login manualmente
          return { 
            success: false, 
            error: 'Usuário registrado, mas faça login manualmente',
            needsManualLogin: true
          }
        }
      }

      return { success: true, data: registerData }
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
