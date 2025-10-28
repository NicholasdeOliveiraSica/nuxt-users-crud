<script setup>

import * as yup from 'yup'
import { newJobs } from '@/composables/useJobs'
import { interesses } from '@/assets/interesses.json'

const Uinteresses = interesses.map(item => ({
  value: item,
  label: item
}))
const errors = ref({})
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

const cpfMask = computed(() => {
  const numbers = formData.value.cpf.replace(/\D/g, '')
  return numbers.length > 11 ? '##.###.###/####-##' : '###.###.###-##'
})

const schema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  email: yup.string().email('Escreva um email válido').required('Campo obrigatório'),
  phone: yup.string().min(20, 'Número inválido').required('Campo obrigatório'),
  cpf: yup.string().min(14, 'CPF ou CNPJ inválido').required('Campo obrigatório'),
  birthDate: yup.string().min(10, 'error in date').required('Campo obrigatório'),
  sex: yup.string().oneOf(['Homem', 'Mulher'], 'error in radio bttn').required('Campo obrigatório'),
  job: yup.string().required('Campo obrigatório'),
  interests: yup.array().of(yup.string()).min(3, 'Selecione pelo menos 3').required(),
  obs: yup.string().optional().max(200, 'Máximo de 200 caractéres'),
  active: yup.boolean().required('Campo obrigatório')
})

const handleSubmit = async () => {
  try {
    await schema.validate(formData.value, { abortEarly: false})
    errors.value = {}
    emit('submit', FormData.value)
  } catch (err) {
    err.inner.forEach((error) => {
      errors.value[error.path] = error.message
    })
  }
}

</script>

<template>
  <div>

    <UCard>
      <template #header>
        <h1>Complete os campos para cadastro!</h1>
      </template>
      <UForm :schema="schema" :state="formData" @submit.prevent="handleSubmit">

        <UFormField label="Nome *" name="name" :error="errors.name">
          <UInput v-model="formData.name" type="text"/>
        </UFormField>

        <UFormField label="Email *" name="email" class="w-full" :error="errors.name">
          <UInput v-model="formData.email" type="email" />
        </UFormField>

        <UFormField label="Telefone * *" name="phone"  class="w-full" :error="errors.name">
          <UInput v-model="formData.phone" v-mask="'(##) #####-####'" type="tell" placeholder="(11) 98765-4321"/>
        </UFormField>

        <UFormField label="CPF ou CNPJ *" name="cpf"  class="w-full" :error="errors.name">
          <UInput v-model="formData.cpf" type="text" v-mask="cpfMask" placeholder="CPF ou CNPJ"/>
        </UFormField>
        
        <UFormField label="Data de nascimento *" name="birth date" class="w-full" :error="errors.name"> 
          <UInput v-model="formData.birthDate" type="date"/>
        </UFormField>
        
        <UFormField label="Gênero *" name="sex" class="w-full" :error="errors.name">
          <URadioGroup
            v-model="formData.sex"
            :items="[
              { label: 'Homem', value: 'Homem' },
              { label: 'Mulher', value: 'Mulher' }
            ]"
          />
        </UFormField>

        <UFormField label="Trabalho *" name="Job" class="w-full" :error="errors.name">
          <USelect v-model="formData.job" :items="myJobs" class="w-full" />
        </UFormField>

        <UFormField label="Trabalho exemplo" name="example jobs" class="w-full" :error="errors.name">
          <USelect :items="newJobs" class="w-full" />
        </UFormField>

        <UFormField label="Interesses" :error="errors.name">
          <UCheckboxGroup
            v-model="formData.interests"
            :items="Uinteresses"
          />
        </UFormField>

        <UFormField label="Observações" name="obs" :error="errors.name">
          <UTextarea 
            v-model="formData.obs" 
            :maxlength="200"
            placeholder="Observações adicionais..."
          />
        </UFormField>

        <UFormField label="Status" name="active" :error="errors.name">
          <USwitch v-model="formData.active" />
        </UFormField>

        <template #footer>
          <UButton @click="emit('cancel')">Cancelar</UButton>
          <UButton type="submit">Salvar</UButton>
        </template>
      </UForm>
    </UCard>

  </div>
</template>