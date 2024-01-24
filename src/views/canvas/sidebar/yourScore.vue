<template>
  <div class="YourScore">
    <Title title="Your Score" />
    <div class="PersonalTotalScore">{{ YourScore.PersonalTotalScore }}</div>
    <div class="PersonalTotalTVL">TVL: ${{ YourScore.PersonalTotalTVL }}</div>
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
const YourScore = {
  PersonalTotalScore: "65478998",
  PersonalTotalTVL: "3000.000",
};
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
.YourScore {
  height: 102px;
  .PersonalTotalScore {
    text-align: center;
    font-family: Poppins;
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
    letter-spacing: 0em;
    color: #ffc500;
    text-shadow: 0 3px #000, 3px 0 #000, -1px 0 #000, 0 -1px #000;
    margin-top: 10px;
  }
  .PersonalTotalTVL {
    font-family: Inter;
    font-size: 10px;
    font-weight: 700;
    line-height: 12px;
    letter-spacing: 0em;
    text-align: center;
    margin-top: 6px;
  }
}
</style>
