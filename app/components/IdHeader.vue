<script setup>
  const emits = defineEmits(['editUser', 'backPage'])
</script>


<template>
  <div class="w-full flex justify-between">
    <UButton 
      color="primary" 
      icon="i-lucide-arrow-left" 
      variant="ghost"
      @click="$emit('backPage')"
      >
      Voltar
    </UButton>
    <UButton 
      color="primary" 
      icon="i-lucide-pencil"
      @click="$emit('editUser')"
      >
      Editar
    </UButton>
  </div>
</template>