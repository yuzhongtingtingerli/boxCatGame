<template>
  <div class="about">
    <div class="title">Stake BRC20 To EARN BTZ</div>
    <div class="content">
      If you have exchanged your BRC20 for the corresponding ERC20 token through
      our bridge, you can continue to join the pledge and exchange for BTZ
      tokens. To learn about the value and pledge rules of BTZ, please check the
      Whitepaper
    </div>
    <div class="bg"></div>
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
.about {
  height: 403px;
  position: relative;
  .title {
    font-family: LilitaOne;
    font-size: 60px;
    font-weight: 400;
    letter-spacing: 0em;
    text-align: left;
    padding-top: 120px;
  }
  .content {
    font-family: LilitaOne;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0em;
    text-align: left;
    width: 734px;
    margin-top: 12px;
  }
  .bg {
    position: absolute;
    width: 437px;
    height: 396.1px;
    top: 52px;
    right: 32px;
    z-index: 0;
    background-image: url("@/assets/about_bg.png");
  }
}
</style>
