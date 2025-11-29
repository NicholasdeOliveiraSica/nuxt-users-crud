<script setup>
import { useUsers } from '../composables/useUsers'

const { users, loading, error, getUsers, createUser, editUser, deleteUser } = useUsers()

const isModalOpen = ref(false)
const createError = ref(null)
const userToEdit = ref(null)


const handleCreateNew = () => {
  isModalOpen.value = true
  userToEdit.value = null
}

const handleEditUser = (user) => {
  isModalOpen.value = true
  userToEdit.value = user
}

const handleViewUser = (userID) => {
  return navigateTo(`/user/${userID}`)
}

const handleCancel = () => {
  isModalOpen.value = false
  userToEdit.value = null
}

const handleDeleteUser = async (userID) => {
  try {
    await deleteUser(userID)
  } catch (err) {
    createError.value = err
  } finally {
    await getUsers()
    isModalOpen.value = false
    userToEdit.value = null
  }
}

const submitForm = async (userData) => {
  if(userToEdit.value) {
    try {
      await editUser(userData)

    } catch (err) {
      createError.value = err

    } finally {
      await getUsers()
      isModalOpen.value = false
      userToEdit.value = null
    }

  } else {
    try {
      await createUser(userData)

    } catch (err) {
      createError.value = err

    } finally {
      await getUsers()
      isModalOpen.value = false
      userToEdit.value = null
    }
  }
}

onMounted(() => {
  getUsers()
})

</script>

<template>

  <img src="../assets/hero-image.jpg" alt="hero-image" class="rounded-4xl mt-15">

  <div class="flex flex-col justify-center items-center mt-10">

    <div class="flex flex-col gap-3 w-full max-w-80 lg:max-w-124 md:max-w-124 text-center">
      <h1 class="text-4xl font-bold">Lista de usuários cadastrados</h1>
      <UButton color="primary" variant="outline" class="w-full text-xl" @click="handleCreateNew">
        Novo usuário
      </UButton>
    </div>
    
    <div v-if="loading" class="grid grid-cols-3 gap-7 m-10">
      <div class="flex items-center gap-4" v-for="n in 15" :key="n">
        <USkeleton class="h-16 w-16 rounded-lg" />
        <div class="grid gap-2 flex-1">
          <USkeleton class="h-6 w-[120px]" />
          <USkeleton class="h-4 w-[200px]" />
          <USkeleton class="h-4 w-[100px]" />
        </div>
      </div>
    </div>

    <UAlert 
      v-else-if="error" 
      color="error" 
      variant="subtle"
      title="Erro ao carregar usuários"
      :description="error"
    >
      <template #actions>
        <UButton @click="getUsers" color="error" variant="outline">
          Tentar novamente
        </UButton>
      </template>
    </UAlert>

    <div v-else class="grid grid-cols-2 lg:grid-cols-3 m-10 gap-5">
      <UserCard 
        v-for="user in users" 
        :key="user.id" 
        :user="user"
        @edit-user="handleEditUser"
        @view-user="handleViewUser"
      />
    </div>

    <UModal
      v-model:open="isModalOpen" 
      title="Complete os campos para cadastrar!" 
      description="Formulário para cadastro de novos Usuários, ou resposta ao erro do servidor" 
      class="lg:max-w-160 md:max-w-160"
      #content
    >
        <div class="overflow-y-auto">
          <UCard v-if="createError">
            <UAlert color="error" class="mb-4 text-2xl text-white" title="Houve algum erro, tente novamente mais tarde" />
          </UCard>
          <UCard v-if="!createError">
            <template #header>
              <h1 class="text-xl font-bold">Complete os campos para cadastrar!</h1>
            </template>
            <UserForm
              :user="userToEdit"
              @delete-user="handleDeleteUser"
              @submit="submitForm"
              @cancel="handleCancel"
            />
          </UCard>
        </div>
    </UModal>

  </div>
</template>