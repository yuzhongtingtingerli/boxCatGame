<template>
  <div class="checkBook" :style="`display: ${isShow ? 'block' : 'none'}`">
    <div class="info">
      <div class="logo">
        <img src="@/assets/cat_ava.png" height="100px" alt="" srcset="" />
      </div>
      <div class="info-content">
        <div class="close" @click="close">
          <img src="@/assets/close.png" height="24px" alt="" srcset="" />
        </div>
        <div class="title2">Please Add the token smart contract address</div>

        <div class="checkList">
          <div class="id">Smart contract address</div>
          <div class="right">
            <div class="inputId">
              <a-input v-model:value="formValue.address" size="small"></a-input>
            </div>
          </div>
        </div>
        <div class="checkList">
          <div class="id">Token symbol</div>
          <div class="right">
            <div class="inputId">
              <a-input v-model:value="formValue.token" size="small"></a-input>
            </div>
          </div>
        </div>
        <div class="failText">
          <span v-if="status === 'fail'"
            >Wrong smart contract address, check it again</span
          >
        </div>
        <div class="add-btn" @click="handleAdd">Add</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from "vue";
import { checkNftStatusData } from "@/services/index.js";
const emit = defineEmits(["change"]);
const formValue = ref({
  address: "",
  token: "",
});

const isShow = ref(false);
const close = () => {
  isShow.value = false;
};
const open = () => {
  isShow.value = true;
};

const handleAdd = () => {};
defineExpose({ open, close });
</script>
<style>
.checkList {
  .ant-input.css-dev-only-do-not-override-19yxfbp {
    background: none !important;
    border: none;
    font-family: LilitaOne;
    font-size: 15px;
    font-weight: 400;
    text-align: right;
    color: #000;
  }
}
</style>
<style scoped lang="scss">
.checkBook {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  color: #000;
  .info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
    height: 280px;
    z-index: 2;
  }
  .info-content {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    width: 480px;
    height: 280px;
    background-color: #fff;
    border: 3px solid #000000;
    box-shadow: 4px 4px 0px 0px #000000;

    .title2 {
      font-family: LilitaOne;
      font-size: 15px;
      font-weight: 400;
      line-height: 17px;
      letter-spacing: 0em;
      text-transform: capitalize;
      width: 400px;
      margin: 16px auto 0px;
    }

    .checkList {
      width: 420px;
      height: 40px;
      margin: 0 auto;
      padding-right: 4px;
      background-color: #ededed;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: LilitaOne;
      font-size: 15px;
      font-weight: 400;
      line-height: 22px;
      margin-top: 25px;
      .id {
        margin-left: 20px;
      }
      .right {
        display: flex;
        justify-self: start;

        .idText {
          width: 190px;
          overflow: hidden;
        }
      }
    }
    .add-btn {
      width: 180px;
      height: 48px;
      border-radius: 8px;
      border: 2px solid #000;
      font-family: LilitaOne;
      font-size: 20px;
      font-weight: 400;
      line-height: 42px;
      text-align: center;
      box-shadow: 4px 4px 0px 0px #000000;
      margin: 30px auto 0;

      background: #b06ce5;
      cursor: pointer;
    }
  }
  .logo {
    position: absolute;
    top: -90px;
    left: 18px;
    z-index: 1;
  }
  .close {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
  }
}
</style>
