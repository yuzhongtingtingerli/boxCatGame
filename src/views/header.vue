<template>
  <div :class="`bjs ${currentRoute === '/rank' ? 'yellow' : 'black'}`">
    <div class="header">
      <div class="left">
        <div class="title">
          <router-link to="/">BIT PARTY</router-link>
        </div>
        <div class="menu">
          <router-link :class="getCurrentRoute('/map')" to="/map"
            >Map</router-link
          >
          <router-link :class="getCurrentRoute('/rank')" to="/rank"
            >Rank</router-link
          >
          <router-link to="/">Bridge</router-link>
          <router-link to="/">Stake</router-link>
          <router-link to="/">Whitepaper</router-link>
          <router-link to="/">Safe And Privacy</router-link>
        </div>
      </div>
      <div class="Wallet" @click="connectWallet">Connect Wallet</div>
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
  // 链接钱包
  try {
    let unisat = window.unisat;
    const accounts = await unisat?.requestAccounts();
    console.log("connect success", accounts);
    // this.setAccount(accounts[0]);
    // this.subscribeProvider();
  } catch (error) {
    // ElMessage({
    //   message: $t('base.11'),
    //   type: 'error'
    // });
  }
};
const data = reactive({});
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
});
onMounted(() => {
  getBrc20List();
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
