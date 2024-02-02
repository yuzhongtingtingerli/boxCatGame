<template>
  <div class="bridge">
    <div class="w1140">
      <Guidelines />
      <div>
        <Network />
        <MyRecord />
      </div>
    </div>
  </div>
</template>

<script setup>
import Guidelines from "./guidelines.vue";
import Network from "./network.vue";
import MyRecord from "./myRecord.vue";

</script>
<style scoped lang="scss">
.bridge {
  min-width: 1440px;
  background-color: #000;
  height: 1340px;
  color: #fff;
  .w1140 {
    width: 1140px;
    margin: 0 auto;

  }
}
</style>
