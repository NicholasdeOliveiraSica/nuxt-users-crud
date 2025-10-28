<script setup>

import * as yup from 'yup'
import { useJobs } from '@/composables/useJobs'

const { allJobs } = useJobs()

let newJobs = []

onMounted( async () => {
  console.log(allJobs)
  newJobs = await allJobs.map(job => ({
  label: job.name,
  value: job.code
}))
})

const hasError = ref(null)
const emit = defineEmits(['cancel', 'submit'])
const formData = ref({
  name: '',
  email: '',
  phone: '',
  cpf: '',
  birthDate: '',
  sex: 'Homem',
  job: '',
  interests: [],
  obs: '',
  active: true
})

const myJobs = [
  {
    label: 'Selecione uma profissão',
    value: null
  },
  {
    label: 'Programador',
    value: 'programador'
  },
  {
    label: 'Médico',
    value: 'medico'
  },
  {
    label: 'Construtor',
    value: 'construtor'
  },
  {
    label: 'Estágiario',
    value: 'estagiario'
  },
  {
    label: 'Empreendedor',
    value: 'empreendedor'
  },

]

const schema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  email: yup.string().email('Escreva um email válido').required('Campo obrigatório'),
  phone: yup.string().min(20, 'Número inválido').required('Campo obrigatório'),
  cpf: yup.string().min(14, 'CPF ou CNPJ inválido').required('Campo obrigatório'),
  birthDate: yup.string().min(10, 'error in date').required('Campo obrigatório'),
  sex: yup.string().oneOf(['Homem', 'Mulher'], 'error in radio bttn').required('Campo obrigatório'),
  job: yup.string().required('Campo obrigatório'),
  interests: yup.array().of(yup.string()).min(3, 'Selecione pelo menos 3').required(),
  obs: yup.string().optional(),
  active: yup.boolean().required('Campo obrigatório')
})

const handleSubmit = async () => {
  try {
    await schema.validate(FormData.value)
    emit('submit', FormData.value)
  } catch (err) {
    hasError.value = err
  }
}

</script>

<template>
  <div>

    <UCard v-if="hasError">
      <template #header>
        <h1>Não foi possível fazer cadastro.</h1>
      </template>
      <p>Possível problema com nosso sistema, tente novamente mais tarde!</p>
    </UCard>

    <UCard v-if="!hasError">
      <template #header>
        <h1>Complete os campos para cadastro!</h1>
      </template>
      <UForm schema state class @submit.prevent="handleSubmit">

        <UFormField label="Nome *" name="name">
          <UInput v-model="formData.name" type="text"/>
        </UFormField>

        <UFormField label="Email *" name="email" class="w-full">
          <UInput v-model="formData.email" type="email" />
        </UFormField>

        <UFormField label="Telefone * *" name="phone"  class="w-full">
          <UInput v-model="formData.phone" type="text"/>
        </UFormField>

        <UFormField label="CPF ou CNPJ *" name="cpf"  class="w-full">
          <UInput v-model="formData.cpf" type="text"/>
        </UFormField>
        
        <UFormField label="Data de nascimento *" name="birth date" class="w-full"> 
          <UInput v-model="formData.birthDate" type="date"/>
        </UFormField>
        
        <UFormField label="Gênero *" name="sex" class="w-full">
          <UInput value="Homem" v-model="formData.sex" type="radio" name="sex"/> Homem <br>
          <UInput value="Mulher" v-model="formData.sex" type="radio" name="sex"/> Mulher <br>
        </UFormField>

        <UFormField label="Trabalho *" name="Job" class="w-full">
          <USelect v-model="formData.job" :items="myJobs" class="w-full" />
        </UFormField>

        <UFormField label="Trabalho exemplo" name="example jobs" class="w-full">
          <USelect :items="newJobs" class="w-full" />
        </UFormField>

        <template #footer>
          <UButton @click="emit('cancel')">Cancelar</UButton>
          <UButton type="submit">Salvar</UButton>
        </template>
      </UForm>
    </UCard>

  </div>
</template>