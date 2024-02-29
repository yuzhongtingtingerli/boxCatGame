<script setup>
import { ref } from "vue";
import { getRecommendedData } from "@/services/wallet.js";
import { getAddress } from "@/utils/Tools";
import { doBridgeData, getTransferInfoData } from "@/services/index.js";
import { expect } from "chai";
import { dummySendInscriptions, genDummyUtxo } from "./utils.ts";
import { AddressType } from "@unisat/wallet-sdk";
import { NetworkType } from "@unisat/wallet-sdk/es/network";
import { LocalWallet } from "@unisat/wallet-sdk/es/wallet";
import { sendInscriptions } from "@unisat/wallet-sdk/es/tx-helpers";
const show = ref(false);
const BTCAddress = ref("");
const ETHAddress = ref("");
const tickData = ref("");
const amtData = ref("");
const satoshiData = ref("");
let inscriptionId = ref("");
const emit = defineEmits(["change"]);
const open = (btc, eth, insId, tick, amt, satoshi) => {
  getRecommended();
  getTransferInfo();
  show.value = true;
  BTCAddress.value = btc;
  ETHAddress.value = eth;
  inscriptionId.value = insId;
  tickData.value = tick;
  satoshiData.value = satoshi;
};
const serviceFee = ref("");
const toAddress = ref("");
const getTransferInfo = async () => {
  const res = await getTransferInfoData();
  serviceFee.value = res.result.ServiceFee;
  toAddress.value = res.result.ToAddress;
};
const close = () => {
  show.value = false;
};
const feeType = ref("Normal");
const feeData = ref(0);
const getFee = (fee, type) => {
  feeData.value = fee;
  feeType.value = type;
};
const recommendedData = ref(null);
const getRecommended = async () => {
  const res = await getRecommendedData();
  recommendedData.value = res;
  feeData.value = res.halfHourFee;
};
const sendBitcoin = async () => {
  const txid = await unisat.sendBitcoin(
    toAddress.value,
    Number((serviceFee.value / 0.00000001).toFixed(0))
  );
  return txid;
};

const Confirm = async () => {
  // const fromBtcWallet = LocalWallet.fromRandom(
  //   AddressType.P2TR,
  //   NetworkType.MAINNET
  // );
  // const fromAssetWallet = LocalWallet.fromRandom(
  //   AddressType.P2TR,
  //   NetworkType.MAINNET
  // );
  // const { psbt, toSignInputs } = await sendInscriptions({
  //   btcUtxos: [
  //     genDummyUtxo(
  //       fromBtcWallet,
  //       Number((serviceFee.value / 0.00000001).toFixed(0))
  //     ),
  //   ],
  //   assetUtxos: [
  //     genDummyUtxo(fromAssetWallet, 330, {
  //       // 我的地址 satoshis
  //       inscriptions: [
  //         {
  //           inscriptionId:
  //             "773e26907545661840276a59137dd82bc7a7f73f0684fa1457cb2f2b883496b4i0",
  //           offset: 0,
  //         },
  //       ],
  //     }),
  //   ],
  //   toAddress: toAddress.value,
  //   feeRate: feeData.value,
  //   networkType: fromBtcWallet.networkType,
  //   changeAddress: BTCAddress.value,
  // });
  // console.log(psbt, toSignInputs, "psbt, toSignInputs");
  // // return;
  // // console.log(ret, "ret");
  // // console.log(ret.psbt.toHex(), "psbt");
  // let res = await window.unisat.signPsbt(psbt.toHex());
  // console.log(res, "res");
  // return;
  const id = await sendBitcoin();
  if (!id) return;
  setTimeout(async () => {
    const txid = await sendInscription(
      toAddress.value,
      inscriptionId.value,
      feeData.value
    );
    if (!txid) return;
    doBridge(
      BTCAddress.value,
      "1",
      tickData.value,
      amtData.value,
      txid,
      ETHAddress.value
    );
  }, 5000);
};
const sendInscription = async (address, id, { feeRate }) => {
  try {
    let txid = await window.unisat.sendInscription(address, id, feeRate);
    return txid;
  } catch (e) {
    console.log(e, "error");
  }
};

const doBridge = async (
  BridgeFromAddress,
  BridgeType,
  BridgeTokenSymbol,
  BridgeTokenBalance,
  BridgeTxHash,
  BridgeToAddress
) => {
  const res = await doBridgeData({
    BridgeFromAddress,
    BridgeType,
    BridgeTokenSymbol,
    BridgeTokenBalance,
    BridgeTxHash,
    BridgeToAddress,
  });
  if (res.result.BridgeStatus === "OK") {
    close();
    emit("change", "success", BridgeTxHash);
  } else {
    emit("change", "error");
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
    <div class="transfer_style">
      <img class="head-img" src="@/assets/cat_ava.png" />
      <div class="top">
        <div class="title">It Will Cost 30 Mins</div>
        <div class="close" @click="close">
          <img src="@/assets/close.png" height="24px" alt="" srcset="" />
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
          <span>{{ getAddress(toAddress) }}</span>
          <img src="@/assets/copy.png" alt="" srcset="" />
        </div>
      </div>
      <div class="list">
        <div class="left">Service Fee:</div>
        <div class="right">{{ serviceFee }} BTC</div>
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
          @click="
            getFee(
              Number((recommendedData?.fastestFee * 1.4).toFixed(0)),
              'Rapid'
            )
          "
        >
          <div>Rapid</div>
          <div>
            {{ (recommendedData?.fastestFee * 1.4).toFixed(0) }} sats/vb
          </div>
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
  .close {
    cursor: pointer;
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
    cursor: pointer;
  }
}
</style>
<style></style>
