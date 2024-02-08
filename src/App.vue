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
<style lang="scss">
.w1400 {
  width: 1400px;
  margin: 0 auto;
}
.w1440 {
  width: 1440px;
  margin: 0 auto;
}
.ant-modal {
  top: 180px;
}

.scroll-wrap {
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 2px;
  }
}

.scroll-write-wrap {
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius: 2px;
  }
}
</style>
