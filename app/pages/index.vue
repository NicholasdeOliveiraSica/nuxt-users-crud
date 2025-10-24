<script setup>
  import { useUsers } from '../composables/useUsers'

  const { users, loading, error, getUsers} = useUsers()

  onMounted(() => {
    getUsers()
    }
  )
</script>

<template>

  <div>

    <h1 class="text-4xl font-bold">Lista de usuários cadastrados</h1>
    <UButton color="primary" variant="outline" class="w-full text-xl">Novo usuário</UButton>

    <div v-if="loading">Carregando...</div>

    <div v-else-if="error">Erro: {{ error }}</div>

    <div v-else>
        <div v-for="user in users" :key="user.id">
          {{ user.name }}
        </div>
    </div>

  </div>
  
</template>
