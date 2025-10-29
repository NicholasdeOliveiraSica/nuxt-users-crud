<script setup>

const open = ref(false)

</script>

<template>
    <div>
        <h1>Teste de modal</h1>
        <UButton @click="open = true">Abrir modal</UButton> 
        
        <UModal v-model:open="open">
            <template #header>
                <h1>Modal funcionando!</h1>
            </template>

            <template #body>
                <UCard>
                    <p>aiaiaiai, agora funciona né</p>
                </UCard>
            </template>

            <template #footer>
                <UButton @click="open = false">Fechar</UButton>
            </template>
        </UModal>
    </div>
</template>