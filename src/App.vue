<script setup>
import Header from './components/Header.vue' 
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div>
    <Header></Header>
    <RouterView></RouterView>
  </div>
  

</template>
<style>
.custom-swal {
    z-index: 9999 !important;
    }
</style>

