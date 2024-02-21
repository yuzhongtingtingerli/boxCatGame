<template>
  <div class="myTokenList">
    <div class="title">My Token List</div>
    <div class="noContent" v-if="walletStakeInfo?.length === 0">Empty</div>
    <div class="content" v-else>
      <div class="list header">
        <div class="token">Token</div>
        <div class="amount">Amount</div>
        <div class="stakeBalance">Stake Balance</div>
        <div class="availableStatus">Available Status</div>
      </div>

      <div class="lists">
        <div class="list" v-for="(item, index) in walletStakeInfo" :key="index">
          <div class="token">
            {{ item.TokenSymbol }}
          </div>
          <div class="amount">{{ getMoney(item.TokenAmount) }}</div>
          <div class="stakeBalance">{{ getMoney(item.TokenStakeBalance) }}</div>
          <div class="availableStatus">
            <div
              class="btn"
              v-if="item.TokenStakeStatus == 1"
              @click="handleStatus(item)"
            >
              Go Stake
            </div>
          </div>
        </div>
      </div>
    </div>
    <bitpartyAddress ref="bitpartyAddressRef" @change="isSuccess" />
    <StakeSuccess ref="stakeSuccessRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { getMoney } from "@/utils/Tools.js";
import { getWalletStakeInfoData } from "@/services/index";
import bitpartyAddress from "../bridge/bitpartyAddress.vue";
import StakeSuccess from "@/components/stake-success.vue";
const stakeSuccessRef = ref(null);
const bitpartyAddressRef = ref(null);
const isSuccess = (txid) => {
  stakeSuccessRef.value.open(txid, TokenSymbol.value);
};
const TokenSymbol = ref("");
const handleStatus = (item) => {
  TokenSymbol.value = item.TokenSymbol;
  bitpartyAddressRef.value.open(item);
};
const props = defineProps({
  address: String,
});
const walletStakeInfo = ref(null);
const getWalletStakeInfo = async () => {
  const res = await getWalletStakeInfoData({ UserAddress: props.address });
  walletStakeInfo.value = res.result.WalletInfo;
};
watch(
  props.address,
  (newVal, oldVal) => {
    getWalletStakeInfo();
  },
  { immediate: true }
);
onMounted(() => {
  getWalletStakeInfo();
});
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
