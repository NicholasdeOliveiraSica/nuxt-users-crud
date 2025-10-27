<script setup>
    const handleImageError = (event) => {
      event.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + props.name
    }

    const props = defineProps({
        name: String,
        phone: String,
        sex: String,
        avatar: String,
        active: Boolean 
    })
</script>

<template>
    <UCard variant="subtle" class="w-70">
      <template #header>
        <div class="flex gap-5 items-center">
          <NuxtImg 
            :src="props.avatar" 
            alt="Avatar do usuário" 
            class="w-16 h-16 rounded-lg object-cover"
            placeholder
            loading="lazy"
            @error="handleImageError"
          />
          <h1 class="text-xl font-bold">{{ props.name }}</h1>
        </div>
      </template>
  
      Tel: {{ props.phone }} <br>
      <div class="flex justify-between capitalize">
        {{ props.sex }}
        <UBadge :color="props.active ? 'success' : 'error'">{{ props.active ? 'Ativo' : 'Inativo' }}</UBadge>
      </div>
    </UCard>
  </template>
  