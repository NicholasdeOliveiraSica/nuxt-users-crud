<script setup>
  const countries = [
    {
      label: '+55',
      value: 'brasil', // usar como identificador
      country: 'Brasil',
      avatar: {
        src: 'https://flagcdn.com/w20/br.png',
        alt: 'Brazil flag'
      },
      mask: '(##) #####-####'
    },
    {
      label: '+1',
      value: 'eua',
      country: 'EUA',
      avatar: {
        src: 'https://flagcdn.com/w20/us.png',
        alt: 'EUA flag'
      },
      mask: '(###) ###-####'
    },
    {
      label: '+351',
      value: 'portugal',
      country: 'Portugal',
      avatar: {
        src: 'https://flagcdn.com/w20/pt.png',
        alt: 'Portugal Flag'
      },
      mask: '#####-####'
    },
    {
      label: '+54',
      value: 'argentina',
      country: 'Argentina',
      avatar: {
        src: 'https://flagcdn.com/w20/ar.png',
        alt: 'Argentina Flag'
      },
      mask: '(##) ####-####'
    }
  ]
  
  const phone = ref('')
  const selectedCountryValue = ref('eua')
  
  const selectedCountry = computed(() => countries.find(c => c.value === selectedCountryValue.value))
  const currentMaska = computed(() => selectedCountry.value?.mask || '(##) #####-####')
  
  watch(selectedCountryValue, () => { phone.value = '' })

</script>

<template>
  <div>
    <USelect 
      v-model="selectedCountryValue"
      :items="countries"
      placeholder="País"
    />

    <UInput 
      :key="selectedCountryValue"
      v-model="phone"
      v-maska
      :data-maska="currentMaska"
    />
  </div>
</template>