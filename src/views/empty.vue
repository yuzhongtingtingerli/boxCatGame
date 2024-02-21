<template>
  <div class="empty">
    <ErrorInfo :message="errorInfoTitle" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ErrorInfo from "@/components/error-info.vue";
const errorInfoTitle = ref("Woop,Service Is Not Available In Your Location");
</script>
<style scoped lang="scss">
.empty {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
}
</style>
