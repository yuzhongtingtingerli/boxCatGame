<template>
  <div class="joined">
    <Title title="Joined" />
    <div class="list">
      <div
        class="list-item"
        v-for="item in JoinGroupData"
        :key="item.TokenSymbol"
      >
        <div class="left">
          <div class="img">
            <img width="20px" :src="item.TokenPicture" alt="" srcset="" />
          </div>
          <div class="name">{{ item.TokenSymbol }}</div>
        </div>
        <div class="score">{{ getMoney(item.TokenBalance) }}</div>
      </div>
    </div>
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
