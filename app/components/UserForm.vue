<script setup>

import * as yup from 'yup'
import { useJobs } from '@/composables/useJobs'
import { interesses as listInteresses } from '@/assets/interesses.json'
import countryList from '@/assets/paises.json'

const props = defineProps({
  user: Object
})
const loading = ref(false)
const errors = ref({})
const confirmError = ref(null)
const confirmDelete = ref(false)
const dateConfirm = ref(null)
const countries = countryList
const selCountryValue = ref('brasil')

const selCountry = computed(() => countries.find(item => item.value === selCountryValue.value))
const currentMaska = computed(() => selCountry.value.mask)

watch(selCountryValue, () => {
  formData.value.phone = ''
})

const tryDelete = () => {
  loading.value = true
  if (dateConfirm.value === formData.value.birthDate) {
    emit('delete-user', props.user.id)
    confirmError.value = null
  } else {
    console.log('nao passou no if')
    confirmError.value = 'Data de nascimento incorreta, tente novamente'
  }
  loading.value = false
}

const { newJobs } = useJobs()
const interesses = listInteresses.map((item, index) => ({
  index: index,
  value: item,
  label: item
}))
const sumInteresses = 5
const numInteresses = ref(4)
const nowInteresses = computed(() => interesses.filter(item => item.index <= numInteresses.value))

const emit = defineEmits(['cancel', 'submit', 'delete-user'])
const formData = ref({
  name: '',
  email: '',
  phone: '',
  cpf: '',
  birthDate: '',
  sex: 'male',
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
  name: yup.string().required('Campo obrigatório').min(5, 'Escreva o nome completo'),
  email: yup.string().email('Escreva um email válido').required('Campo obrigatório'),
  phone: yup.string().min(10, 'Número inválido').required('Campo obrigatório'),
  cpf: yup.string().min(14, 'CPF ou CNPJ inválido').required('Campo obrigatório').test('len', 'CPF ou CNPJ inválido', value => value ? value.length === 14 || value.length === 18 : false),
  birthDate: yup.string().min(10, 'error in date').required('Campo obrigatório'),
  sex: yup.string().oneOf(['male', 'female', 'other'], 'error in radio bttn').required('Campo obrigatório'),
  job: yup.string().required('Campo obrigatório'),
  interests: yup.array().of(yup.string()).min(3, 'Selecione pelo menos 3').required(),
  obs: yup.string().optional().max(200, 'Máximo de 200 caractéres'),
  active: yup.boolean().required('Campo obrigatório')
})

const validateField = async (fieldName) => {
  try {
    await schema.validateAt(fieldName, formData.value)
    delete errors.value[fieldName]
  } catch (err) {
    errors.value[fieldName] = err.message
  }
}

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

onMounted(() => {
  if(props.user) {
    formData.value = props.user
  }
})

</script>

