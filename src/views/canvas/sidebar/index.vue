<template>
  <div class="Sidebar" ref="SidebarRef">
    <a-drawer
      v-model:open="open"
      class="custom-class"
      :closable="false"
      :mask="false"
      :getContainer="SidebarRef"
      root-class-name="root-class-name"
      :contentWrapperStyle="{ maxWidth: '100%' }"
      @after-open-change="afterOpenChange"
    >
      <template v-if="Address.getBTCaddress">
        <YourBrc20 />
        <YourScore :ScoreData="ScoreData" />
        <Joined :JoinGroupData="JoinGroupData" />
      </template>
      <Groups
        :groupListData="groupListData"
        :spinning="spinning"
        @load="handleScroll"
      />

      <div class="JoinGroup" @click="handleJoinGroup">Join Group</div>
      <img
        class="close-drawer"
        src="@/assets/close-drawer.png"
        @click="closeDrawer"
      />
    </a-drawer>
    <div class="open-drawer">
      <img src="@/assets/open-drawer.png" @click="open = true" />
    </div>
    <ErrorInfo ref="errorInfoRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import YourBrc20 from "./yourBrc20.vue";
import YourScore from "./yourScore.vue";
import Joined from "./joined.vue";
import Groups from "./groups.vue";
import ErrorInfo from "@/components/error-info.vue";
import {
  getScoreData,
  getJoinGroupData,
  getGroupListData,
} from "@/services/index";
import { useAddressStore } from "@/store/address";

const Address = useAddressStore();
const open = ref(true);
const closeDrawer = () => {
  open.value = false;
};

const SidebarRef = ref(null);
const ScoreData = ref(null);
const getScore = async () => {
  const data = await getScoreData(Address.getBTCaddress);
  ScoreData.value = data.result;
};
const router = useRouter();
const handleJoinGroup = () => {
  if (Address.getBTCaddress) {
    router.push({ path: "/stake", query: { from: "JoinGroup" } });
  } else {
    isShowError("You should connect your BTC wallet first, Explorer!");
  }
};

const errorInfoRef = ref(null);
const isShowError = (title) => {
  errorInfoRef.value.open(title);
};
// 加入军团列表
const JoinGroupData = ref(null);
const getJoinGroup = async () => {
  const data = await getJoinGroupData(Address.getBTCaddress);
  JoinGroupData.value = data.result.GroupInfo;
};

// 获取军团列表
const groupListData = ref(null);
const getGroupList = async () => {
  spinning.value = true;
  const data = await getGroupListData({ Offset: offset.value, Limit: 6 });
  groupListData.value = [
    ...(groupListData.value || []),
    ...data.result.GroupInfo,
  ];
  total.value = data.result.TotalListNumber;
  spinning.value = false;
};
const spinning = ref(false);
const offset = ref(1);
const total = ref(1);
// 滚动处理函数
const handleScroll = () => {
  console.log(spinning.value, total.value, groupListData.value?.length);
  if (spinning.value || total.value <= groupListData.value?.length) return;

  offset.value++;
  getGroupList();
};

watch(
  Address,
  () => {
    if (Address.getBTCaddress) {
      getScore();
      getJoinGroup();
    }
  },
  { immediate: true }
);
onMounted(() => {
  getGroupList();
});
</script>
<style lang="scss">
.Sidebar {
  .root-class-name {
    position: absolute;
    left: 0;
    top: 0;
    width: 260px;
    height: 735px;
  }
}
</style>
<style scoped lang="scss">
.Sidebar {
  position: fixed;
  top: 65px;
  right: 0;
  width: 260px;
  height: 735px;
  border-radius: 7px 0px 0px 7px;
  // box-shadow: 4px 4px 0px 0px #000000;
  // border: 3px solid #000;
  // padding: 16px 20px;
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
  .close-drawer {
    position: absolute;
    left: 10px;
    top: 50%;
    width: 4px;
    transform: translateY(-50%);
    cursor: pointer;
  }
  .open-drawer {
    position: absolute;
    right: 0;
    top: 0;
    width: 6px;
    height: 735px;
    cursor: pointer;
    background: #fff;
    img {
      position: absolute;
      right: 8px;
      top: 50%;
      width: 24px;
    }
  }
}
</style>
