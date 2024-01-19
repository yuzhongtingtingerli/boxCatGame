<script setup>
import Header from "./views/header.vue";
// import Canvas from "./views/canvas.vue";
</script>

<template>
  <Header />
  <div class="content">
    <router-view />
  </div>

  <!-- <Canvas /> -->
</template>

<style scoped></style>
