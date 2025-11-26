<script setup>
  import { useUsers } from '~/composables/useUsers'

  const { getUserByID } = useUsers()

  const user = ref('')
  
  onMounted(async () => {
    const { params } = useRoute()
    const { id } = params
    user.value = await getUserByID(id)
  })

</script>

<template>
  <div class="flex flex-col w-full max-w-180 p-5 gap-5">
    <IdHeader/>
    <UCard>
      <template #header>
        <div>
          <img :href="user.img"/>
          <div class="flex flex-col gap-1 justify-start">
            <h1 class="text-lg">{{user.name}}</h1>
            <h2 class="text-sm text-old-neutral-400">{{user.email}}</h2>
            <UBadge class="w-13 flex justify-center" :color="user.active ? 'success' : 'error'">{{ user.active ? 'Ativo' : 'Inativo' }}</UBadge>
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>