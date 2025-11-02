<script setup>

import * as yup from 'yup'
import { useJobs } from '@/composables/useJobs'
import { interesses } from '@/assets/interesses.json'


const { newJobs } = useJobs()
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

const schema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  email: yup.string().email('Escreva um email válido').required('Campo obrigatório'),
  phone: yup.string().min(19, 'Número inválido').required('Campo obrigatório'),
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
    emit('submit', formData.value)
  } catch (err) {
    err.inner.forEach((error) => {
      errors.value[error.path] = error.message
    })
  }

}

</script>

<template>
  <div>

      <UForm :state="formData" @submit.prevent="handleSubmit" :validate-on="['submit']" class="text-xl">

        <UFormField label="Nome *" name="name" :error="errors.name" class="w-full">
          <UInput v-model="formData.name" type="text" class="w-full"/>
        </UFormField> {{ formData.name.toCapitalize }}

        <UFormField label="Email *" name="email" class="w-full" :error="errors.email" >
          <UInput v-model="formData.email" type="email" class="w-full" />
        </UFormField>

        <UFormField label="Telefone *" name="phone"  class="w-full" :error="errors.phone">
          <UInput v-model="formData.phone" v-maska data-maska="['+55 (##) ####-####', '+55 (##) #####-####']" type="text" placeholder="(11) 98765-4321" class="w-full"/>
        </UFormField>

        <UFormField label="CPF ou CNPJ *" name="cpf"  class="w-full" :error="errors.cpf">
          <UInput v-model="formData.cpf" type="text" v-maska data-maska="['###.###.###-##', '##.###.###/####-##']" placeholder="CPF ou CNPJ" class="w-full"/>
        </UFormField>
        
        <div class="flex w-full justify-between">
          <UFormField label="Gênero *" name="sex" class="w-full" :error="errors.sex">
            <URadioGroup
              v-model="formData.sex"
              :items="[
                { label: 'Homem', value: 'Homem' },
                { label: 'Mulher', value: 'Mulher' }
              ]"
            />{{ formData.sex }}
          </UFormField> 
          
          <UFormField label="Data de nascimento *" name="birth date" class="w-full" :error="errors.birthDate">
            <UInput v-model="formData.birthDate" type="date" class="w-full h-10"/>
          </UFormField>
        </div>
        

        <UFormField label="Trabalho *" name="Job" class="w-full" :error="errors.job">
          <USelect v-model="formData.job" :items="myJobs" class="w-full" />
        </UFormField>

        <UFormField label="Profissão *" name="job" :error="errors.job">
          <UInput 
            placeholder="Digite para buscar..."
            list="profissoes"
          />
          <datalist id="profissoes">
            <option v-for="job in newJobs" :value="job.label" />
          </datalist>
        </UFormField>

        <UFormField label="Interesses" :error="errors.interests">
          <UCheckboxGroup
            v-model="formData.interests"
            :items="Uinteresses"
          />  
        </UFormField>

        <UFormField label="Observações" name="obs" :error="errors.obs">
          <UTextarea 
            v-model="formData.obs" 
            :maxlength="200"
            placeholder="Observações adicionais..."
          />
        </UFormField>

        <UFormField label="Status" name="active" :error="errors.active">
          <USwitch v-model="formData.active" />
        </UFormField>

        <UButton @click="emit('cancel')" type="button">Cancelar</UButton>
        <UButton type="submit">Salvar</UButton>
      </UForm>
  </div>
</template>