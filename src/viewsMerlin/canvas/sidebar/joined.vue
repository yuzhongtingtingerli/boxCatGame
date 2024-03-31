<template>
  <div class="joined">
    <Title title="Joined" />
    <div class="list scroll-wrap" v-if="JoinGroupData?.length > 0">
      <div
        class="list-item"
        v-for="item in JoinGroupData"
        :key="item.TokenSymbol"
      >
        <div class="left">
          <div class="img">
            <img width="20px" :src="item.TokenPicture" alt="" srcset="" />
          </div>
          <div class="name">{{ decodeURIComponent(item.TokenSymbol) }}</div>
        </div>
        <div class="score">{{ getMoney(item.TokenBalance) }}</div>
      </div>
    </div>
    <div class="noList" v-else>Not Join Any Group Yet</div>
  </div>
</template>

<script setup>
import Title from "@cps/title";
import { getMoney } from "@/utils/Tools.js";

const props = defineProps({
  JoinGroupData: Array,
});
</script>
<style scoped lang="scss">
.noList {
  height: 66px;
  line-height: 66px;
  font-family: LilitaOne;
  font-size: 13px;
  font-weight: 400;
  text-align: center;
}
.list {
  height: 66px;
  padding-top: 16px;
  padding-right: 7px;
  overflow-y: auto;
  margin-bottom: 10px;
  width: 312px;
  .list-item {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20px;
    width: 290px;
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
