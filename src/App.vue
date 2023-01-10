<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Accueil from "./components/Accueil.vue"
import { RouterView } from "vue-router" ;
</script>

<template>
  <Accueil />
  <div class="container mt-3">
    <RouterView />
  </div>
</template>