<template>
  <div class="myStake">
    <div class="top">
      <div class="title">MY STAKE</div>
      <div class="wallet">Connect Wallet</div>
    </div>
    <div class="nocontent" v-if="walletStakeInfo.length === 0 && !SakeList">
      Please connect your wallet, check the white paper know the rules
    </div>
    <div class="content" v-else>
      <MyTokenList />
      <MyStakeList />
    </div>
  </div>
</template>

<script setup>
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
const walletStakeInfo = [
  {
    TokenSymbol: "sats",
    TokenAmount: "888888888.000",
    TokenStakeBalance: "88888888.000",
    TokenStakeStatus: "1",
  },
  {
    TokenSymbol: "rats",
    TokenAmount: "888888888.000",
    TokenStakeBalance: "0.000000",
    TokenStakeStatus: "0",
  },
];
const SakeList = {
  TotalScore: "888888888",
  TotalTVL: "8.000000",
  TotalListNumber: "10",
  BridgeInfo: [
    {
      TokenSymbol: "sats",
      TokenAmount: "888888888",
      TotalScore: "888888888",
      DailyScore: "8888888",
    },
    {
      TokenSymbol: "ordi",
      TokenAmount: "888888888",
      TotalScore: "888888888",
      DailyScore: "8888888",
    },
  ],
};
const treasureData = {
  TimeTreasure: "1",
  ScoreTreasure: "1",
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