<template>
  <div>

      <UForm :state="formData" @submit.prevent="handleSubmit" :validate-on="['submit']" class="text-xl flex flex-col gap-2">

        <UFormField label="Nome *" name="name" :error="errors.name" class="w-full">
          <UInput v-model="formData.name" type="text" class="w-full" @blur="validateField('name')"/>
        </UFormField>

        <UFormField label="Email *" name="email" class="w-full" :error="errors.email" >
          <UInput v-model="formData.email" type="email" class="w-full" @blur="validateField('email')" />
        </UFormField>

        <UFormField label="Telefone *" name="phone"  class="w-full" :error="errors.phone">
          <div class=" flex justify-between gap-2 flex-row">
            <USelect
              v-model="selCountryValue"
              :items="countries"
              placeholder="DDI"

            />
            <UInput
              v-model="formData.phone"
              v-maska :data-maska="currentMaska"
              type="text" placeholder="(11) 98765-4321"
              class="w-full"
              @blur="validateField('phone')"/>
          </div>
        </UFormField>

        <UFormField label="CPF ou CNPJ *" name="cpf"  class="w-full" :error="errors.cpf">
          <UInput 
            v-model="formData.cpf" 
            type="text" v-maska 
            data-maska="['###.###.###-##', '##.###.###/####-##']" 
            placeholder="CPF ou CNPJ" class="w-full"
            @blur="validateField('cpf')"
            />
        </UFormField>
        
        <div class="flex w-full justify-between">
          <UFormField label="Gênero *" name="sex" class="w-full" :error="errors.sex">
            <URadioGroup
              v-model="formData.sex"
              :items="[
                { label: 'Homem', value: 'male' },
                { label: 'Mulher', value: 'female' },
                { label: 'Outros', value: 'other'}
              ]"
            />
          </UFormField> 
          
          <UFormField label="Data de nascimento *" name="birth date" class="w-full" :error="errors.birthDate">
            <UInput v-model="formData.birthDate" type="date" class="w-full h-10" @blur="validateField('birthDate')"/>
          </UFormField>
        </div>
        

        <UFormField label="Trabalho *" name="Job" class="w-full" :error="errors.job">
          <USelect v-model="formData.job" :items="myJobs" class="w-full" @change="validateField('job')" />
        </UFormField>

        <UFormField label="Exemplo de lista de profissões" name="exemple-job">
          <UInput 
            placeholder="Digite para buscar..."
            list="profissoes"
            class="w-full"
          />
          <datalist id="profissoes">
            <option v-for="job in newJobs" :value="job.label" />
          </datalist>
        </UFormField>

        <UFormField label="Interesses" :error="errors.interests">
          <div class="flex flex-col gap-2">
            <UCheckboxGroup
              v-model="formData.interests"
              :items="nowInteresses"
              @update:model-value="validateField('interests')"
            />
            <a
              @click="numInteresses = Math.min(numInteresses + sumInteresses, interesses.length - 1)"
              v-if="interesses.length >= 100"
              class="cursor-pointer underline">Carregar mais interesses...</a>
          </div>
        </UFormField>

        <UFormField label="Observações" name="obs" :error="errors.obs">
          <UTextarea 
            v-model="formData.obs" 
            :maxlength="200"
            placeholder="Observações adicionais..."
            class="w-full"
            @blur="validateField('obs')"
          />
        </UFormField>

        <div>
          <UFormField label="Status" name="active" :error="errors.active" class="mb-5">
            <div class=" flex flex-col gap-2">
              <USwitch v-model="formData.active" />
              <p v-if="formData.active">Usuário Ativo</p>
              <p v-if="!formData.active">Usuário Inativo</p>
            </div>
          </UFormField>
        </div>
        
        <UButton v-if="user" type="submit" class="w-full h-10 text-center flex justify-center text-lg">Salvar</UButton>
        <div class="flex gap-3 justify-between">
          <UButton v-if="user" @click="{confirmDelete = true; console.log(confirmDelete)}" type="button" class="w-full h-10 text-center flex justify-center text-lg" color="error" variant="outline" label="Deletar Usuário"></UButton>
          <UButton @click="emit('cancel')" type="button" class="w-full h-10 text-center flex justify-center text-lg" variant="outline" label="Cancelar"></UButton>
          <UButton v-if="!user" type="submit" class="w-full h-10 text-center flex justify-center text-lg">Salvar</UButton>
        </div>
      </UForm> 
      <UModal v-model:open="confirmDelete" title="Confirmation of delete user" description="A modal to confirmate if you realy want to delete this user" #content>
        <UCard>
          <template #header>
            <h1>Deletar {{ formData.name }}?</h1>
          </template>
          <form class="-mt-3 flex flex-col gap-2">
            <p>Realmente deseja deletar este usuário do banco de dados?</p>
            <p>Confirme a data de nascimento abaixo:</p>
            <UInput type="date" v-model="dateConfirm" :error="confirmError"/>
            {{ dateConfirm }} {{ formData.birthDate }} {{ dateConfirm === formData.birthDate }}
            <div class="flex justify-between gap-2 mt-4">
              <UButton label="Confirmar" :disabled="loading" @click="tryDelete" color="error" variant="solid" class="w-full flex justify-center h-10 cursor-pointer"/>
              <UButton label="Cancelar" variant="outline" class="w-full flex justify-center h-10 cursor-pointer"/>
            </div>
          </form>
        </UCard>
      </UModal>
  </div>
</template>
