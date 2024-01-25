<template>
  <div class="group">
    <div class="top">
      <Title title="Groups" />
      <div class="search">
        <a-input v-model:value="GroupName" placeholder="Brc20" size="small">
          <template #suffix>
            <a-tooltip title="Extra information">
              <SearchOutlined
                style="color: rgba(0, 0, 0, 0.45)"
                @click="getGroupName"
              />
            </a-tooltip>
          </template>
        </a-input>
      </div>
    </div>
    <div class="list">
      <div class="list-item" v-if="groupList">
        <div class="RankNumber">{{ groupList.GroupRank }}</div>
        <div class="bg"></div>
        <div class="img">
          <img src="@/assets/cat_ava.png" alt="" srcset="" />
        </div>
        <div class="name">{{ groupList.GroupName }}</div>
        <div class="GroupTokenPerson">
          <img width="20px" src="@/assets/Frame.png" alt="" srcset="" />{{
            groupList.GroupOwners
          }}
        </div>
        <div class="svl">SVL：$ {{ getMoney(groupList.GroupSVL) }}</div>
      </div>
      <div class="search-group" v-if="groupList"></div>
      <div
        class="list-item"
        v-for="item in groupListData"
        :key="item.GroupRankNumber"
      >
        <div class="RankNumber">{{ item.GroupRankNumber }}</div>
        <div class="bg"></div>
        <div class="img">
          <img src="@/assets/cat_ava.png" alt="" srcset="" />
        </div>
        <div class="name">{{ item.GroupName }}</div>
        <div class="GroupTokenPerson">
          <img width="20px" src="@/assets/Frame.png" alt="" srcset="" />{{
            item.GroupTokenPerson
          }}
        </div>
        <div class="svl">SVL：$ {{ getMoney(item.GroupSVL) }}</div>
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
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import Title from "@cps/title";
import { getMoney } from "@/utils/Tools.js";
import { SearchOutlined } from "@ant-design/icons-vue";
import { request } from "@/services/request.js";
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
const props = defineProps({
  groupListData: Array,
});
const GroupName = ref("");
const getGroupName = () => {
  if (GroupName.value === "") {
    groupList.value = null;
  } else {
    const groupName = GroupName.value;
    getGroupSearch(groupName);
  }
};
const error = ref(null);
const groupList = ref(null);
const getGroupSearch = async (groupName) => {
  // loading.value = true;
  try {
    // 使用封装的 request 方法发起请求
    const data = await request(
      `/api/blockchain/getGroupSearch?TokenSymbol=${groupName}`,
      "get"
    );
    groupList.value = data.result;
    console.log(data.result, "getGroupSearch");
  } catch (err) {
    error.value = "请求失败";
  } finally {
    // loading.value = false;
  }
};
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
<style>
.group
  .ant-input-affix-wrapper.ant-input-affix-wrapper-sm.css-dev-only-do-not-override-19yxfbp {
  border: 2px solid #d9d9d9;
}
</style>
<style scoped lang="scss">
.top {
  display: flex;
  justify-content: space-between;
  .search {
    width: 100px;
    height: 24px;
    border-radius: 2px;
    font-family: LilitaOne;
  }
}
.list {
  padding-top: 13px;
  height: 240px;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 220px;
  box-sizing: border-box;
  .search-group {
    height: 1px;
    border: 1px dashed #d9d9d9;
    margin-bottom: 10px;
  }
  .list-item {
    position: relative;
    width: 220px;
    height: 48px;
    box-sizing: border-box;
    border-radius: 2px;
    border: 2px solid #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-family: Inter;
    font-size: 10px;
    font-weight: 900;
    line-height: 12px;
    letter-spacing: 0em;
    overflow: hidden;
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
    .bg {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: #000;
      position: absolute;
      top: -48px;
      left: -48px;
      z-index: -1;
    }
    .img {
      position: absolute;
      top: 10px;
      left: 12px;
      img {
        width: 25px;
      }
    }
    .name {
      position: absolute;
      top: 28px;
      left: 12px;
      color: #fff;
      text-shadow: 0 1px #000, 1px 0 #000, -1px 0 #000, 0 -1px #000;
      font-family: LilitaOne;
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 0em;
    }
    .GroupTokenPerson {
      margin-left: 40px;
      font-family: Inter;
      font-size: 10px;
      font-weight: 900;
      letter-spacing: 0em;
      text-align: left;
      color: #fff;
      text-shadow: 0 1px #000, 1px 0 #000, -1px 0 #000, 0 -1px #000;
    }
    .svl {
      font-family: Inter;
      font-size: 10px;
      font-weight: 900;
      letter-spacing: 0em;
      text-align: left;
      color: #fff;
      text-shadow: 0 1px #000, 1px 0 #000, -1px 0 #000, 0 -1px #000;
      margin-right: 6px;
    }
  }
}
</style>
