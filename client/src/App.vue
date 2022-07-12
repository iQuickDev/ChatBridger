<script setup>
import { ref } from 'vue'
import AppTile from './components/AppTile.vue'
import whatsappLogo from './assets/whatsapplogo.png'
import telegramLogo from './assets/telegramlogo.png'
import discordLogo from './assets/discordlogo.svg'

const appsInfo = ref([
  {
    name: 'Discord',
    icon: discordLogo,
    colors: ['#4a62fa', '#9b40fb']
  },
  {
    name: 'Telegram',
    icon: telegramLogo,
    colors: ['#3c7dd7', '#01d1ff']
  },
  {
    name: 'WhatsApp',
    icon: whatsappLogo,
    colors: ['#00e274', '#00733a']
  }
])

</script>

<template>
  <div class="wrapper">
    <div class="apps">
      <AppTile v-for="app in appsInfo" :key="app.name"
      :appName="app.name" :appIcon="app.icon" :colors="app.colors" />
      </div>
  </div>
</template>

<style>
@import 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap';

body
{
  background: #303030;
  color: #fff;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  margin: 0;
  padding: 0;
}

.apps
{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
