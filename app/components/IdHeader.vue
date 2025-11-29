
<script setup>
  const emit = defineEmits([
    'edit-user', 'back-page'
  ])
  const backPage = () => {
    console.log('clicou')
    emit('back-page')
  }
  const editUser = () => {
    emit('edit-user')
  }
</script>


<template>

  <div class="w-full flex justify-between">

    <UButton 
      color="primary" 
      icon="i-lucide-arrow-left" 
      variant="ghost"
      @click="backPage"
      > Voltar
    </UButton>

    <UButton 
      color="primary" 
      icon="i-lucide-pencil"
      @click="editUser"
      > Editar
    </UButton>

  </div>

</template>