<template>
  <div class="groupTVLRank">
    <div class="top">
      <div class="title">
        {{ type === "total" ? "Score Rank" : "Group TVL Rank" }}
      </div>
      <div class="taps">
        <div
          :class="`total ${type === 'total' ? 'active' : ''}`"
          @click="getTVL('total')"
        >
          total
        </div>
        <div
          :class="`ordi ${type === 'ordi' ? 'active' : ''}`"
          @click="getTVL('ordi')"
        >
          ordi
        </div>
      </div>
    </div>
    <div class="content">
      <div class="list header">
        <div class="Ranking">Ranking</div>
        <div class="Address">Address</div>
        <div class="TVL">TVL</div>
        <div class="Score">Score</div>
      </div>
      <div class="list" v-for="item in OwnersInfo" :key="item.RankNumber">
        <div class="Ranking">{{ item.RankNumber }}</div>
        <div class="Address">{{ getAddress(item.OwnersAddress) }}</div>
        <div class="TVL">+$ {{ getMoney(item.OwnersTVL) }}</div>
        <div class="Score">{{ getMoney(item.OwnersScore) }}</div>
      </div>
      <a-pagination :total="50" size="small" />
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

const type = ref("total");
const getTVL = (t) => {
  // 将t赋值给type，并实现响应式
  type.value = t;
};
const TotalListNumber = ref(10);
const OwnersInfo = [
  {
    RankNumber: "1",
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "300000.000",
    OwnersScore: "300000.000",
  },
  {
    RankNumber: "2",
    OwnersLogo: "https://127.0.0.1/images/rats.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "200000.000",
    OwnersScore: "300000.000",
  },
  {
    RankNumber: "3",
    OwnersLogo: "https://127.0.0.1/images/sats.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "100000.000",
    OwnersScore: "300000.000",
  },
  {
    RankNumber: "4",
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "300000.000",
    OwnersScore: "300000.000",
  },
  {
    RankNumber: "5",
    OwnersLogo: "https://127.0.0.1/images/rats.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "200000.000",
    OwnersScore: "300000.000",
  },
  {
    RankNumber: "6",
    OwnersLogo: "https://127.0.0.1/images/sats.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "100000.000",
    OwnersScore: "300000.000",
  },
  {
    RankNumber: "7",
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "300000.000",
    OwnersScore: "300000.000",
  },
  {
    RankNumber: "8",
    OwnersLogo: "https://127.0.0.1/images/rats.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "200000.000",
    OwnersScore: "300000.000",
  },
  {
    RankNumber: "9",
    OwnersLogo: "https://127.0.0.1/images/sats.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "100000.000",
    OwnersScore: "300000.000",
  },
  {
    RankNumber: "10",
    OwnersLogo: "https://127.0.0.1/images/sats.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "100000.000",
    OwnersScore: "300000.000",
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
.top {
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  font-family: LilitaOne;
  .title {
    line-height: 40px;
    font-size: 20px;
  }
  .taps {
    width: 207px;
    height: 40px;
    display: flex;
    //垂直居中对齐
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 4px;
    div {
      width: 100px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      color: #ccc;
      font-size: 16px;
      font-weight: 400;
      border-radius: 4px;
      cursor: pointer;
    }
    .active {
      background-color: #000;
      color: #fff;
    }
  }
}
.content {
  margin: 20px;
  .list {
    display: flex;
    justify-content: space-between;
    font-family: LilitaOne;
    font-size: 14px;
    margin-bottom: 20px;
    text-align: center;
    height: 20px;
    .Ranking {
      width: 80px;
    }
    .Address {
      width: 125px;
    }
    .TVL {
      width: 120px;
    }
    .Score {
      width: 120px;
    }
  }
  .header {
    color: #ffaa08;
  }
}
</style>
