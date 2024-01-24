<template>
  <div class="hoursTVL">
    <div class="top">
      <div class="title">24 hours TVL</div>
      <div class="taps">
        <div
          :class="`group ${type === 'group' ? 'active' : ''}`"
          @click="getTVL('group')"
        >
          Group
        </div>
        <div
          :class="`individual ${type === 'individual' ? 'active' : ''}`"
          @click="getTVL('individual')"
        >
          individual
        </div>
      </div>
    </div>
    <div class="content">
      <div class="groupInfo" v-if="type === 'group'">
        <div
          class="list"
          v-for="item in GroupTVLRankData"
          :key="item.GroupName"
        >
          <div class="left">
            <div class="img">
              <img width="22px" src="@/assets/cat_ava.png" alt="" srcset="" />
            </div>
            <div class="name">{{ item.GroupName }} Group</div>
          </div>
          <div class="svl">+$ {{ getMoney(item.GroupTVL) }}</div>
        </div>
      </div>
      <div class="ownersInfo" v-if="type === 'individual'">
        <div
          class="list"
          v-for="item in PersonalTVLRank"
          :key="item.OwnersAddress"
        >
          <div class="left">
            <div class="img">
              <img width="20px" :src="item.OwnersLogo" alt="" srcset="" />
            </div>
            <div class="name">
              {{ getAddress(item.OwnersAddress) }}
            </div>
          </div>
          <div class="svl">+$ {{ getMoney(item.OwnersTVL) }}</div>
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
const type = ref("group");
const getTVL = (t) => {
  // 将t赋值给type，并实现响应式
  type.value = t;
};
const GroupInfo = [
  {
    GroupName: "ordi",
    GroupTVL: "300000.000",
  },
  {
    GroupName: "rats",
    GroupTVL: "200000.000",
  },
  {
    GroupName: "sats",
    GroupTVL: "100000.000",
  },
];
const OwnersInfo = [
  {
    OwnersLogo: "https://127.0.0.1/images/ordi.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta",
    OwnersTVL: "300000.000",
  },
  {
    OwnersLogo: "https://127.0.0.1/images/rats.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta",
    OwnersTVL: "200000.000",
  },
  {
    OwnersLogo: "https://127.0.0.1/images/sats.png",
    OwnersAddress:
      "bc1ph904vma5ma6decqu60d5ff47hqr6eud2erldlhllv0xnqp46hmpqznrdta", //（前四字符+六个省略符号+后四字符）
    OwnersTVL: "100000.000",
  },
];
const porps = defineProps({
  GroupTVLRankData: Array,
  PersonalTVLRank: Array,
});
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
});
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
});
watchEffect(() => {});
// 使用toRefs解构
// let { } = { ...toRefs(data) }
const data = reactive({});

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
  margin-top: 20px;
  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    margin-right: 36px;
    font-family: LilitaOne;
    line-height: 32px;
    margin-bottom: 8px;
    .left {
      display: flex;
      justify-self: start;
      .img {
        width: 20px;
        margin-left: 20px;
        margin-right: 2px;
      }
    }
  }
}
</style>
