<script setup>
import { SearchOutlined } from "@ant-design/icons-vue";
import { ref, onMounted } from "vue";
import { getTokenLogoData } from "@/services/index.js";
import { getBrc20SummaryData } from "@/services/wallet.js";
const emit = defineEmits(["change"]);
/**
 * 数据部分
 */
const groupName = ref("");
const isShow = ref(false);
let summaryDataList = [];
const open = (address) => {
  getBrcSummary(address);
  isShow.value = true;
};
const close = () => {
  isShow.value = false;
};
const getGroupName = () => {
  groupName.value;
  summaryData.value = summaryDataList.filter((item) =>
    item.ticker.includes(groupName.value)
  );
};
const TokenLogo = ref(null);
const getTokenLogo = async () => {
  const data = await getTokenLogoData();
  TokenLogo.value = data.result;
};
const getLogo = (ticker) => {
  if (!TokenLogo.value) return false;
  if (ticker in TokenLogo.value && TokenLogo.value[ticker] !== "null")
    return TokenLogo.value[ticker];
  return false;
};

const getTicker = (item) => {
  if (item) {
    emit("change", item);
    close();
  }
};
const getFirstLetter = (ticker) => {
  return ticker.split("")[0];
};

const summaryData = ref(null);
const getBrcSummary = async (address) => {
  // loading.value = true;
  try {
    // 使用封装的 request 方法发起请求
    const res = await getBrc20SummaryData(address);
    summaryData.value = res.data.detail;
    summaryDataList = res.data.detail;
  } catch (err) {
    // error.value = "请求失败";
    console.log(err);
  } finally {
    // loading.value = false;
  }
};
onMounted(() => {
  getTokenLogo();
});
defineExpose({ open, close });
</script>

<template>
  <div class="selectGroup" :style="`display: ${isShow ? 'block' : 'none'}`">
    <div class="info">
      <div class="logo">
        <img src="@/assets/cat_ava.png" height="100px" alt="" srcset="" />
      </div>
      <div class="info-content">
        <div class="close" @click="close">
          <img src="@/assets/close.png" height="24px" alt="" srcset="" />
        </div>
        <div class="title1">Select Group</div>
        <div class="search">
          <a-input
            v-model:value="groupName"
            placeholder="Search Name Or Paste Address"
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
        <div class="list">
          <div
            class="list-item"
            v-for="item in summaryData"
            :key="item.ticker"
            @click="getTicker(item)"
          >
            <img
              v-if="TokenLogo && getLogo(item.ticker)"
              width="20px"
              :src="getLogo(item.ticker)"
              alt=""
              srcset=""
            />
            <div class="logo" v-else>{{ getFirstLetter(item.ticker) }}</div>
            <span>{{ item.ticker }}</span>
          </div>
          <div class="list-item" @click="getTicker({ ticker: 'btc' })">
            <img width="20px" src="@/assets/miniB.png" />
            <span>btc</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.selectGroup {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  color: #000;
  .logo {
    position: absolute;
    top: -90px;
    left: 18px;
    z-index: 1;
  }
  .close {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
  }
  .info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
    height: 480px;
    z-index: 2;
  }
  .info-content {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    width: 480px;
    height: 480px;
    background-color: #fff;
    border: 3px solid #000000;
    box-shadow: 4px 4px 0px 0px #000000;
    .title1 {
      font-family: LilitaOne;
      font-size: 30px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: center;
      padding-top: 25px;
    }
    .search {
      height: 40px;
      border-radius: 4px;
      font-family: LilitaOne;
      margin: 16px 30px 13px;
    }
    .list {
      height: 320px;
      overflow-y: scroll;
      .list-item {
        padding: 0 30px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        font-family: LilitaOne;
        font-size: 15px;
        font-weight: 400;

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
}
</style>
<style>
.selectGroup {
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
