<script setup>
import { useUsers } from '../composables/useUsers'

const { users, loading, error, getUsers } = useUsers()
const isModalOpen = ref(false)

const handleCreateUser = async (userData) => {
  await getUsers()
  isModalOpen.value = false
}

onMounted(() => {
  getUsers()
}
)
</script>

<template>

  <div class="flex flex-col justify-center items-center mt-10">

    <div class="flex flex-col gap-3 w-full max-w-80 lg:max-w-124 md:max-w-124 text-center">
      <h1 class="text-4xl font-bold">Lista de usuários cadastrados</h1>
      <UButton color="primary" variant="outline" class="w-full text-xl" @click="isModalOpen = true" >Novo usuário</UButton>
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

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10 gap-5">
      <UserCard 
        v-for="user in users" 
        :key="user.id" 
        :name="user.name"
        :phone="user.phone"
        :sex="user.sex"
        :active="user.active"
        :avatar="user.img"
        />
    </div>

    <UModal v-show="isModalOpen" class="fixed inset-0 z-50">
      <UserForm
      @submit="handleCreateUser"
      @cancel="isModalOpen = false"
       />
    </UModal>   

  </div>

</template>
