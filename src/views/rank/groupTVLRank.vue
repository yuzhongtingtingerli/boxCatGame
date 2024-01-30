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
          {{ GroupName }}
        </div>
      </div>
    </div>
    <div class="content">
      <div class="header">
        <div class="Ranking">Ranking</div>
        <div class="Address">Address</div>
        <div class="TVL">TVL</div>
        <div class="Score">Score</div>
      </div>
      <template v-if="type === 'total'">
        <div class="list">
          <div
            class="list-item"
            v-for="(item, index) in ScoreRank"
            :key="item.RankNumber"
          >
            <div class="Ranking">
              {{ item.RankNumber ? item.RankNumber : index + 1 }}
            </div>
            <div class="Address">
              <div class="img">
                <img width="20px" :src="item.OwnersLogo" alt="" srcset="" />
              </div>
              <div class="text">{{ getAddress(item.OwnersAddress) }}</div>
            </div>
            <div class="TVL">+$ {{ getMoney(item.OwnersTVL) }}</div>
            <div class="Score">{{ getMoney(item.OwnersScore) }}</div>
          </div>
        </div>
        <a-pagination :total="50" size="small" />
      </template>
      <template v-else>
        <div class="list">
          <div
            class="list-item"
            v-for="(item, index) in ScoreRankGroup"
            :key="item.RankNumber"
          >
            <div class="Ranking">
              {{ item.RankNumber ? item.RankNumber : index + 1 }}
            </div>
            <div class="Address">
              <div class="img">
                <img width="20px" :src="item.OwnersLogo" alt="" srcset="" />
              </div>
              <div class="text">{{ getAddress(item.OwnersAddress) }}</div>
            </div>
            <div class="TVL">+$ {{ getMoney(item.OwnersTVL) }}</div>
            <div class="Score">{{ getMoney(item.OwnersScore) }}</div>
          </div>
        </div>
        <a-pagination :total="50" size="small" />
      </template>
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
const props = defineProps({
  ScoreRankGroup: Array,
  ScoreRank: Array,
  GroupName: String,
});
const type = ref("");
const ScoreRankData = ref(null);
const getTVL = (t) => {
  // 将t赋值给type，并实现响应式
  type.value = t;
};
const TotalListNumber = ref(10);

const data = reactive({});
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
});
onMounted(() => {
  getTVL("total");
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
  margin: 20px 20px 0;
  .list {
    height: 380px;
  }
  .list-item,
  .header {
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
      display: flex;
      justify-content: center;
      .img {
        margin-right: 2px;
      }
    }
    .TVL {
      width: 120px;
    }
    .Score {
      width: 120px;
    }
  }
  .header {
    height: 20px;
    color: #ffaa08;
  }
}
</style>
