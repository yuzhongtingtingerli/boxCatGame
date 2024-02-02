<template>
  <div class="myStakeList" v-if="SakeList">
    <div class="top">
      <div class="myScore">
        <div class="mean">My Total Score</div>
        <div class="num">{{ getMoney(SakeList.TotalScore) }}</div>
      </div>
      <div class="myTotal">
        <div class="mean">My Total TVL</div>
        <div class="num">{{ getMoney(SakeList.TotalTVL) }} BTC</div>
      </div>
      <div class="time" v-if="treasureData.TimeTreasure == 1">
        <div class="stake1"></div>
        <div class="stake2"></div>
        <div class="text">Time Treasure</div>
      </div>
      <div class="score" v-if="treasureData.ScoreTreasure == 1">
        <div class="stake1"></div>
        <div class="stake2"></div>
        <div class="text">Score Treasure</div>
      </div>
    </div>
    <div class="nomain" v-if="StakeInfo?.length === 0">Empty</div>
    <div class="main" v-else>
      <div class="title">My Stake List</div>
      <div class="content">
        <div class="list header">
          <div class="token">Token</div>
          <div class="amount">Amount</div>
          <div class="stakeBalance">Total Score</div>
          <div class="availableStatus">Day Score</div>
        </div>
        <div class="lists">
          <div class="list" v-for="(item, index) in StakeInfo" :key="index">
            <div class="token">
              {{ item.TokenSymbol }}
            </div>
            <div class="amount">{{ getMoney(item.TokenAmount) }}</div>
            <div class="stakeBalance">
              {{ getMoney(item.TotalScore) }}
            </div>
            <div class="availableStatus">
              {{ getMoney(item.DailyScore) }}
            </div>
          </div>
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
import { getMoney } from "@/utils/Tools.js";
import { getSakeListData, getTreasureData } from "@/services/index";
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
const props = defineProps({
  address: String,
});
const SakeList = ref(null);
const StakeInfo = ref(null);
const getSakeList = async () => {
  const res = await getSakeListData({ UserAddress: props.address });
  SakeList.value = res.result;
  StakeInfo.value = res.result.StakeInfo;
};
const treasureData = ref(null);
const getTreasure = async () => {
  const res = await getTreasureData({ UserAddress: props.address });
  treasureData.value = res.result;
};
// const treasureData = {
//   TimeTreasure: "1",
//   ScoreTreasure: "1",
// };
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
});
onMounted(() => {
  getSakeList();
  getTreasure();
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
.myStakeList {
  width: 570px;
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    margin-top: 10px;
    .myScore,
    .myTotal {
      width: 143px;
      margin-right: 34px;
      .mean {
        font-family: LilitaOne;
        font-size: 13px;
        font-weight: 400;
        line-height: 15px;
        letter-spacing: 0em;
        text-align: left;
        margin-bottom: 7px;
      }
      .num {
        font-family: LilitaOne;
        font-size: 20px;
        font-weight: 400;
        line-height: 23px;
        letter-spacing: 0em;
        text-align: left;
        color: #ffc500;
      }
    }
    .time,
    .score {
      position: relative;
      width: 80px;
      height: 80px;
      background: linear-gradient(
        135deg,
        rgba(131, 196, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.1) 100%
      );

      .stake1 {
        position: absolute;
        top: -5px;
        right: -7px;
        width: 54px;
        height: 55px;
        background-image: url("@/assets/stake2.png");
      }
      .stake2 {
        position: absolute;
        top: 9px;
        left: 9px;
        width: 50px;
        height: 51px;
        background-image: url("@/assets/stake1.png");
      }
      .text {
        position: absolute;
        bottom: 6px;
        left: 6px;
        font-family: LilitaOne;
        font-size: 10px;
        font-weight: 400;
        line-height: 11px;
        letter-spacing: 0em;
        text-align: left;
      }
    }
  }
  .nomain {
    height: 200px;
    line-height: 200px;
    text-align: center;
    font-family: LilitaOne;
    font-size: 15px;
    font-weight: 400;
  }
  .main {
    height: 200px;
    position: relative;
    background: linear-gradient(
      135deg,
      rgba(131, 196, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
    .title {
      position: absolute;
      left: 20px;
      top: -9px;
      font-family: LilitaOne;
      font-size: 20px;
      font-weight: 400;
      line-height: 23px;
      letter-spacing: 0em;
      text-align: left;
    }
    .content {
      padding-top: 34px;
      .lists {
        height: 118px;
        overflow-y: scroll;
      }
      .list {
        display: flex;
        justify-content: space-between;
        font-family: LilitaOne;
        font-size: 15px;
        margin-bottom: 10px;
        text-align: center;
        height: 22px;
        line-height: 22px;
        .token {
          min-width: 60px;
        }
        .amount {
          min-width: 100px;
        }
        .stakeBalance {
          min-width: 100px;
        }
        .availableStatus {
          min-width: 140px;
        }
      }
    }
  }
}
</style>
