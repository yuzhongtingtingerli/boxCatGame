<template>
  <div class="bridge">
    <div class="w1140">
      <Guidelines />
      <div>
        <Network @refresh="isSuccess" />
        <MyRecord ref="myRecordRef" />
      </div>
    </div>
    <ErrorInfo ref="errorInfoRef" />
  </div>
</template>

<script setup>
import Guidelines from "./guidelines.vue";
import Network from "./network.vue";
import MyRecord from "./myRecord.vue";

import { onMounted, ref } from "vue";
import { checkRuningStatus } from "@/services/api.js";
import ErrorInfo from "@/components/error-info.vue";
const errorInfoRef = ref(null);
const isShowError = () => {
  errorInfoRef.value.open(
    "The journey will begin soon, wish you good luck ！",
    "infinite"
  );
};
const myRecordRef = ref(null);
const isSuccess = async () => {
  myRecordRef.value.refreshBridgeList();
};
const checkRuning = async () => {
  // if (window.location.origin.indexOf("www.bitparty.tech") !== -1) {
  //   isShowError(
  //     "The journey will begin soon, wish you good luck ！",
  //     "infinite"
  //   );
  //   return;
  // }
  const res = await checkRuningStatus();
  if (res.result.RunningStatus <= 1) {
    isShowError();
  }
};
// console.log(ErrorCodes);
onMounted(() => {
  checkRuning();
});
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
