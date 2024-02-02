<template>
  <div :class="`bjs ${currentRoute === '/rank' ? 'yellow' : 'black'}`">
    <div class="header">
      <div class="left">
        <div class="title">
          <img src="@/assets/Union.png" style="margin-right: 12px" alt="" />
          <router-link to="/">BIT PARTY</router-link>
        </div>
        <div class="menu">
          <router-link :class="getCurrentRoute('/map')" to="/map"
            >Map</router-link
          >
          <router-link :class="getCurrentRoute('/rank')" to="/rank"
            >Rank</router-link
          >
          <router-link :class="getCurrentRoute('/bridge')" to="/bridge"
            >Bridge</router-link
          >
          <router-link :class="getCurrentRoute('/stake')" to="/stake"
            >Stake</router-link
          >
          <router-link to="/">Whitepaper</router-link>
          <router-link to="/">Safe And Privacy</router-link>
        </div>
      </div>
      <div class="Wallet" @click="connectWallet">
        {{ address === "" ? "Connect Wallet" : getAddress(address) }}
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
import { requestWallet } from "@/services/request.js";
import { getAddress, getUniSatAddress } from "@/utils/Tools";
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
//  https://open-api.unisat.io/v1/indexer/brc20/list
const address = ref("");
const getBrc20List = async () => {
  // loading.value = true;
  try {
    // 使用封装的 request 方法发起请求
    const data = await requestWallet(
      `https://open-api.unisat.io/v1/indexer/brc20/list`,
      "get"
    );
    console.log(data, "getBrc20List");
  } catch (err) {
    error.value = "请求失败";
  } finally {
    // loading.value = false;
  }
};
// const address = ref(
//   "bc1pegf237syuuqkwfcgn3fkd76c9w5et5lwtdeqma043l2cwn269xtsce750u"
// );
// const getBrcSummary = async () => {
//   // loading.value = true;
//   try {
//     // 使用封装的 request 方法发起请求
//     const data = await requestWallet(
//       `https://open-api.unisat.io/v1/indexer/address/${address.value}/brc20/summary`,
//       "get"
//     );
//     console.log(data, "getBrcSummary");
//   } catch (err) {
//     error.value = "请求失败";
//   } finally {
//     // loading.value = false;
//   }
// };
// https://open-api.unisat.io/v1/indexer/address/{address}/brc20/{ticker}/info
//
let currentRoute = computed(() => router.currentRoute.value.path);
const getCurrentRoute = (path) => {
  if (currentRoute.value === path) return "active";
  return "";
};
const connectWallet = async () => {
  // 没有钱包就跳转
  if (!window.unisat) {
    console.log("UniSat Wallet is installed!");
    window.open("https://unisat.io/");
    return;
  }
  if (window.address) return;
  // 链接钱包
  try {
    getUniSatAddressData();
    // let res = await unisat?.getInscriptions(0, 10);
    // console.log(res, "rrr");
    // this.setAccount(accounts[0]);
    // this.subscribeProvider();
  } catch (error) {
    // ElMessage({
    //   message: $t('base.11'),
    //   type: 'error'
    // });
  }
};
const getUniSatAddressData = async () => {
  const addr = await getUniSatAddress();
  address.value = addr;
  window.address = addr;
};
const data = reactive({});
onBeforeMount(() => {
  getUniSatAddressData();
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
});
onMounted(() => {
  // getBrc20List();
  // getBrcSummary();
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
.yellow {
  background-color: #fccd37;
  color: #000;
  .menu {
    a {
      font-family: LilitaOne;
      font-size: 16px;
      margin-right: 38.6px;
      color: #000;
    }
    .active {
      color: #fff;
    }
  }
  .title {
    a {
      color: #000;
    }
  }
}
.black {
  background: #000;
  color: #fff;
  .menu {
    a {
      font-family: LilitaOne;
      font-size: 16px;
      margin-right: 38.6px;
      color: #fff;
    }
    .active {
      color: #fccd37;
    }
  }
  .title {
    a {
      color: #fff;
    }
  }
}
.bjs {
  height: 60px;
}
.header {
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  width: 1400px;
  margin: 0 auto;
  .left {
    display: flex;
    justify-self: start;
    .title {
      font-family: LuckiestGuy;
      font-size: 30px;
      width: 210px;
      text-align: center;
      margin-right: 80px;
      color: #000;
    }
  }
  .Wallet {
    width: 155px;
    height: 40px;
    line-height: 40px;
    font-family: LilitaOne;
    font-size: 16px;
    text-align: center;
    background-color: #fff;
    color: #000;
    border: 2px solid #000;
    border-radius: 4px;
    box-shadow: 2px 2px 0 #000;
    margin-top: 10px;
  }
}
</style>
