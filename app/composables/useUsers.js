
export const useUsers = () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.apiBase

  const users = ref([])
  const loading = ref(false)
  const error = ref(null)

  const getUsers = async () => {
    loading.value = true
    error.value = null
    
    try {
      const data = await $fetch(`${API_URL}/usuarios`)
      users.value = data
      return true

    } catch (err) {
      error.value = err.message || "erro ao buscar usuarios"
      return false

    } finally {
      loading.value = false
    }
  }

  const createUser = async (userData) => {
    loading.value = true
    try {
      const response = await $fetch(`${API_URL}/usuarios`, {
        method: POST,
        body: userData
      })
      console.log(response)
    } catch (error) {
      
    } finally {
      loading.value = false
    }
  }


  return {
    users,
    loading,
    error,
    getUsers,
    createUser
  }
}