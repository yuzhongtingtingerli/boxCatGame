<template>
  <div class="rank">
    <div class="corpsRanking">
      <CorpsRanking />
    </div>
    <div class="middle">
      <div class="hoursTVL">
        <HoursTVL />
      </div>
      <div class="groupTVLRank">
        <GroupTVLRank />
      </div>
    </div>
    <div class="newScore">
      <NewScore />
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

import CorpsRanking from "./rank/corpsRanking.vue";
import GroupTVLRank from "./rank/groupTVLRank.vue";
import HoursTVL from "./rank/hoursTVL.vue";
import NewScore from "./rank/newScore.vue";

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
// 两边固定中间自适应
.rank {
  display: flex;
  justify-content: space-between;
  width: 1400px;
  margin: 0 auto;
  div {
    border-radius: 8px;
    font-size: 13px;
    color: #fff;
  }
}
.corpsRanking {
  width: 320px;
  height: 720px;
  background-color: #000;
}
.middle {
  height: 720px;
  width: 680px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .hoursTVL {
    height: 188px;
    background-color: #000;
  }
  .groupTVLRank {
    height: 520px;
    background-color: #000;
  }
}
.newScore {
  width: 380px;
  height: 720px;
  background-color: #000;
}
</style>
