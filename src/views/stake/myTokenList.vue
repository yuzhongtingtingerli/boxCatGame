<template>
  <div class="myTokenList">
    <div class="title">My Token List</div>
    <div class="noContent" v-if="walletStakeInfo?.length === 0">Empty</div>
    <div class="content" v-else>
      <div class="list header">
        <div class="token">Token</div>
        <div class="amount">Amount</div>
        <div class="stakeBalance">
          Available Balance
          <span>
            <img src="@/assets/i.png" width="2px" />
            <div class="hover">
              <img width="240px" src="@/assets/hover-balance.png" alt="" />
              <p>
                We will create an available balance based on your bridge
                address, which is synchronized with on-chain information with a
                delay. Please do not transfer your token to other accounts to
                avoid asset risks.
              </p>
            </div>
          </span>
        </div>
        <div class="availableStatus"></div>
      </div>

      <div class="lists">
        <div class="list" v-for="(item, index) in walletStakeInfo" :key="index">
          <div class="token">
            {{ decodeURIComponent(item.TokenSymbol) }}
          </div>
          <div class="amount">{{ getMoney(item.TokenAmount) }}</div>
          <div class="stakeBalance">{{ getMoney(item.TokenStakeBalance) }}</div>
          <div class="availableStatus">
            <!-- <div
              class="btn"
              v-if="item.TokenStakeStatus == 1"
              @click="handleStatus(item)"
            >
              Go Stake
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <bitpartyAddress ref="bitpartyAddressRef" @change="isSuccess" />
    <StakeSuccess ref="stakeSuccessRef" />
    <ErrorMsg ref="errorMsgRef" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { getMoney } from "@/utils/Tools.js";
import { getWalletStakeInfoData } from "@/services/index";
import bitpartyAddress from "../bridge/bitpartyAddress.vue";
import StakeSuccess from "@/components/stake-success.vue";
import ErrorMsg from "@/components/error-msg.vue";
import { useAddressStore } from "@/store/address";

const Address = useAddressStore();
const stakeSuccessRef = ref(null);
const bitpartyAddressRef = ref(null);
const errorMsgRef = ref(null);
const isSuccess = (type, txid) => {
  if (type === "success") {
    stakeSuccessRef.value.open(txid, TokenSymbol.value);
    getWalletStakeInfo();
  } else if (type === "error") {
    const headline = "Dear!";
    const title = "stake token error";
    const message = txid;
    errorMsgRef.value.open(headline, title, message);
  } else if (type === "errorBalance") {
    const headline = "Dear!";
    const title = "something wrong !";
    const message = `Your available balance does not match the on-chain 
information, please check it or contact us through the official community`;
    errorMsgRef.value.open(headline, title, message, txid);
  }
};
const TokenSymbol = ref("");
const handleStatus = (item) => {
  TokenSymbol.value = item.TokenSymbol;
  bitpartyAddressRef.value.open(item, Address.ETHaddress);
};
const walletStakeInfo = ref(null);
const getWalletStakeInfo = async () => {
  const res = await getWalletStakeInfoData({ UserAddress: Address.ETHaddress });
  walletStakeInfo.value = res.result.WalletInfo;
};
watch(
  Address,
  (newVal, oldVal) => {
    if (Address.ETHaddress) {
      getWalletStakeInfo();
    }
  },
  { immediate: true }
);
</script>
<style scoped lang="scss">
.myTokenList {
  width: 680px;
  height: 340px;
  background: linear-gradient(
    135deg,
    rgba(131, 196, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  .title {
    font-family: LilitaOne;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    margin-left: 20px;
    margin-top: -9px;
  }
  .noContent {
    height: 339px;
    line-height: 339px;
    font-family: LilitaOne;
    font-size: 15px;
    font-weight: 400;
    text-align: center;
  }
  .content {
    padding-top: 38px;
    .lists {
      height: 234px;
      overflow-y: scroll;
    }

    .list {
      display: flex;
      justify-content: space-between;
      font-family: LilitaOne;
      font-size: 15px;
      margin-bottom: 24px;
      text-align: center;
      height: 30px;
      line-height: 30px;
      .token {
        width: 140px;
      }
      .amount {
        min-width: 140px;
      }
      .stakeBalance {
        min-width: 140px;
        span {
          display: inline-flex;
          margin-left: 11px;
          align-items: center;
          justify-content: center;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid #f6cb37;
          position: relative;
          cursor: pointer;
          &:hover .hover {
            display: block;
          }
          .hover {
            display: none;
            position: absolute;
            top: 18px;
            left: -182px;
            width: 240px;
            height: 76px;
            img {
              position: absolute;
              left: 0px;
            }
            p {
              position: absolute;
              font-family: Inter;
              font-size: 10px;
              font-weight: 600;
              line-height: 12px;
              letter-spacing: 0em;
              text-align: left;
              padding: 28px 10px 0;
              margin: 0;
            }
          }
        }
      }
      .availableStatus {
        width: 140px;
        .btn {
          width: 100px;
          margin: 0 auto;
          height: 30px;
          line-height: 24px;
          text-align: center;
          background-color: #a3dc00;
          color: #1b1b1b;
          box-shadow: 4px 4px 0px 0px #000000;
          border-radius: 4px;
          border: 2px solid #000;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
