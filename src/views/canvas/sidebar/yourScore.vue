<template>
  <div class="YourScore">
    <div class="left">
      <Title title="Your Score" />
      <div class="PersonalTotalScore">{{ ScoreData?.PersonalTotalScore }}</div>
      <div class="PersonalTotalTVL">
        TVL(BTC)：{{ ScoreData?.PersonalTotalTVL }}
      </div>
    </div>
    <div class="right" v-if="nftScoreData?.TotalListNumber > 0">
      <div class="books">
        <div class="red" v-if="nftScoreData.Initiative">
          <div class="top">
            <img
              src="@/assets/available-books.png"
              width="28px"
              alt=""
              srcset=""
            />
            <div class="num">{{ nftScoreData.Initiative.NftNumber }}</div>
          </div>
          <div class="bottom">+{{ nftScoreData.Initiative.NftScore }}</div>
        </div>
        <div class="yellow" v-if="nftScoreData.Passive">
          <div class="top">
            <img
              src="@/assets/available-books.png"
              width="28px"
              alt=""
              srcset=""
            />
            <div class="num">{{ nftScoreData.Passive.NftNumber }}</div>
          </div>
          <div class="bottom">+{{ nftScoreData.Passive.NftScore }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Title from "@cps/title";
const props = defineProps({
  ScoreData: Object,
  nftScoreData: Object,
});
</script>
<style scoped lang="scss">
.YourScore {
  height: 102px;
  display: flex;
  justify-content: space-between;
  .books {
    display: flex;
    justify-content: space-between;
    // width: 112px;
    .top {
      width: 44px;
      height: 34px;
      padding: 3px 3px 2px 0px;
      gap: 2px;
      border-radius: 2px;
      display: flex;
      align-items: center;
    }
    .red .top {
      border: 2px solid #ff783f;
    }
    .yellow .top {
      border: 2px solid #ffc500;
      margin-left: 20px;
    }
    .num {
      height: 28px;
      display: flex;
      flex-direction: column; /* 设置主轴为垂直方向 */
      justify-content: flex-end; /* 子元素向下对齐 */
      font-family: LilitaOne;
      font-size: 8px;
      font-weight: 400;
      line-height: 8px;
      text-align: right;
      text-shadow: 0 1px #000, 1px 0 #000, -1px 0 #000, 0 -1px #000;
      color: #fff;
    }
    .bottom {
      font-family: Poppins;
      font-size: 12px;
      font-weight: 700;
      line-height: 18px;
      text-align: center;
      color: #ffc500;
      text-shadow: 0 1px #000, 1px 0 #000, -1px 0 #000, 0 -1px #000;
    }
  }
  .PersonalTotalScore {
    text-align: left;
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
    text-align: left;
    margin-top: 6px;
  }
}
</style>
