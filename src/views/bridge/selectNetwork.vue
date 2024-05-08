<script setup>
import { SearchOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
const emit = defineEmits(["change"]);
/**
 * 数据部分
 */
const networkList = ref([
  "BTC NETWORK",
  "Ethereum",
  "Arbitrum",
  "OP",
  "Polygon",
  "Solana",
]);
const networkData = [
  "BTC NETWORK",
  "Ethereum",
  "Arbitrum",
  "OP",
  "Polygon",
  "Solana",
];
const groupName = ref("");
const show = ref(false);
const open = () => {
  show.value = true;
};
const close = () => {
  show.value = false;
};
const getGroupName = () => {
  networkList.value = networkData.filter((item) =>
    item.includes(groupName.value)
  );
};

const getTicker = (item) => {
  if (item) {
    emit("change", item);
    close();
  }
};

defineExpose({ open, close });
</script>

<template>
  <a-modal
    v-model:open="show"
    title=""
    :footer="null"
    :maskClosable="false"
    @ok="close"
    :closable="false"
    width="480px"
  >
    <div class="modal_style">
      <img class="head-img" src="@/assets/cat_ava.png" />
      <div class="close" @click="close">
        <img src="@/assets/close.png" height="24px" alt="" srcset="" />
      </div>
      <div class="title">Select Network</div>
      <div class="search">
        <a-input v-model:value="groupName"></a-input>
      </div>
      <div class="list">
        <div
          class="list-item"
          v-for="item in networkList"
          :key="item"
          @click="getTicker(item)"
        >
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<style scoped lang="scss">
.modal_style {
  position: relative;
  .head-img {
    position: absolute;
    left: -16px;
    top: -114px;
    width: 110px;
  }
  .close {
    position: absolute;
    right: -16px;
    top: -14px;
    cursor: pointer;
  }
  .search {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    font-family: LilitaOne;
    margin-bottom: 13px;
    margin-top: 16px;
  }
  .title {
    text-align: center;
    font-family: LilitaOne;
    font-size: 30px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
  }
  .list {
    height: 320px;
    overflow-y: scroll;
    .list-item {
      padding: 0 10px;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      font-family: LilitaOne;
      font-size: 15px;
      font-weight: 400;
      background: rgba(242, 151, 0, 0.1);
      margin-bottom: 10px;
      .logo {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: #000;
        color: #fff;
        line-height: 18px;
        text-align: center;
        margin-right: 8px;
      }
      span {
        padding-left: 5px;
      }
    }
    .list-item:hover {
      background-color: rgba(242, 151, 0, 0.1);
    }
  }
}
</style>
<style>
.modal_style {
  .ant-input-affix-wrapper.css-dev-only-do-not-override-19yxfbp {
    background-color: #ededed;
    height: 40px;
    border: none;
    input {
      background-color: #ededed;
      font-family: LilitaOne;
      font-size: 15px;
      font-weight: 400;
    }
  }
}
</style>
