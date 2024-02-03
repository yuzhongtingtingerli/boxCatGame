<template>
  <div class="YourScore">
    <Title title="Your Score" />
    <div class="PersonalTotalScore">{{ ScoreData?.PersonalTotalScore }}</div>
    <div class="PersonalTotalTVL">TVL: ${{ ScoreData?.PersonalTotalTVL }}</div>
  </div>
</template>

<script setup>
import Title from "@cps/title";
const props = defineProps({
  ScoreData: Object,
});
</script>
<style scoped lang="scss">
.YourScore {
  height: 102px;
  .PersonalTotalScore {
    text-align: center;
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
    text-align: center;
    margin-top: 6px;
  }
}
</style>
