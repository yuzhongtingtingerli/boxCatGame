<template>
  <div class="success-msg" :style="`display: ${isShow ? 'block' : 'none'}`">
    <div class="info">
      <div class="logo">
        <img src="@/assets/cat_ava.png" height="100px" alt="" srcset="" />
      </div>
      <div class="info-content">
        <div class="close" @click="colse">
          <img src="@/assets/close.png" height="24px" alt="" srcset="" />
        </div>
        <div class="title1">successful</div>
        <div class="title2">
          {{
            toUpperCase("You have successfully submitted your transfer request")
          }}
        </div>
        <div class="img">
          <img src="@/assets/successful.png" width="120px" alt="" srcset="" />
        </div>
        <div class="check title2">
          {{ toUpperCase("Check on mempool:") }}
        </div>
        <div class="herf" @click="goTixd">{{ txid }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from "vue";
import { toUpperCase } from "@/utils/Tools";
const isShow = ref(false);
const colse = () => {
  isShow.value = false;
};
const txid = ref("");
const open = (text) => {
  txid.value = text;
  isShow.value = true;
};
const goTixd = () => {
  const url = `https://mempool.space/tx/${txid.value}`;
  window.open(url, "_blank");
};
defineExpose({ open, close });
</script>
<style scoped lang="scss">
.success-msg {
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
    height: 360px;
    z-index: 2;
  }
  .info-content {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    width: 480px;
    height: 360px;
    background-color: #fff;
    border: 3px solid #000000;
    box-shadow: 4px 4px 0px 0px #000000;
    .title1 {
      font-family: LilitaOne;
      font-size: 30px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: center;
      padding-top: 25px;
    }
    .title2 {
      font-family: LilitaOne;
      font-size: 15px;
      font-weight: 400;
      line-height: 17px;
      letter-spacing: 0em;
      text-align: center;
      margin-top: 20px;
    }
    .img {
      text-align: center;
      margin-top: 40px;
    }
    .check {
      margin-top: 40px;
    }
    .herf {
      width: 286px;
      margin: 5px auto;
      // 换行
      word-wrap: break-word;
      word-break: break-all;
      white-space: pre-wrap;
      font-family: LilitaOne;
      font-size: 15px;
      font-weight: 400;
      line-height: 17px;
      letter-spacing: 0em;
      text-align: center;
      // 下划线
      text-decoration: underline;
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
