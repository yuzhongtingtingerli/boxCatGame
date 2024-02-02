<template>
  <div class="network">
    <div class="BTCWallet">
      <div class="btn" @click="connectBTCWallet">
        {{ BTCAddress === "" ? "Connect BTC Wallet" : getAddress(BTCAddress) }}
      </div>
      <div class="title">BRC20 NETWORK</div>
      <div class="tips" v-if="summaryData?.length === 0">
        You Should Do Something First<InfoCircleOutlined
          style="font-size: 12px; margin-left: 10px"
        />
        <div class="tip">You Should Do Something First</div>
      </div>
      <div class="content">
        <div class="brc20 change" @click="showModal">
          <div class="left">Select Token</div>
          <div class="right">
            <span>Brc20</span>
            <img src="@/assets/Vector.png" />
          </div>
        </div>
        <div class="amount change">
          <div class="left">Amount</div>
          <div class="right">
            <a-input v-model:value="amount" placeholder="0.00"> </a-input>
            <div class="max" @click="getMax">Max</div>
          </div>
        </div>
      </div>
      <div class="transfer" v-if="handover === 'BTC'" @click="getTransfer">
        Transfer
      </div>
    </div>
    <div class="handover">
      <div class="left">
        <img
          v-show="handover === 'ETH'"
          @click="changeWallet('BTC')"
          src="@/assets/bridge_l_g.png"
          alt=""
          srcset=""
        />
        <img
          v-show="handover === 'BTC'"
          src="@/assets/bridge_l.png"
          alt=""
          srcset=""
        />
      </div>
      <div class="right">
        <img
          v-show="handover === 'ETH'"
          src="@/assets/bridge_r.png"
          alt=""
          srcset=""
        />
        <!-- @click="changeWallet('ETH')" -->
        <img
          v-show="handover === 'BTC'"
          src="@/assets/bridge_r_g.png"
          alt=""
          srcset=""
        />
      </div>
      <!-- <div
        class="left_g"
        v-show="handover === 'ETH'"
        @click="changeWallet('BTC')"
      ></div>
      <div
        class="left"
        v-show="handover === 'BTC'"
        @click="changeWallet('ETH')"
      ></div>
      <div
        class="right"
        v-show="handover === 'ETH'"
        @click="changeWallet('BTC')"
      ></div>
      <div
        class="right_g"
        v-show="handover === 'BTC'"
        @click="changeWallet('ETH')"
      ></div> -->
    </div>
    <div class="ETHWallet">
      <div class="btn" @click="connectETHWallet">Connect ETH Wallet</div>
      <div class="title">ERC20 NETWORK</div>
      <!-- <div class="tips">
        You Should Do Something First<InfoCircleOutlined
          style="font-size: 12px; margin-left: 10px"
        />
        <div class="tip">You Should Do Something First</div>
      </div> -->
      <div class="content">
        <div class="brc20 change">
          <div class="left">Will Get</div>
          <div class="right">
            {{ ticker }}
          </div>
        </div>
        <div class="amount change"></div>
        <!-- <div class="totalFee change"></div> -->
        <div class="address">
          Ordi eth contract address: 0x98......9876
          <img src="@/assets/Magnifying.png" alt="" />
        </div>
      </div>
      <div class="transfer" v-if="handover === 'ETH'">Transfer</div>
    </div>
    <a-modal
      v-model:open="open"
      title=""
      :footer="null"
      :maskClosable="false"
      @ok="handleOk"
      :closable="false"
      width="480px"
    >
      <div class="modal_style">
        <div class="close" @click="handleOk">
          <img src="@/assets/close.png" alt="" srcset="" />
        </div>
        <div class="title">Select A Token</div>
        <div class="search">
          <a-input
            v-model:value="GroupName"
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
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import Web3 from "web3";
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
import { InfoCircleOutlined, SearchOutlined } from "@ant-design/icons-vue";
import { getAddress, getUniSatAddress } from "@/utils/Tools";
import { requestWallet } from "@/services/request.js";
import { getTokenLogoData } from "@/services/index.js";
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
const getGroupName = () => {};
const TokenLogo = ref(null);
const getTokenLogo = async () => {
  const data = await getTokenLogoData();
  TokenLogo.value = data.result;
};
const getLogo = (ticker) => {
  if (ticker in TokenLogo.value) return TokenLogo.value[ticker];
  return false;
};
const getFirstLetter = (ticker) => {
  return ticker.split("")[0];
};
const open = ref(false);
const showModal = () => {
  open.value = true;
};
const handleOk = (e) => {
  console.log(e);
  open.value = false;
};
const handover = ref("BTC");
const changeWallet = (val) => {
  handover.value = val;
};
const ticker = ref("");
const transferData = ref(null);
const getTicker = (item) => {
  if (item) {
    transferData.value = item;
    ticker.value = item.ticker;
    open.value = false;
  }
};
const amount = ref(null);
const getMax = async () => {
  const data = await transferData.value;
  amount.value = Number(data.transferableBalance);
};
const getTransfer = async () => {
  const data = await transferData.value;
};
const BTCAddress = ref("");
const connectBTCWallet = async () => {
  // 没有钱包就跳转
  if (!window.unisat) {
    console.log("UniSat Wallet is installed!");
    window.open("https://unisat.io/");
    return;
  }
  if (window.address) return;
  // 链接钱包
  try {
    getUniSatAddressData();
    // let res = await unisat?.getInscriptions(0, 10);
    // console.log(res, "rrr");
    // this.setAccount(accounts[0]);
    // this.subscribeProvider();
  } catch (error) {
    // ElMessage({
    //   message: $t('base.11'),
    //   type: 'error'
    // });
  }
};
const summaryData = ref(null);
const getUniSatAddressData = async () => {
  const addr = await getUniSatAddress();
  BTCAddress.value = addr;
  window.address = addr;
  getBrcSummary(addr);
};

