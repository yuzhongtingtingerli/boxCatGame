<template>
  <div class="error-info">
    <div class="info">
      <div class="logo">
        <img src="@/assets/error_logo.png" height="300px" alt="" srcset="" />
      </div>
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  message: String,
});
</script>
<style scoped lang="scss">
.error-info {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  .info {
    position: absolute;
    bottom: 76px;
    left: 50%;
    transform: translateX(-50%);
    width: 1000px;
    height: 114px;
    line-height: 114px;
    font-family: LilitaOne;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
    background-color: #fff;
    border: 1px solid #000000;
    box-shadow: 4px 4px 0px 0px #000000;
    border-radius: 10px;
    z-index: 1;
  }
  .logo {
    position: absolute;
    bottom: -76px;
    left: -71px;
    z-index: 2;
  }
}
</style>
