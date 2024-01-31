<template>
  <div class="myTokenList">
    <div class="title">My Token List</div>
    <div class="content">
      <div class="list header">
        <div class="token">Token</div>
        <div class="amount">Amount</div>
        <div class="stakeBalance">Stake Balance</div>
        <div class="availableStatus">Available Status</div>
      </div>
      <div class="lists">
        <div class="list" v-for="(item, index) in walletStakeInfo" :key="index">
          <div class="token">
            {{ item.TokenSymbol }}
          </div>
          <div class="amount">{{ getMoney(item.TokenAmount) }}</div>
          <div class="stakeBalance">{{ getMoney(item.TokenStakeBalance) }}</div>
          <div class="availableStatus">
            <div class="btn" v-if="item.TokenStakeStatus == 1">Go Stake</div>
          </div>
        </div>
      </div>
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
import { getMoney } from "@/utils/Tools.js";
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
.myTokenList {
  width: 680px;
  height: 340px;
  background: linear-gradient(
    135deg,
    rgba(131, 196, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  .title {
    font-family: LilitaOne;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    margin-left: 20px;
    margin-top: -9px;
  }
  .content {
    padding-top: 38px;
    .lists {
      height: 234px;
      overflow-y: scroll;
    }
    .list {
      display: flex;
      justify-content: space-between;
      font-family: LilitaOne;
      font-size: 15px;
      margin-bottom: 24px;
      text-align: center;
      height: 30px;
      line-height: 30px;
      .token {
        width: 140px;
      }
      .amount {
        min-width: 140px;
      }
      .stakeBalance {
        min-width: 140px;
      }
      .availableStatus {
        width: 140px;
        .btn {
          width: 100px;
          margin: 0 auto;
          height: 30px;
          line-height: 24px;
          text-align: center;
          background-color: #a3dc00;
          color: #1b1b1b;
          box-shadow: 4px 4px 0px 0px #000000;
          border-radius: 4px;
          border: 2px solid #000;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
