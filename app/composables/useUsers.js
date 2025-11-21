
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
  const getUserByID = async (userID) => {
    loading.value = true
    error.value = null
    
    try {
      const data = await $fetch(`${API_URL}/usuarios/${userID}`)
      return data

    } catch (err) {
      error.value = err.message || "erro ao buscar usuarios"
      return 'Houve algum problema ao carregar o usuário'

    } finally {
      loading.value = false
    }
  }

  const createUser = async (userData) => {
    loading.value = true
    try {
      await $fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        body: userData
      })
    } catch (error) {
      
    } finally {
      loading.value = false
    }
  }

  const editUser = async (userData) => {
    loading.value = true
    try {
      await $fetch(`${API_URL}/usuarios/${userData.id}`, {
        method: 'PUT',
        body: userData
      })
    } catch (error) {
      
    } finally {
      loading.value = false
    }
  }
  const deleteUser = async (userID) => {
    loading.value = true
    try {
      await $fetch(`${API_URL}/usuarios/${userID}`, {
        method: 'DELETE'
      })
    } catch (er) {
      
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    loading,
    error,
    getUsers,
    getUserByID,
    createUser,
    editUser,
    deleteUser
  }
}