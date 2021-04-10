export default function userService (httpClient) {
  return {
    getMe: async () => {
      const response = await httpClient.get('/users/me')

      return {
        data: response.data
      }
    }
  }
}
