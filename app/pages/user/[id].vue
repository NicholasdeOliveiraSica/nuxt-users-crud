<script setup>
  import { useUsers } from '~/composables/useUsers'

  const { getUserByID } = useUsers()

  const pageUser = ref(null)
  
  onMounted(async () => {
    const { params } = useRoute()
    const { id } = params
    console.log(id)
    pageUser.value = await getUserByID(id)
  })

</script>

<template>
  <div>
    {{ pageUser }}
  </div>
</template>