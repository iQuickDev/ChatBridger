<script setup>
import {onMounted, ref} from 'vue'
import settings from '../assets/gear.png'
import poweroff from '../assets/poweroff.png'

const props = defineProps({
  appName: {
    type: String,
    default: 'App Name'
  },
  appIcon: {
    type: String,
    default: ''
  },
   colors: {
        type: Array,
        default: ['#fff', '#fff']
    }
})

</script>

<template>
<div class="app-container">
<img :src=settings class="settings">
<h1>{{appName}}</h1>
<span class="spacer"></span>
<img class="mainimage" :src=appIcon>
<span class="spacer"></span>
<img :src=poweroff id="togglestate" class="icon">
</div>
</template>

<style scoped>
h1, h2, h3, h4, h5, h6
{
    padding: 0;
    margin: 0;
}

.app-container
{
    position: relative;
    border-radius: 10px;
    padding: 10px;
    width: 200px;
    height: max-content;
    background: linear-gradient(-45deg, v-bind('colors[0]'), v-bind('colors[1]'));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin: 2vw;
    transition: .3s;
}

.app-container:hover
{
    transition: .3s;
    cursor: pointer;
    transform: scale(1.1);
    box-shadow: 0 0 20px 1px v-bind('colors[0]');
}

.app-container h1
{
    filter: drop-shadow(0px 0px 2px #000);
}

.mainimage
{
    width: 100px;
    height: 100px;
    filter: drop-shadow(0px 0px 2px #000);
}

.spacer
{
    margin-top: 10px;
    margin-bottom: 10px;
}

.icon
{
    width: 50px;
    height: 50px;
}

.settings
{
    width: 30px;
    height: 30px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    top: -5px;
    left: -5px;
}
</style>