const getBrcSummary = async (address) => {
  // loading.value = true;
  try {
    // 使用封装的 request 方法发起请求
    const res = await requestWallet(
      `https://open-api.unisat.io/v1/indexer/address/${address}/brc20/summary`,
      "get"
    );
    summaryData.value = res.data.detail;
    console.log(res, "getBrcSummary");
  } catch (err) {
    // error.value = "请求失败";
    console.log(err);
  } finally {
    // loading.value = false;
  }
};
const connectETHWallet = async () => {
  // this.error = undefined
  if (typeof window.ethereum !== "undefined") {
    const ethereum = await window.ethereum.enable();
    console.log(ethereum, "ethereum");
    const web3 = new Web3(window.ethereum);
    const res = await web3.eth.getAccounts();
    console.log("userAdderss", res);
    if (res.length > 0) {
      // this.checkNetId(web3)
    } else {
    }
  } else {
    // this.error = "MetaMask not found. Please install MetaMask extension.";
    // console.error("MetaMask not found. Please install MetaMask extension.");
  }
};
const data = reactive({});
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
});
onMounted(() => {
  getUniSatAddressData();
  getTokenLogo();
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
.network {
  .ant-input.css-dev-only-do-not-override-19yxfbp {
    background: none !important;
    border: none;
    font-family: LilitaOne;
    font-size: 15px;
    font-weight: 400;
    text-align: right;
    color: #fff;
  }
}
</style>
<style scoped lang="scss">
.modal_style {
  position: relative;
  .close {
    position: absolute;
    right: -16px;
    top: -14px;
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
    }
    .list-item:hover {
      background-color: rgba(242, 151, 0, 0.1);
    }
  }
}
.network {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  position: relative;

  .btn {
    width: 270px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    font-family: LilitaOne;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 0em;
    color: #000;
    border-radius: 8px;
    cursor: pointer;
  }
  .title {
    margin-top: 16px;
    font-family: LilitaOne;
    font-size: 36px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
  }
  .tips {
    font-family: LilitaOne;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
    color: #f6cb37;
    margin-top: 20px;
    position: relative;
    .tip {
      position: absolute;
      background-image: url("@/assets/rectangle.png");
      width: 290px;
      height: 75px;
      top: 16px;
      left: -80px;
      line-height: 85px;
      text-align: center;
      font-family: Inter;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0em;
      color: #fff;
      display: none;
    }
    &:hover .tip {
      display: block;
    }
  }
  .content {
    margin-top: 33px;
    .change {
      width: 100%;
      height: 40px;
      line-height: 40px;
      background-color: rgba(255, 255, 255, 0.1);
      margin-top: 16px;
      border-radius: 4px;
      font-family: LilitaOne;
      font-size: 15px;
      font-weight: 400;
      padding: 0 18px;
    }
    .amount {
      display: flex;
      justify-content: space-between;
      .right {
        display: flex;
        justify-self: start;
        .max {
          margin-left: 12px;
          color: #ffaa08;
        }
      }
    }
    .brc20 {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      img {
        margin-left: 8px;
      }
      span {
        opacity: 0.3;
      }
    }
    .address {
      font-family: LilitaOne;
      font-size: 13px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: right;
      margin-bottom: 30px;
      text-decoration: underline;
      margin-top: 12px;
    }
  }
  .transfer {
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background-color: #f6cb37;
    color: #000;
    font-family: LilitaOne;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0em;
    border-radius: 8px;
    margin-top: 30px;
  }
  .BTCWallet {
    width: 520px;
    padding: 28px 40px;
    background: linear-gradient(
      135deg,
      rgba(131, 196, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
    .btn {
      background-color: #f6cb37;
    }
  }

  .handover {
    width: 40px;
    position: absolute;
    top: 168px;
    left: 50%;
    transform: translateX(-50%);
    .left {
      width: 40px;
      height: 12px;
      //   background-image: url("@/assets/bridge_l.png");
      margin-bottom: 10px;
      cursor: pointer;
    }
    .left_g {
      width: 40px;
      height: 12px;
      background-image: url("@/assets/bridge_l_g.png");
      margin-bottom: 10px;
    }
    .right {
      width: 40px;
      height: 12px;
      cursor: pointer;
      //   background-image: url("@/assets/bridge_r.png");
    }
    .right_g {
      width: 40px;
      height: 12px;
      background-image: url("@/assets/bridge_r_g.png");
    }
  }
  .ETHWallet {
    width: 520px;
    padding: 28px 40px;
    background: linear-gradient(
      135deg,
      rgba(131, 196, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
    .btn {
      background-color: #bfe1ff;
    }
  }
}
</style>
