<template>
  <div class="bjs">
    <div class="home">
      <div class="left1"></div>
      <div class="left2"></div>
      <div class="right1"></div>
      <div class="right2"></div>
      <div class="left3">
        <div class="title">BIT PARTY</div>
        <div class="description">The First Brc20 Stake To Earn Game</div>
        <div class="list">
          <div class="list-item">
            <div class="text">Powered by brc20 brc30</div>
            <div class="right">></div>
          </div>
          <div class="list-item">
            <div class="text">Stake pool by okx</div>
            <div class="right">></div>
          </div>
          <div class="list-item">
            <div class="top"></div>
            <div class="text">Security by slowmist</div>
            <div class="right">></div>
            <!-- <div class="content">
              Dive into "The Managers," an innovative NFT collection harnessing
              the power of ERC6551 or TokenBound Account (TBA) technology. Your
              NFT isn't just an art piece - it's your wallet. For the first
              time, manage assets directly with your NFT. Curious? Learn more in
              our comprehensive guide on TBAs Start exploring the future of NFTs
              today.（展开的样式占位 具体内容根据安全审计反馈而定）
            </div> -->
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
import { useRoute, useRouter } from "vue-router";
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
.bjs {
  background-color: #000;
}
.home {
  position: relative;
  width: 1440px;
  margin: 0 auto;
  height: 823px;
  overflow: hidden;
  .left1 {
    height: 114px;
    width: 119px;
    position: absolute;
    top: 98px;
    left: 0px;
    background-image: url("@/assets/left1.png");
  }
  .left2 {
    height: 40px;
    width: 51px;
    position: absolute;
    top: 115px;
    left: 127px;
    background-image: url("@/assets/left2.png");
  }
  .right1 {
    height: 478px;
    width: 640px;
    top: 153px;
    right: 53px;
    position: absolute;
    background-image: url("@/assets/right1.png");
    animation: updown 4s ease infinite;
  }
  .right2 {
    height: 114px;
    width: 77px;
    position: absolute;
    top: 462px;
    right: 0px;
    background-image: url("@/assets/right2.png");
  }
  .left3 {
    position: absolute;
    top: 196px;
    left: 98px;
    color: #fff;
    .title {
      font-family: LuckiestGuy;
      font-size: 65px;
      font-weight: 400;
      line-height: 30px;
      letter-spacing: 0em;
      text-align: left;
    }
    .description {
      margin-top: 15px;
      font-family: LilitaOne;
      font-size: 30px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;
    }
    .list {
      margin-top: 60px;
      .list-item {
        display: flex;
        justify-content: space-between;
        padding-left: 20px;
        padding-right: 40px;
        width: 500px;
        height: 60px;
        line-height: 60px;
        margin-bottom: 16px;
        font-family: LilitaOne;
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0em;
        text-align: left;
        cursor: pointer;
        background: linear-gradient(
          135deg,
          rgba(131, 196, 255, 0.2) 0%,
          rgba(255, 255, 255, 0.2) 100%
        );
      }
    }
  }
  /* 定义动画 */
  @keyframes updown {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-50px);
    }
    100% {
      transform: translateY(0);
    }
  }
}
</style>
