<template>
  <div class="bg" id="rankBg">
    <div class="rank">
      <div class="corpsRanking">
        <CorpsRanking
          :groupListData="groupListData"
          :groupListTotal="groupListTotal"
          @group-search="getScoreRankGroup"
          :GroupName="GroupName"
        />
      </div>
      <div class="middle">
        <div class="hoursTVL">
          <HoursTVL
            :GroupTVLRankData="GroupTVLRankData"
            :GroupTVLRankTotal="GroupTVLRankTotal"
            :PersonalTVLRank="PersonalTVLRank"
            :PersonalTVLRankTotal="PersonalTVLRankTotal"
          />
        </div>
        <div class="groupTVLRank">
          <GroupTVLRank
            :ScoreRankGroup="ScoreRankGroup"
            :ScoreRank="ScoreRank"
            :GroupName="GroupName"
          />
        </div>
      </div>
      <div class="newScore">
        <NewScore :LastScoreRank="LastScoreRank" />
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

import CorpsRanking from "./corpsRanking.vue";
import GroupTVLRank from "./groupTVLRank.vue";
import HoursTVL from "./hoursTVL.vue";
import NewScore from "./newScore.vue";
import {
  getGroupListData,
  getGroupScoreRankData,
  getScoreRankData,
  getGroupTVLRankData,
  getPersonalTVLRankData,
  getLastScoreRankData,
} from "@/services/index";
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
// const loading = ref(false);
const error = ref(null);
// 获取军团列表
const groupListData = ref(null);
const groupListTotal = ref(0);
const GroupName = ref("");
const getGroupList = async () => {
  const data = await getGroupListData({ Offset: 1, Limit: 10 });
  groupListData.value = data.result.GroupInfo;
  groupListTotal.value = data.result.TotalListNumber;
  getScoreRankGroup(data.result.GroupInfo[0].GroupName);
};
// 获取某个军团的积分排名
const ScoreRankGroup = ref(null);
const getScoreRankGroup = async (groupName) => {
  if (GroupName.value === groupName || groupName === "") return;
  GroupName.value = groupName;
  const data = await getGroupScoreRankData({ Offset: 1, Limit: 10, groupName });
  ScoreRankGroup.value = data.result.OwnersInfo;
};
// 获取积分排名
const ScoreRank = ref(null);
const getScoreRank = async () => {
  const data = await getScoreRankData({ Offset: 1, Limit: 10 });
  ScoreRank.value = data.result.OwnersInfo;
};
// 获取军团TVL排名信息
const GroupTVLRankData = ref(null);
const GroupTVLRankTotal = ref(0);
const getGroupTVLRank = async () => {
  const data = await getGroupTVLRankData();
  GroupTVLRankData.value = data.result.GroupInfo;
  GroupTVLRankTotal = data.result.TotalListNumber;
};
// 获取个人TVL排名信息
const PersonalTVLRank = ref(null);
const PersonalTVLRankTotal = ref(0);
const getPersonalTVLRank = async () => {
  const data = await getPersonalTVLRankData();
  PersonalTVLRank.value = data.result.OwnersInfo;
  PersonalTVLRankTotal.value = data.result.TotalListNumber;
};
// 获取最新积分信息
const LastScoreRank = ref(null);
const getLastScoreRank = async () => {
  const data = await getLastScoreRankData({ Offset: 1, Limit: 30 });
  LastScoreRank.value = data.result.OwnersInfo;
};
const data = reactive({});
// 获取浏览器窗口高度

// 当窗口变化时，获取浏览器窗口宽高
window.onresize = () => {
  return (() => {
    window.fullHeight = document.documentElement.clientHeight;
    // 获取bg模块并设置高度
    document.getElementById("rankBg")[0].style.height =
      window.fullHeight - 60 + "px";
  })();
};
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
});
onMounted(() => {
  getGroupList();
  getScoreRank();
  getGroupTVLRank();
  getPersonalTVLRank();
  getLastScoreRank();
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  window.fullHeight = document.documentElement.clientHeight;
  // 获取bg模块并设置高度
  document.getElementById("rankBg").style.height =
    window.fullHeight - 60 + "px";
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
.bg {
  background-color: #fccd37;
}
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
