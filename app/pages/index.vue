<script setup>
import { useUsers } from '../composables/useUsers'

const { users, loading, error, getUsers } = useUsers()

onMounted(() => {
  getUsers()
}
)
</script>

<template>

  <div class="flex flex-col justify-center items-center mt-10">

    <div class="flex flex-col gap-3 w-124 text-center">
      <h1 class="text-4xl font-bold">Lista de usuários cadastrados</h1>
      <UButton color="primary" variant="outline" class="w-full text-xl cursor-pointer">Novo usuário</UButton>
    </div>

    
    <div v-if="loading" class="grid grid-cols-3 gap-7">
      <div class="flex items-center gap-4" v-for="n in 15" :key="n">
        <USkeleton class="h-16 w-16 rounded-lg" />
        <div class="grid gap-2 flex-1">
          <USkeleton class="h-6 w-[120px]" />
          <USkeleton class="h-4 w-[200px]" />
          <USkeleton class="h-4 w-[100px]" />
        </div>
      </div>
    </div>

    
    <div v-else-if="error">Erro: {{ error }}</div>

    <div v-else class="grid grid-cols-3 m-10 gap-5">
      <UserCard 
        v-for="user in users" 
        :key="user.id" 
        :name="user.name"
        :cell="user.cell"
        :sex="user.sex"
        :active="user.active"
        :avatar="user.img"
        />
    </div>

  </div>

</template>
