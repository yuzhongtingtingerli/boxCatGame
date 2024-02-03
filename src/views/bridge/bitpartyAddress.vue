<script setup>
import { ref, onMounted } from "vue";
const emit = defineEmits(["change"]);
const show = ref(false);
const open = () => {
  show.value = true;
};
const close = () => {
  show.value = false;
};

onMounted(() => {});
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
      <div class="title">To bitparty address</div>
      <div class="desc">it will cost 30 mins</div>
      <div class="sats">
        <div class="txt">sats account</div>
        <div class="txt">to</div>
        <div class="txt">sats group</div>
      </div>
      <div class="sats">
        <div class="txt">amount <span class="amount">0.222</span></div>
        <div class="txt">sats <span class="max">maximum</span></div>
      </div>
      <div class="warn">you should do something first</div>

      <div class="btn" @click="Confirm">Confirm</div>
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
  .desc {
    text-align: center;
    font-family: LilitaOne;
    font-size: 15px;
    margin-top: 20px;
    padding-bottom: 10px;
  }
  .sats {
    font-family: LilitaOne;
    background: #ededed;
    height: 40px;
    padding: 0 22px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    .amount {
      color: rgba(0, 0, 0, 0.2);
      margin-left: 10px;
    }
    .max {
      color: #ffaa08;
      margin-left: 10px;
    }
  }
  .warn {
    font-family: LilitaOne;
    color: #ff4d00;
    margin-top: 8px;
  }
  .btn {
    width: 180px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    margin: 0 auto;
    background: #f6cb37;
    border: 2px solid rgba(0, 0, 0, 1);
    box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
    font-family: LilitaOne;
    font-size: 20px;
    font-weight: 400;
    border-radius: 8px;
    margin-top: 42px;
    cursor: pointer;
  }
}
</style>
