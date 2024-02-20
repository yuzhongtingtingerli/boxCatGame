<template>
  <div class="stake">
    <div class="w1320">
      <About />
      <Season />
      <MyStake />
      <ErrorMsg
        ref="errorMsgRef"
        headline="Dear!"
        title="You should connect your eth wallet first"
        message="Please remember the association between your current btc 
and eth addresses and make sure you don’t forget it before
the game is over
"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import About from "./about.vue";
import Season from "./season.vue";
import MyStake from "./myStake.vue";
import { useAddressStore } from "@/store/address";
import ErrorMsg from "@/components/error-msg.vue";
const errorMsgRef = ref(null);
const Address = useAddressStore();
const route = useRoute();
watch(
  Address.ETHaddress,
  (newVal, oldVal) => {
    console.log(newVal, oldVal, Address.ETHaddress, "newVal, oldVal");
    // if (route.query.from === "JoinGroup" && !Address.ETHaddress) {
    //   errorMsgRef.value.open();
    // }
  },
  { immediate: true }
);
// onMounted(() => {
//   console.log(getAddress(Address.ETHaddress), "Address.ETHaddress");

//   if (route.query.from === "JoinGroup" && !Address.ETHaddress) {
//     errorMsgRef.value.open();
//   }
// });
</script>
<style scoped lang="scss">
.stake {
  height: 1581px;
  background-color: #000;
  color: #fff;
  .w1320 {
    width: 1320px;
    margin: 0 auto;
  }
}
</style>
