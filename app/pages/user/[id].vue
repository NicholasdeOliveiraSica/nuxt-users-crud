<script setup>
  import { useUsers } from '~/composables/useUsers'

  const { getUserByID, editUser } = useUsers()

  const user = ref('')
  const isModalOpen = ref(false)
  const createError = ref(null)

  onMounted(async () => {
    const { params } = useRoute()
    const { id } = params
    user.value = await getUserByID(id)
  })
  
  const handleBackPage = () => {
    navigateTo('/')
  }
  
  const handleEditUser = () => {
    isModalOpen.value = true
  }

  const handleCancelEdit = () => {
    isModalOpen.value = false
  }

  const submitForm = async (userData) => {
    try {
      await editUser(userData)

    } catch (err) {
      createError.value = err

    } finally {
      user.value = await getUserByID(userData.id)
      isModalOpen.value = false
    }
  }
  

</script>

<template>
  <div class="flex flex-col w-full max-w-180 p-5 gap-5">
    <IdHeader
      @back-page="handleBackPage"
      @edit-user="handleEditUser"
    />
    <UCard>
      <template #header>
        <div class="flex justify-start gap-10">
          <img :src="user.img" alt="Perfil do Usuário" class="w-30 rounded-xl">
          <div class="flex flex-col gap-1 justify-start">
            <h1 class="text-lg">{{user.name}}</h1>
            <h2 class="text-sm text-old-neutral-400">{{user.email}}</h2>
            <UBadge class="w-13 flex justify-center" :color="user.active ? 'success' : 'error'">{{ user.active ? 'Ativo' : 'Inativo' }}</UBadge>
          </div>
        </div>
      </template>
    </UCard>

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
              :user="user"
              @delete-user="handleDeleteUser"
              @submit="submitForm"
              @cancel="handleCancelEdit"
            />
          </UCard>
        </div>
    </UModal>
  </div>
</template>