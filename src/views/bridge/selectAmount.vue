<script setup>
import { getTransferableInscriptionsData } from "@/services/wallet.js";

import { ref } from "vue";
const emit = defineEmits(["change"]);
const show = ref(false);
const open = (address, ticker) => {
  getTransferableInscriptions(address, ticker);
  show.value = true;
};
const close = () => {
  show.value = false;
};
const inscriptionsData = ref(null);
const getTransferableInscriptions = async (address, ticker) => {
  const res = await getTransferableInscriptionsData({ address, ticker });
  inscriptionsData.value = res.data.detail;
};
const amount = ref();
const getAmount = (item) => {
  if (item) {
    amount.value = item;
    // emit("change", item);
    // close();
  }
};
defineExpose({ open, close });
</script>

<template>
  <a-modal
    v-model:open="show"
    title=""
    :footer="null"
    :maskClosable="false"
    @ok="close"
    :closable="false"
    width="480px"
  >
    <div class="modal_style">
      <img class="head-img" src="@/assets/cat_ava.png" />
      <div class="close" @click="close">
        <img src="@/assets/close.png" alt="" srcset="" />
      </div>
      <div class="title">Select Amount</div>
      <div class="active" v-if="amount?.data">
        {{ amount.data.tick }}
        {{ amount.data.amt }}
      </div>
      <div class="list" style="margin-top: 20px">
        <div
          class="list-item"
          v-for="item in inscriptionsData"
          :key="item.inscriptionId"
          @click="getAmount(item)"
        >
          <span
            >{{ item.data.tick }} - {{ item.data.amt }} - #{{
              item.inscriptionNumber
            }}</span
          >
        </div>
      </div>
    </div>
  </a-modal>
</template>

<style scoped lang="scss">
.modal_style {
  position: relative;
  .head-img {
    position: absolute;
    left: -16px;
    top: -114px;
    width: 110px;
  }
  .close {
    position: absolute;
    right: -16px;
    top: -14px;
  }

  .title {
    text-align: center;
    font-family: LilitaOne;
    font-size: 30px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
  }
}
</style>
<style></style>
