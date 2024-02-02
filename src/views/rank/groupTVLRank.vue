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
          :class="`ordi ${type === porps.GroupName ? 'active' : ''}`"
          @click="getTVL(porps.GroupName)"
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
        <a-pagination v-model:current="current" :total="total" size="small"  @change="handleChange"/>

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
        <a-pagination v-model:current="current" :total="total" size="small"  @change="handleChange"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  watch
} from "vue";
import {
  getGroupScoreRankData,
  getScoreRankData
} from "@/services/index";
import { getMoney, getAddress } from "./../../utils/Tools.js";
const type = ref("total");
const current = ref(1);
const getTVL = (t) => {
  // 将t赋值给type，并实现响应式
  type.value = t;
  getList()
};
const getList = async (page = 1) => {
  current.value = page
  if(type.value === "total"){
    getScoreRank();
  }else{
    getScoreRankGroup();
  }
}
const handleChange = (page, pageSize) => {
  getList(page)
}
const porps = defineProps({
  GroupName: String,
});
watch(() => porps.GroupName, (newValue, oldValue) => {
  if(oldValue){
    type.value = newValue;
    getTVL(newValue)
  }
})
const total = ref(0);

// 获取某个军团的积分排名
const ScoreRankGroup = ref(null);
const getScoreRankGroup = async () => {
  const data = await getGroupScoreRankData({ Offset: current.value, Limit: 10, groupName:porps.GroupName });
  total.value = data.result.TotalListNumber;

  ScoreRankGroup.value = data.result.OwnersInfo;
};
// 获取积分排名
const ScoreRank = ref(null);
const getScoreRank = async () => {
  const data = await getScoreRankData({ Offset: current.value, Limit: 10 });
  ScoreRank.value = data.result.OwnersInfo;
  total.value = data.result.TotalListNumber;
};
onMounted(() => {
  getList()
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
