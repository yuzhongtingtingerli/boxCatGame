<template>
  <div class="joined">
    <Title title="Joined" />
    <div class="list">
      <div class="list-item" v-for="item in YourBrc" :key="item.name">
        <div class="left">
          <div class="img">
            <img width="20px" src="@/assets/money_logo.png" alt="" srcset="" />
          </div>
          <div class="name">{{ item.name }}</div>
        </div>
        <div class="score">{{ getMoney(item.score) }}</div>
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
const YourBrc = [
  {
    img: "",
    name: "sats",
    score: "4000.000",
  },
  {
    img: "",
    name: "sats2",
    score: "4000.000",
  },
  {
    img: "",
    name: "sats3",
    score: "4000.000",
  },
  {
    img: "",
    name: "sats4",
    score: "4000.000",
  },
  {
    img: "",
    name: "sats5",
    score: "4000.000",
  },
];
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
.list {
  height: 66px;
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
        // width: 20px;
        margin-right: 6px;
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
