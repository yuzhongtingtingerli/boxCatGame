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
        v-for="item in groupListData"
        :key="item.GroupRankNumber"
        @click="getGroupName(item.GroupName)"
      >
        <div class="RankNumber">{{ item.GroupRankNumber }}</div>
        <div class="bg"></div>
        <div class="img">
          <img src="@/assets/cat_ava.png" alt="" srcset="" />
        </div>
        <div class="name">{{ item.GroupName }}</div>
        <div class="left">
          <div class="left_img">
            <img width="20px" src="@/assets/Frame.png" alt="" srcset="" />
          </div>
          <div class="content">
            {{ item.GroupTokenPerson }}
          </div>
        </div>
        <div class="right">
          <div class="svl">SVL：$ {{ item.GroupSVL }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { SearchOutlined } from "@ant-design/icons-vue";
import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  watchEffect,
  computed,
  defineProps,
} from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
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
const porps = defineProps({
  groupListData: Array,
});
const emit = defineEmits(["group-search"]);
const GroupName = ref("");
const getGroupName = (GroupName) => {
  emit("group-search", GroupName);
};
const data = reactive({});
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
});
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
});
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data),
});
</script>
<style>
.ant-input.ant-input-sm.css-dev-only-do-not-override-19yxfbp {
  font-family: LilitaOne !important;
}
</style>
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
  .search {
    height: 24px;
    border-radius: 2px;
    font-family: LilitaOne;
  }
  .list {
    margin-top: 18px;
    height: 588px;
    overflow-y: scroll;
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
      // text-shadow: 2px 2px 0px #000;
      text-shadow: 0 1px #000, 1px 0 #000, -1px 0 #000, 0 -1px #000;
      // -webkit-text-stroke: 1px #000;
      font-weight: 900;
      padding-right: 20px;
      padding-left: 6px;
      font-family: Inter;
      cursor: pointer;
      .RankNumber {
        position: absolute;
        top: 2px;
        left: 6px;
        font-family: LilitaOne;
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: left;
        color: #fff;
        text-shadow: 0 1px #000, 1px 0 #000, -1px 0 #000, 0 -1px #000;
        z-index: 999;
      }
      .img {
        position: absolute;
        top: 10px;
        left: 20px;
        img {
          width: 25px;
        }
      }
      .name {
        position: absolute;
        top: 28px;
        left: 20px;
        color: #fff;
        text-shadow: 0 1px #000, 1px 0 #000, -1px 0 #000, 0 -1px #000;
        font-family: LilitaOne;
        font-size: 13px;
        font-weight: 400;
        letter-spacing: 0em;
      }
      .left {
        display: flex;
        justify-self: start;
        align-items: center;
      }
    }
  }
}
</style>
