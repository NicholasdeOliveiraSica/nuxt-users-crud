<script setup>
    const props = defineProps({
        name: String,
        cell: String,
        sex: String,
        avatar: String,
        active: Boolean 
    })
    const editing = ref(false)
    const active = ref(props.active)
</script>

<template>
    <UCard variant="subtle" class="w-70">
      <template #header>
        <Placeholder class="h-8" />
        <div class="flex gap-5 items-center">
          <img :src="props.avatar" alt="Person Avatar" class="w-15 rounded-lg">
          <h1 class="text-xl font-bold">{{ props.name }}</h1>
        </div>
      </template>
  
      <Placeholder class="h-32" /> 
      Tel: {{ props.cell }} <br>
      <div class="flex justify-between capitalize">
        {{ props.sex }}
        <USwitch v-model="active" :disabled="!editing"/>
      </div>
    </UCard>
  </template>
  