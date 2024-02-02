<template>
  <div class="myStake">
    <div class="top">
      <div class="title">MY STAKE</div>
      <div class="wallet" @click="connectETHWallet">
        {{ address ? getAddress(address) : "Connect Wallet" }}
      </div>
    </div>
    <div class="nocontent" v-if="address === ''">
      Please connect your wallet, check the white paper know the rules
    </div>
    <div class="content" v-else>
      <MyTokenList :address="address" />
      <MyStakeList :address="address" />
    </div>
  </div>
</template>

<script setup>
import Web3 from "web3";
import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  watchEffect,
  computed,
} from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import MyTokenList from "./myTokenList.vue";
import MyStakeList from "./myStakeList.vue";
import { getAddress } from "@/utils/Tools";
/**
 * 仓库
 */
const store = useStore();
/**
 * 路由对象
 */
const route = useRoute();
/**
 * 路由实例
 */
const router = useRouter();
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({});
const address = ref("");
const connectETHWallet = async () => {
  if (window.ethAddress) return;
  // this.error = undefined
  if (typeof window.ethereum !== "undefined") {
    const ethereum = await window.ethereum.enable();
    console.log(ethereum, "ethereum");
    const web3 = new Web3(window.ethereum);
    const res = await web3.eth.getAccounts();
    console.log("userAdderss", res);
    if (res.length > 0) {
      window.ethAddress = res[0];
      address.value = res[0];
    } else {
    }
  } else {
    // this.error = "MetaMask not found. Please install MetaMask extension.";
    // console.error("MetaMask not found. Please install MetaMask extension.");
  }
};
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
});
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
});
watchEffect(() => {});
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data),
});
</script>
<style scoped lang="scss">
.myStake {
  padding-top: 60px;
  .top {
    display: flex;
    justify-content: space-between;
    .title {
      font-family: LilitaOne;
      font-size: 40px;
      font-weight: 400;
      line-height: 46px;
    }
    .wallet {
      font-family: LilitaOne;
      font-size: 18px;
      font-weight: 400;
      width: 240px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background: linear-gradient(
        135deg,
        rgba(131, 196, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.1) 100%
      );
      cursor: pointer;
    }
  }
  .nocontent {
    margin-top: 20px;
    height: 300px;
    line-height: 300px;
    text-align: center;
    font-family: LilitaOne;
    font-size: 15px;
    font-weight: 400;
    color: #ffffff;
    background: linear-gradient(
      135deg,
      rgba(131, 196, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
  }
  .content {
    margin-top: 20px;
    height: 400px;
    padding: 30px 15px;
    display: flex;
    justify-content: space-between;
    background: linear-gradient(
      135deg,
      rgba(131, 196, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
  }
}
</style>
