<script setup>

const open = ref(false)
const number = ref('')

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
                    <UInput v-model="number" v-maska data-maska="'(##) #####-####'" />
                </UCard>
            </template>

            <template #footer>
                {{ number }}
                <UButton @click="open = false">Fechar</UButton>
            </template>
        </UModal>
    </div>
</template>