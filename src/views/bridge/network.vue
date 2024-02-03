<template>
  <div class="network">
    <div class="BTCWallet">
      <div class="btn" @click="connectBTCWallet">
        {{
          Address.getBTCaddress === ""
            ? "Connect BTC Wallet"
            : getAddress(Address.getBTCaddress)
        }}
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
            <span>{{ token?.ticker || "Brc20" }}</span>
            <img src="@/assets/Vector.png" />
          </div>
        </div>
        <div class="amount change" @click="showAmount">
          <div class="left">Amount</div>
          <div class="right">
            <span>{{ amountInfo?.data.amt }}</span>
            <div class="max" @click="getMax">Max</div>
          </div>
        </div>
      </div>
      <div class="transfer" v-if="handover === 'BTC'" @click="openTransfer">
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
    </div>
    <div class="ETHWallet">
      <div class="btn" @click="connectETHWallet">
        {{
          Address.getETHaddress === ""
            ? "Connect ETH Wallet"
            : getAddress(Address.getETHaddress)
        }}
      </div>
      <div class="title">ERC20 NETWORK</div>

      <div class="content">
        <div class="brc20 change">
          <div class="left">Will Get</div>
          <div class="right">
            {{ token?.ticker }}
          </div>
        </div>
        <div class="amount change">
          <div class="left">Amount</div>
          <div class="right">{{ amountInfo?.data.amt }}</div>
        </div>
        <div class="address">
          Ordi eth contract address:
          {{
            getAddress(
              "bc1p8qspx28qqxterluxhwxka5jqe50t90pa378xgxhag59l2m8y588spwlq7k"
            )
          }}
          <img src="@/assets/Magnifying.png" alt="" />
        </div>
      </div>
      <div class="transfer" v-if="handover === 'ETH'">Transfer</div>
    </div>

    <selectToken ref="selectTokenRef" @change="changeToken" />
    <selectAmount ref="selectAmountRef" @change="changeAmount" />
    <transferModal ref="transferModalRef" />
  </div>
</template>

<script setup>
import Web3 from "web3";
import { ref, reactive, onBeforeMount, onMounted } from "vue";
import { InfoCircleOutlined } from "@ant-design/icons-vue";
import { getAddress, getUniSatAddress } from "@/utils/Tools";
import { getRecommendedData } from "@/services/wallet.js";
import { getTVLStatusData } from "@/services/index.js";

import { useAddressStore } from "@/store/address";
import selectToken from "./selectToken.vue";
import selectAmount from "./selectAmount.vue";
import transferModal from "./transferModal.vue";
const getFirstLetter = (ticker) => {
  return ticker.split("")[0];
};

const Address = useAddressStore();
const connectBTCWallet = () => {
  Address.linkWallet();
};
// token 弹框
const selectTokenRef = ref(null);
const showModal = () => {
  selectTokenRef.value.open(Address.getBTCaddress);
};
const token = ref(null);
const changeToken = (data) => {
  token.value = data;
};

// amount 弹框
const selectAmountRef = ref(null);
const showAmount = () => {
  selectAmountRef.value.open(Address.getBTCaddress, token.value?.ticker);
};
const amountInfo = ref();
const changeAmount = (data) => {
  amountInfo.value = data;
};

// transfer 弹框

const transferModalRef = ref(null);
const showTransferModal = () => {
  transferModalRef.value.open(
    Address.getBTCaddress,
    Address.getETHaddress,
    amountInfo.value.inscriptionId
  );
};

const handover = ref("BTC");
const changeWallet = (val) => {
  handover.value = val;
};

const amount = ref(null);
const getMax = () => {
  if (!token.value) return;
  amount.value = Number(token.value.transferableBalance);
};

const getTVLStatus = async ({ StakeTokenSymbol, StakeTokenBalance }) => {
  const res = await getTVLStatusData({ StakeTokenSymbol, StakeTokenBalance });
  return res.result.TVLStatus;
};

const openTransfer = async () => {
  if (!token.value) return;
  const TVLStatus = await getTVLStatus({
    StakeTokenSymbol: token.value.ticker,
    StakeTokenBalance: amountInfo.value.data.amt,
  });
  if (TVLStatus == 0) return;
  showTransferModal();
};

const connectETHWallet = async () => {
  Address.linkETHWallet();
};
onMounted(() => {
  Address.getETHWallet();
});
</script>
<style>
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
      cursor: pointer;
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
          cursor: pointer;
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
    cursor: pointer;
  }
  .BTCWallet {
    width: 520px;
    padding: 28px 40px;
    background: linear-gradient(
      135deg,
      rgba(131, 196, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
    border: 1px solid #777e90;
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
