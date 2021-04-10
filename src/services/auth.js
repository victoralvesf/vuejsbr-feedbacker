export default function authService (httpClient) {
  return {
    login: async ({ email, password }) => {
      const response = await httpClient.post('/auth/login', {
        email,
        password
      })

      let errors = null

      if (!response.data) {
        errors = {
          status: response.request.status,
          statusText: response.request.statusText
        }
      }

      return {
        data: response.data,
        errors
      }
    },

    register: async ({ name, email, password }) => {
      const response = await httpClient.post('/auth/register', {
        name,
        email,
        password
      })

      let errors = null

      if (!response.data) {
        errors = {
          status: response.request.status,
          statusText: response.request.statusText
        }
      }

      return {
        data: response.data,
        errors
      }
    }
  }
}
