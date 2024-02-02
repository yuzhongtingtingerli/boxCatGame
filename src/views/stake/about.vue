<template>
  <div class="about">
    <div class="title">Stake BRC20 To EARN BTZ</div>
    <div class="content">
      If you have exchanged your BRC20 for the corresponding ERC20 token through
      our bridge, you can continue to join the pledge and exchange for BTZ
      tokens. To learn about the value and pledge rules of BTZ, please check the
      Whitepaper
    </div>
    <div class="bg"></div>
  </div>
</template>

<script setup>
</script>
<style scoped lang="scss">
.about {
  height: 403px;
  position: relative;
  .title {
    font-family: LilitaOne;
    font-size: 60px;
    font-weight: 400;
    letter-spacing: 0em;
    text-align: left;
    padding-top: 120px;
  }
  .content {
    font-family: LilitaOne;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0em;
    text-align: left;
    width: 734px;
    margin-top: 12px;
  }
  .bg {
    position: absolute;
    width: 437px;
    height: 396.1px;
    top: 52px;
    right: 32px;
    z-index: 0;
    background-image: url("@/assets/about_bg.png");
  }
}
</style>
