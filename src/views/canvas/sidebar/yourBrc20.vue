<template>
  <div class="YourBrc20">
    <Title title="Your Brc20" />
    <div class="list">
      <div class="list-item" v-for="item in YourBrc" :key="item.ticker">
        <div class="left">
          <div class="img">
            <img width="20px" src="@/assets/money_logo.png" alt="" srcset="" />
          </div>
          <div class="name">{{ item.ticker }}</div>
        </div>
        <div class="score">{{ getMoney(item.availableBalance) }}</div>
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
import Title from "@cps/title";
import { getMoney } from "@/utils/Tools.js";
import { requestWallet, request } from "@/services/request.js";
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
const YourBrc = ref(null);
const address = ref(
  "bc1pegf237syuuqkwfcgn3fkd76c9w5et5lwtdeqma043l2cwn269xtsce750u"
);
const error = ref(null);
const getBrcSummary = async () => {
  // loading.value = true;
  try {
    // 使用封装的 request 方法发起请求
    const data = await requestWallet(
      `https://open-api.unisat.io/v1/indexer/address/${address.value}/brc20/summary`,
      "get"
    );
    YourBrc.value = data.data.detail;
    console.log(YourBrc.value, "YourBrc.value");
  } catch (err) {
    error.value = "请求失败";
  } finally {
    // loading.value = false;
  }
};
const obj = {
  ordi: "https://static.oklink.com/cdn/web3/currency/token/btc-ordi-b61b0172d95e266c18aea0c624db987e971a5d6d4ebc2aaed85da4642d635735i0.png/type=png_350_0?x-oss-process=image/format,webp/resize,w_240,h_240,type_6/ignore-error,1",
  sats: "https://static.oklink.com/cdn/web3/currency/token/btc-sats-9b664bdd6f5ed80d8d88957b63364c41f3ad4efb8eee11366aa16435974d9333i0.png/type=png_350_0?x-oss-process=image/format,webp/resize,w_240,h_240,type_6/ignore-error",
};
const TokenLogo = ref(null);
const getTokenLogo = async () => {
  try {
    // 使用封装的 request 方法发起请求
    const data = await request(`/blockchain/getTokenLogo`, "get");
    console.log(data, "TokenLogo");
    TokenLogo.value = JSON.parse(data);
  } catch (err) {
    error.value = "请求失败";
  } finally {
  }
};
const data = reactive({});
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
});
onMounted(() => {
  getTokenLogo();
  getBrcSummary();
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
.list {
  height: 106px;
  padding-top: 16px;
  padding-right: 7px;
  overflow-y: scroll;
  margin-bottom: 10px;
  .list-item {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20px;
    .left {
      display: flex;
      justify-self: start;
      font-size: 13px;
      font-family: LilitaOne;
      font-weight: 400;
      .img {
        width: 20px;
        margin-right: 6px;
        img {
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    .score {
      font-family: Inter;
      font-size: 10px;
      font-weight: 700;
    }
  }
}
</style>
