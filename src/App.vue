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
<style >
.w1400 {
  width: 1400px;
  margin: 0 auto;
}
.w1440 {
  width: 1440px;
  margin: 0 auto;
}
</style>
