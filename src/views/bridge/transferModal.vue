<script setup>
import { ref, reactive, onBeforeMount, onMounted } from "vue";
import { getRecommendedData } from "@/services/wallet.js";
import { getAddress } from "@/utils/Tools";
import { getTVLStatusData, doBridgeData } from "@/services/index.js";
const show = ref(false);
const BTCAddress = ref("");
const ETHAddress = ref("");
let inscriptionId = ref("");

const open = (btc, eth, insId) => {
  getRecommended();
  show.value = true;
  BTCAddress.value = btc;
  ETHAddress.value = eth;
  inscriptionId.value = insId;
};
const close = () => {
  show.value = false;
};
const feeType = ref("Normal");
const feeData = ref(0);
const getFee = (fee, type) => {
  console.log(fee, type);
  feeData.value = fee;
  feeType.value = type;
};
const recommendedData = ref(null);
const getRecommended = async () => {
  const res = await getRecommendedData();
  recommendedData.value = res;
  feeData.value = res.halfHourFee;
};
const Confirm = async () => {
  console.log(ETHAddress.value, inscriptionId.value, feeData.value);

  const txid = await sendInscription(
    ETHAddress.value,
    inscriptionId.value,
    feeData.value
  );
  console.log(txid);
};
const sendInscription = async (address, id, { feeRate }) => {
  try {
    let { txid } = await window.unisat.sendInscription(address, id, feeRate);
    return txid;
  } catch (e) {
    console.log(e);
  }
};

const doBridge = async ({
  BridgeFromAddress,
  BridgeType,
  BridgeTokenSymbol,
  BridgeTokenBalance,
  BridgeTxHash,
  BridgeToAddress,
}) => {
  const res = await doBridgeData({
    BridgeFromAddress,
    BridgeType,
    BridgeTokenSymbol,
    BridgeTokenBalance,
    BridgeTxHash,
    BridgeToAddress,
  });
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
    <div class="transfer_style">
      <img class="head-img" src="@/assets/cat_ava.png" />
      <div class="top">
        <div class="title">It Will Cost 30 Mins</div>
        <div class="close" @click="close">
          <img src="@/assets/close.png" alt="" srcset="" />
        </div>
      </div>
      <div class="list">
        <div class="left">From:</div>
        <div class="right">
          <span>{{ getAddress(BTCAddress) }}</span>
          <img src="@/assets/copy.png" alt="" srcset="" />
        </div>
      </div>
      <div class="list">
        <div class="left">To BITPARTY Safe Address:</div>
        <div class="right">
          <span>{{
            getAddress(
              "bc1p8qspx28qqxterluxhwxka5jqe50t90pa378xgxhag59l2m8y588spwlq7k"
            )
          }}</span>
          <img src="@/assets/copy.png" alt="" srcset="" />
        </div>
      </div>
      <div class="list">
        <div class="left">Service Fee:</div>
        <div class="right">0.001 BTC</div>
      </div>
      <div class="list tran">
        <div class="fee">Transaction Fee</div>
        <div
          :class="`Normal ${feeType === 'Economy' ? 'active' : ''}`"
          @click="getFee(recommendedData.economyFee, 'Economy')"
        >
          <div>Economy</div>
          <div>{{ recommendedData?.economyFee }} sats/vb</div>
        </div>
        <div
          :class="`Normal ${feeType === 'Normal' ? 'active' : ''}`"
          @click="getFee(recommendedData.halfHourFee, 'Normal')"
        >
          <div>Normal</div>
          <div>{{ recommendedData?.halfHourFee }} sats/vb</div>
        </div>
        <div
          :class="`Normal ${feeType === 'Rapid' ? 'active' : ''}`"
          @click="getFee(recommendedData.fastestFee, 'Rapid')"
        >
          <div>Rapid</div>
          <div>{{ recommendedData?.fastestFee }} sats/vb</div>
        </div>
      </div>
      <div class="btn" @click="Confirm">Confirm</div>
    </div>
  </a-modal>
</template>

<style scoped lang="scss">
.transfer_style {
  height: 400px;
  position: relative;
  .head-img {
    position: absolute;
    left: -16px;
    top: -114px;
    width: 110px;
  }
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
  }
  .title {
    font-family: LilitaOne;
    font-size: 15px;
    font-weight: 400;
  }
  .list {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    background-color: #ededed;
    margin-bottom: 16px;
    font-family: LilitaOne;
    font-size: 15px;
    font-weight: 400;
    padding-left: 23px;
    padding-right: 18px;
    border-radius: 4px;
  }
  .tran {
    height: 60px;
    .fee {
      line-height: 60px;
      width: 131px;
    }
    .Normal {
      line-height: 22px;
      padding-top: 9px;
      text-align: center;
      width: 100px;
      cursor: pointer;
    }
    .Normal:hover {
      background-color: rgba(242, 151, 0, 0.2);
    }
    .Normal.active {
      background-color: rgba(242, 151, 0, 0.2);
    }
  }
  .btn {
    width: 180px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    margin: 0 auto;
    background: #f6cb37;
    border: 2px solid rgba(0, 0, 0, 1);
    box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
    font-family: LilitaOne;
    font-size: 20px;
    font-weight: 400;
    border-radius: 8px;
  }
}
</style>
<style></style>
