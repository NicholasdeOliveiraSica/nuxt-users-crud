<script setup>
    const handleImageError = (event) => {
      event.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + props.name
    }

    const props = defineProps({
      user: Object 
    })
    const { sex, img, name, phone, active, id } = props.user

    const emit = defineEmits([
      'edit-user',
      'view-user'
    ])
    const viewUser = () => {
      emit('view-user', id)
    }
    const editUser = () => {
      emit('edit-user', props.user)
    }
</script>

<template>
    <UCard variant="subtle" class="w-full md:w-70">
      <template #header>
        <div class="flex justify-between">
          <div class="flex gap-5 items-center">
            <NuxtImg
              :src="img" 
              alt="Avatar do usuário"
              class="w-16 h-16 rounded-lg object-cover hidden md:block"
              placeholder
              loading="lazy"
              @error="handleImageError"
            />
            <h1 class="text-xl font-bold">{{ name }}</h1>
          </div>
          <div class="flex flex-col gap-1">
            <UIcon name="i-lucide-eye" size="23" class="hover:scale-120 cursor-pointer" @click="viewUser"/>
            <UIcon name="i-lucide-pencil" size="20" class="hover:scale-120 cursor-pointer" @click="editUser" />
          </div>
        </div>
      </template>
  
      <a class="hidden md:inline">Tel: </a>{{ phone }} <br>
      <div class="flex justify-between capitalize">
        {{ sex }}
        <UBadge :color="active ? 'success' : 'error'">{{ active ? 'Ativo' : 'Inativo' }}</UBadge>
      </div>
    </UCard>
  </template>
  