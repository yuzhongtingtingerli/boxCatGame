<template>
  <div class="YourBrc20">
    <Title title="Your Brc20" />
    <div class="list">
      <div class="list-item" v-for="item in YourBrc" :key="item.ticker">
        <div class="left">
          <div class="img">
            <img
              v-if="TokenLogo && getLogo(item.ticker)"
              width="20px"
              :src="getLogo(item.ticker)"
              alt=""
              srcset=""
            />
            <div class="logo" v-else>{{ getFirstLetter(item.ticker) }}</div>
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
import { requestWallet } from "@/services/request.js";
import { getTokenLogoData } from "@/services/index.js";
import { getBrc20SummaryData } from "@/services/wallet.js";
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
// const error = ref(null);
const getBrcSummary = async () => {
  const data = await getBrc20SummaryData(address.value);
  YourBrc.value = data.data.detail;
};

const TokenLogo = ref(null);
const getTokenLogo = async () => {
  const data = await getTokenLogoData();
  TokenLogo.value = data.result;
};
const getLogo = (ticker) => {
  if (ticker in TokenLogo.value) return TokenLogo.value[ticker];
  return false;
};
const getFirstLetter = (ticker) => {
  return ticker.split("")[0];
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
        .logo {
          width: 20px;
          height: 20px;
          border-radius: 10px;
          background-color: #000;
          color: #fff;
          line-height: 18px;
          text-align: center;
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
