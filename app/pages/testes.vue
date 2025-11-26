<script setup>
// Dados fake só pra visualizar
const user = {
  id: '1',
  name: 'João Silva Santos',
  email: 'joao.silva@email.com',
  phone: '+55 (11) 98765-4321',
  cpf: '123.456.789-00',
  birthDate: '1990-03-15',
  sex: 'male',
  job: 'Desenvolvedor Full Stack',
  interests: ['Tecnologia', 'Música', 'Filmes', 'Esportes', 'Viagens', 'Games', 'Fotografia'],
  obs: 'Cliente preferencial desde 2020. Solicitar atendimento prioritário. Possui desconto especial de 15% em todos os serviços.',
  active: true,
  img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao',
  createdAt: '2024-01-10',
  updatedAt: '2024-11-05'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

const calculateAge = (birthDate) => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

const translateGender = (sex) => {
  const genders = {
    'male': 'Masculino',
    'female': 'Feminino',
    'other': 'Outros'
  }
  return genders[sex] || sex
}
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-3xl">
    
    <!-- Header -->
    <div class="flex justify-between mb-6">
      <UButton variant="ghost" icon="i-lucide-arrow-left">
        Voltar
      </UButton>
      <UButton color="primary" icon="i-lucide-pencil">
        Editar
      </UButton>
    </div>

    <!-- Card ÚNICO com tudo -->
    <UCard class="mb-6">
      
      <!-- Cabeçalho: Avatar + Nome + Email + Status -->
      <div class="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <img :src="user.img" class="w-20 h-20 rounded-lg object-cover" />
        <div class="flex-1">
          <h1 class="text-2xl font-bold">{{ user.name }}</h1>
          <p class="text-gray-600 dark:text-gray-400">{{ user.email }}</p>
          <UBadge :color="user.active ? 'success' : 'error'" class="mt-1">
            {{ user.active ? '🟢 Ativo' : '🔴 Inativo' }}
          </UBadge>
        </div>
      </div>

      <!-- Informações Pessoais -->
      <div class="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-start">
          <span class="text-xl mr-3">📱</span>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Telefone</p>
            <p class="font-medium">{{ user.phone }}</p>
          </div>
        </div>

        <div class="flex items-start">
          <span class="text-xl mr-3">📄</span>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">CPF/CNPJ</p>
            <p class="font-medium">{{ user.cpf }}</p>
          </div>
        </div>

        <div class="flex items-start">
          <span class="text-xl mr-3">🎂</span>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Data de Nascimento</p>
            <p class="font-medium">{{ formatDate(user.birthDate) }} ({{ calculateAge(user.birthDate) }} anos)</p>
          </div>
        </div>

        <div class="flex items-start">
          <span class="text-xl mr-3">⚧</span>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Gênero</p>
            <p class="font-medium capitalize">{{ translateGender(user.sex) }}</p>
          </div>
        </div>

        <div class="flex items-start">
          <span class="text-xl mr-3">💼</span>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Profissão</p>
            <p class="font-medium">{{ user.job }}</p>
          </div>
        </div>
      </div>

      <!-- Interesses -->
      <div class="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-start">
          <span class="text-xl mr-3">❤️</span>
          <div class="flex-1">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Interesses</p>
            <p class="font-medium">{{ user.interests.join(', ') }}</p>
          </div>
        </div>
      </div>

      <!-- Observações -->
      <div class="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700" v-if="user.obs">
        <div class="flex items-start">
          <span class="text-xl mr-3">📝</span>
          <div class="flex-1">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Observações</p>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ user.obs }}</p>
          </div>
        </div>
      </div>

      <!-- Metadados -->
      <div class="text-sm text-gray-500 dark:text-gray-400 space-y-1">
        <p>📅 Cadastrado em: {{ formatDate(user.createdAt) }}</p>
        <p>🔄 Última atualização: {{ formatDate(user.updatedAt) }}</p>
      </div>

    </UCard>

    <!-- Botão Deletar -->
    <div class="flex justify-center">
      <UButton 
        color="error" 
        variant="outline"
        icon="i-lucide-trash-2"
      >
        Deletar Usuário
      </UButton>
    </div>

  </div>
</template>