<script setup>
  import { useUser as store } from '../composables/useUsers'
  onMounted(store.getUsers())
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold">Lista de usuários cadastrados</h1>
    <UButton color="primary" variant="outline" class="w-full text-xl">Novo usuário</UButton>
  </div>
</template>
