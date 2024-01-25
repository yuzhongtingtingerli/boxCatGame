<template>
  <div class="corpsRanking">
    <div class="title">Brc20 corps Ranking</div>
    <div class="search">
      <a-input v-model:value="groupName" placeholder="Brc20" size="small">
        <template #suffix>
          <a-tooltip title="Extra information">
            <SearchOutlined
              style="color: rgba(0, 0, 0, 0.45)"
              @click="getName"
            />
          </a-tooltip>
        </template>
      </a-input>
    </div>
    <div class="list">
      <div class="list_item" v-if="groupList">
        <div class="RankNumber">{{ groupList.GroupRank }}</div>
        <div class="bg"></div>
        <div class="img">
          <img src="@/assets/cat_ava.png" alt="" srcset="" />
        </div>
        <div class="name">{{ groupList.GroupName }}</div>
        <div class="left">
          <div class="left_img">
            <img width="20px" src="@/assets/Frame.png" alt="" srcset="" />
          </div>
          <div class="content">
            {{ groupList.GroupOwners }}
          </div>
        </div>
        <div class="right">
          <div class="svl">SVL：$ {{ getMoney(groupList.GroupSVL) }}</div>
        </div>
      </div>
      <div class="search-group" v-if="groupList"></div>
      <div
        v-for="item in groupListData"
        :key="item.GroupRankNumber"
        @click="getGroupName(item.GroupName)"
        :class="`list_item ${GroupName === item.GroupName ? 'active' : ''}`"
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
          <div class="svl">SVL：$ {{ getMoney(item.GroupSVL) }}</div>
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
import { request } from "@/services/request.js";
import { getMoney } from "@/utils/Tools.js";
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
const groupName = ref("");
const getName = () => {
  if (groupName.value === "") {
    groupList.value = null;
  } else {
    const name = groupName.value;
    getGroupSearch(name);
  }
};
const groupList = ref(null);
const getGroupSearch = async (groupName) => {
  // loading.value = true;
  try {
    // 使用封装的 request 方法发起请求
    const data = await request(
      `/blockchain/getGroupSearch?TokenSymbol=${groupName}`,
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
const porps = defineProps({
  groupListData: Array,
  GroupName: String,
  groupListTotal: Number,
});
const emit = defineEmits(["group-search"]);
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
    .list_item.active {
      border: 2px solid #fccd37;
      border-radius: 4px;
    }
    .search-group {
      height: 1px;
      border: 1px dashed #d9d9d9;
      margin-bottom: 10px;
    }
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
