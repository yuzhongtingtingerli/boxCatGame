<template>
  <div class="group">
    <div class="top">
      <Title title="Groups" />
      <div class="search">
        <a-input
          v-model:value="GroupName"
          @keyup.enter="getGroupName"
          placeholder="Brc20"
          size="small"
        >
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
      <div class="svl">
        {{ getMoney(groupList.GroupSVL) }}
        <div class="unit">TVL(BTC)</div>
      </div>
    </div>
    <div class="search-group" v-if="groupList"></div>
    <a-spin :spinning="props.spinning">
      <div
        class="list"
        :style="`height: ${Address.getBTCaddress ? '240px' : '570px'}`"
        ref="scrollContainer"
        @scroll="handleScroll"
      >
        <div
          v-for="item in groupListData"
          :key="item.GroupRankNumber"
          @click="changeGroup(item)"
          :class="`list-item ${
            changeGroupName === item.GroupName ? 'changeGroup' : ''
          }`"
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
          <div class="svl">
            {{ getMoney(item.GroupSVL) }}
            <div class="unit">TVL(BTC)</div>
          </div>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Title from "@cps/title";
import { getMoney } from "@/utils/Tools.js";
import { SearchOutlined } from "@ant-design/icons-vue";
import { request } from "@/services/request.js";
import { useAddressStore } from "@/store/address";
const Address = useAddressStore();
const emit = defineEmits(["load"]);

// 容器引用
const scrollContainer = ref(null);
const handleScroll = () => {
  const container = scrollContainer.value;
  if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
    console.log("触底了");
    emit("load");
  }
};

const changeGroupName = ref("");
const changeGroup = (item) => {
  changeGroupName.value = item.GroupName;
};

const props = defineProps({
  groupListData: Array,
  spinning: Boolean,
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
    margin-bottom: 13px;
  }
}
.list {
  overflow-y: auto;
  height: 240px;
  overflow-x: hidden;
  width: 220px;
  box-sizing: border-box;
}
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
    position: relative;
    font-family: Inter;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 0em;
    text-align: left;
    color: #fff;
    text-shadow: 0 1px #000, 1px 0 #000, -1px 0 #000, 0 -1px #000;
    margin-right: 6px;
    .unit {
      position: absolute;
      top: 10px;
      right: 0px;
      font-family: LilitaOne;
      font-size: 8px;
      font-weight: 400;
      color: #000;
      text-shadow: none;
    }
  }
}
.changeGroup {
  border: 3px solid #ffc500;
}
</style>
