<template>
  <div class="Sidebar">
    <YourBrc20 />
    <YourScore :ScoreData="ScoreData" />
    <Joined :JoinGroupData="JoinGroupData" />
    <Groups :groupListData="groupListData" />
    <div class="JoinGroup">Join Group</div>
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
import YourBrc20 from "./yourBrc20.vue";
import YourScore from "./yourScore.vue";
import Joined from "./joined.vue";
import Groups from "./groups.vue";
import { request } from "@/services/request.js";
import {
  getScoreData,
  getJoinGroupData,
  getGroupListData,
} from "@/services/index";
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
const error = ref(null);
// 获取军团列表
const Address = ref("0x1BaF1035d5b6B3DaBc1AB89a34ca1343da1F296e");
const ScoreData = ref(null);
const getScore = async () => {
  const data = await getScoreData(Address.value);
  ScoreData.value = data.result;
};
// 加入军团列表
const JoinGroupData = ref(null);
const getJoinGroup = async () => {
  const data = await getJoinGroupData(Address.value);
  JoinGroupData.value = data.result.GroupInfo;
};
// 获取军团列表
const groupListData = ref(null);
const getGroupList = async () => {
  const data = await getGroupListData({ Offset: 1, Limit: 10 });
  groupListData.value = data.result.GroupInfo;
};
const data = reactive({});
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
});
onMounted(() => {
  getGroupList();
  getScore();
  getJoinGroup();
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
.Sidebar {
  position: fixed;
  top: 65px;
  right: 0;
  width: 260px;
  height: 735px;
  background-color: #fff;
  border-radius: 7px 0px 0px 7px;
  box-shadow: 4px 4px 0px 0px #000000;
  border: 3px solid #000;
  padding: 16px 20px;
  .JoinGroup {
    position: absolute;
    bottom: 26px;
    left: 50%;
    transform: translateX(-50%);
    height: 48px;
    width: 180px;
    color: #000;
    background-color: #f6cb37;
    box-shadow: 4px 4px 0px #000;
    border-radius: 4px;
    font-family: LilitaOne;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0em;
    text-align: center;
    line-height: 48px;
    cursor: pointer;
  }
}
</style>
