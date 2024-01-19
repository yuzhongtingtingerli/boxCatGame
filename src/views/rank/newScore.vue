<template>
  <div class="newScore">
    <div class="title">new score</div>
    <div class="content">
      <div class="list header">
        <div class="Address">Address</div>
        <div class="TVL">TVL</div>
        <div class="Time">Time</div>
      </div>
      <div class="list" v-for="(item, index) in OwnersScore" :key="index">
        <div class="Address">{{ getAddress(item.OwnersAddress) }}</div>
        <div class="TVL">+$ {{ getMoney(item.OwnersTVL) }}</div>
        <div class="Time">{{ getMoney(item.OwnersTime) }}</div>
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
import { getMoney, getAddress } from "./../../utils/Tools.js";
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
const OwnersScore = [
  {
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "300000.000",
    OwnersTime: "5min ago",
  },
  {
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "300000.000",
    OwnersTime: "5min ago",
  },
  {
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "300000.000",
    OwnersTime: "5min ago",
  },
  {
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "300000.000",
    OwnersTime: "5min ago",
  },
  {
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "300000.000",
    OwnersTime: "5min ago",
  },
  {
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "300000.000",
    OwnersTime: "5min ago",
  },
  {
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "300000.000",
    OwnersTime: "5min ago",
  },
  {
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "300000.000",
    OwnersTime: "5min ago",
  },
  {
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "300000.000",
    OwnersTime: "5min ago",
  },
  {
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "300000.000",
    OwnersTime: "5min ago",
  },
  {
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "300000.000",
    OwnersTime: "5min ago",
  },
  {
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "300000.000",
    OwnersTime: "5min ago",
  },
  {
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "300000.000",
    OwnersTime: "5min ago",
  },
  {
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "300000.000",
    OwnersTime: "5min ago",
  },
  {
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "300000.000",
    OwnersTime: "5min ago",
  },
  {
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "300000.000",
    OwnersTime: "5min ago",
  },
  {
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "300000.000",
    OwnersTime: "5min ago",
  },
];
defineExpose({
  ...toRefs(data),
});
</script>
<style scoped lang="scss">
.title {
  font-size: 20px;
  font-family: LilitaOne;
  padding: 20px;
}
.content {
  margin: 0 10px;
  .list {
    display: flex;
    justify-content: space-between;
    font-family: LilitaOne;
    font-size: 14px;
    margin-bottom: 16px;
    text-align: center;
    height: 20px;
    .Address {
      width: 125px;
    }
    .TVL {
      width: 120px;
    }
    .Time {
      width: 120px;
    }
  }
  .header {
    color: #ffaa08;
  }
}
</style>
