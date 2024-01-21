<template>
  <div class="corpsRanking">
    <div class="title">Brc20 corps Ranking</div>
    <div class="search">
      <a-input v-model:value="userName" placeholder="Brc20" size="small">
        <template #suffix>
          <a-tooltip title="Extra information">
            <SearchOutlined style="color: rgba(0, 0, 0, 0.45)" />
          </a-tooltip>
        </template>
      </a-input>
    </div>
    <div class="list">
      <div
        class="list_item"
        v-for="item in corpsRankingData"
        :key="item.ranking"
      >
        <div class="left">
          <div class="ranking">{{ item.ranking }}</div>
          <div class="groupName">
            <UserOutlined style="color: rgba(0, 0, 0, 0.45)" />{{
              item.groupName
            }}
          </div>
          <div class="num">{{ item.num }}</div>
        </div>
        <div class="right">
          <div class="svl">SVL：$ {{ item.svl }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { SearchOutlined, UserOutlined } from "@ant-design/icons-vue";
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
let corpsRankingData = [
  {
    ranking: 1,
    groupName: "123",
    num: "20k",
    svl: 200000,
  },
  {
    ranking: 2,
    groupName: "123",
    num: "20k",
    svl: 200000,
  },
  {
    ranking: 3,
    groupName: "123",
    num: "20k",
    svl: 200000,
  },
  {
    ranking: 4,
    groupName: "123",
    num: "20k",
    svl: 200000,
  },
  {
    ranking: 5,
    groupName: "123",
    num: "20k",
    svl: 200000,
  },
  {
    ranking: 10,
    groupName: "123",
    num: "20k",
    svl: 200000,
  },
  {
    ranking: 20,
    groupName: "123",
    num: "20k",
    svl: 200000,
  },
  {
    ranking: 30,
    groupName: "123",
    num: "20k",
    svl: 200000,
  },
  {
    ranking: 40,
    groupName: "123",
    num: "20k",
    svl: 200000,
  },
  {
    ranking: 50,
    groupName: "123",
    num: "20k",
    svl: 200000,
  },
];
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
.corpsRanking {
  width: 280px !important;
  margin: 0 auto;
  .title {
    padding-top: 20px;
    padding-bottom: 17px;
    font-weight: 400;
    font-size: 20px;
    font-family: LilitaOne;
  }
  .list {
    margin-top: 18px;
    .list_item {
      position: relative;
      height: 48px;
      background-color: #fff;
      margin-bottom: 12px;
      border-radius: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // padding: 10px 0;
      text-shadow: 1px 1px 0px #000;
      font-weight: 900;
      padding-right: 20px;
      padding-left: 6px;
      font-family: Inter;
      .ranking {
        position: absolute;
        top: 0;
      }
      .groupName {
        margin-right: 10px;
        margin-left: 12px;
      }
      .left {
        display: flex;
        justify-self: start;
      }
    }
  }
}
</style>
