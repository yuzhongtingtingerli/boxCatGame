<script setup>
import Web3 from "web3";
import { ref } from "vue";
import {
  getRecommendedData,
  getUtxoData,
  getInscriptionInfoData,
} from "@/services/wallet.js";
import bridgeBackAbi from "@/abi/bridgeBack.json";
import { getAddress } from "@/utils/Tools";
import Big from "big.js";
import {
  doBridgeData,
  getTransferInfoData,
  doBridgePostData,
} from "@/services/index.js";
import { sendBTC } from "@unisat/wallet-sdk/es/tx-helpers";
import { sendInscriptions } from "./send-inscriptions.ts";

let toEthAddress;
if (window.location.origin.indexOf("bitparty.tech") !== -1) {
  toEthAddress = "0x0EcdaB26922fB48aD18f6848181044a4B3326875";
} else {
  toEthAddress = "0x020D5741be5Af82aA9332C2d3B9cFCA3133025f5";
}

const spinning = ref(false);
const show = ref(false);
const BTCAddress = ref("");
const ETHAddress = ref("");
const tickData = ref("");
const satoshiData = ref("");
let inscriptionId = ref("");
const btcAmount = ref(null);
const emit = defineEmits(["change"]);
const walletType = ref("");
const stakeAddress = ref("");
const open = (
  type,
  btc,
  eth,
  insId = "",
  tick,
  amt,
  satoshi = "",
  stakeAddr = ""
) => {
  walletType.value = type;
  if (type === "BTC") {
    getRecommended();
  }

  getTransferInfo(tick, amt, type);
  BTCAddress.value = btc;
  ETHAddress.value = eth;
  inscriptionId.value = insId;
  tickData.value = tick;
  satoshiData.value = satoshi;
  btcAmount.value = amt;
  stakeAddress.value = stakeAddr;
  // getGasPrice(amt);
};

const getGasPrice = async (amt) => {
  const provider = window["ethereum"] || window.web3.currentProvider;
  let web3 = new Web3(provider);
  let contract = new web3.eth.Contract(bridgeBackAbi, stakeAddress.value);
  const ETHWalletType = window.localStorage.getItem("ETHWalletType");
  if (ETHWalletType === "ip") {
    web3.setProvider(okxwallet);
  }
  let num1 = new Big(amt);
  let num2 = new Big("10").pow(18);
  let amount = Number(num1.times(num2).toFixed(6));
  const data = await contract.methods
    .transfer(toEthAddress, amount)
    .encodeABI();
  const transaction = {
    to: toEthAddress,
    data,
    value: amount,
  };
  const _gas = await web3.eth.estimateGas({
    ...transaction,
    from: ETHAddress.value,
  });
  console.log(_gas, "_gas");
  const gas = (_gas * 110n) / 100n;
  const gasPrice = await web3.eth.getGasPrice();
  const balance = web3.utils.fromWei(gas * gasPrice, "ether");
  console.log("balance", balance);
};

const serviceFee = ref("");
const toAddress = ref("");
const serviceAddress = ref("");
const getTransferInfo = async (tick, amt, type) => {
  console.log(tick, amt, type, "tick, amt, type");
  const res = await getTransferInfoData({
    TokenSymbol: tick,
    TokenBalance: amt,
    TokenType: type === "ETH" ? "ethereum" : undefined,
  });
  if (res.statusCode === 1) {
    serviceFee.value = res.result.ServiceFee;
    toAddress.value = res.result.AssetsAddress;
    serviceAddress.value = res.result.ServiceAddress;
    show.value = true;
  } else {
    close();
    emit("change", "error", res.result);
  }
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
  feeType.value = "Normal";
};

const customSendInscription = async () => {
  const serviceFeeData = serviceFee.value * 10000 * 10000;
  const pubkey = await window.unisat.getPublicKey();
  const { data: btcUtxos } = await getUtxoData({ address: BTCAddress.value });
  console.log(btcUtxos, "btcUtxos");
  const { data: inscriptionInfo } = await getInscriptionInfoData({
    inscriptionId: inscriptionId.value,
  });
  console.log(inscriptionInfo, "inscriptionInfo");
  const { psbt, toSignInputs } = await sendInscriptions({
    btcUtxos: btcUtxos.utxo.map((v) => ({
      txid: v.txid,
      vout: v.vout,
      satoshis: v.satoshi,
      scriptPk: v.scriptPk,
      pubkey,
      addressType: 2,
      inscriptions: v.inscriptions,
      atomicals: [],
    })),
    assetUtxos: [
      {
        txid: inscriptionInfo.utxo.txid,
        vout: inscriptionInfo.utxo.vout,
        satoshis: inscriptionInfo.utxo.satoshi,
        scriptPk: inscriptionInfo.utxo.scriptPk,
        pubkey,
        addressType: 2,
        inscriptions: inscriptionInfo.utxo.inscriptions,
        atomicals: [],
        enableRBF: true,
        // sendBtcValue: serviceFeeData,
        // serviceAddress: serviceAddress.value,
      },
    ],
    toAddress: toAddress.value,
    feeRate: feeData.value,
    networkType: 0,
    changeAddress: BTCAddress.value,
    enableRBF: true,
  });
  console.log(psbt, toSignInputs, "psbt, toSignInputs");
  const psbtHex = psbt.toHex();
  const tixd = await window.unisat.signPsbt(psbtHex);
  const res = await window.unisat.pushPsbt(tixd);
  return res;
};
const sendBitcoin = async () => {
  if (tickData.value === "btc") {
    return customSendBTC();
  } else {
    const btc = 1 * 10000 * 10000;
    const satoshis = Number((serviceFee.value * btc).toFixed(0));
    const txid = await unisat.sendBitcoin(serviceAddress.value, satoshis);
    return txid;
  }
};
const getPsbtHex = async (pubkey, btcAmountData) => {
  const { data: btcUtxos } = await getUtxoData({ address: BTCAddress.value });
  const { psbt, toSignInputs } = await sendBTC({
    btcUtxos: btcUtxos.utxo.map((v) => ({
      txid: v.txid,
      vout: v.vout,
      satoshis: v.satoshi,
      scriptPk: v.scriptPk,
      pubkey,
      addressType: 2,
      inscriptions: v.inscriptions,
      atomicals: [],
    })),
    tos: [
      // {
      //   address: serviceAddress.value,
      //   satoshis: serviceFeeData,
      // },
      {
        address: toAddress.value,
        satoshis: btcAmountData,
      },
    ],
    networkType: 0,
    changeAddress: BTCAddress.value,
    feeRate: feeData.value,
  });
  const psbtHex = psbt.toHex();
  return { psbtHex, toSignInputs };
};
const customSendBTC = async () => {
  try {
    // const serviceFeeData = serviceFee.value * 10000 * 10000;
    const BTCWalletType = window.localStorage.getItem("BTCWalletType");
    const btcAmountData = btcAmount.value * 10000 * 10000;
    if (BTCWalletType === "unisat") {
      const pubkey = await window.unisat.getPublicKey();
      const { psbtHex, toSignInputs } = await getPsbtHex(pubkey, btcAmountData);
      const tixd = await window.unisat.signPsbt(psbtHex, {
        autoFinalized: true,
        toSignInputs,
      });
      const res = await window.unisat.pushPsbt(tixd);
      return res;
    } else if (BTCWalletType === "okx") {
      let txid = await okxwallet.bitcoin.sendBitcoin(
        toAddress.value,
        btcAmountData,
        {
          feeRate: feeData.value,
        }
      );
      return txid;
    }
  } catch (error) {
    const errorMsg = {
      ErrorTitle: "External Service Error",
      ErrorMessage: error,
    };
    emit("change", "error", errorMsg);
    close();
    return false;
  }
};
const Confirm = async () => {
  // customSendInscription();
  // return;

  let txid;
  if (walletType.value === "BTC") {
    if (tickData.value !== "btc") {
      txid = await sendInscription(toAddress.value, inscriptionId.value, {
        feeRate: feeData.value,
      });
      if (!txid) return;
    } else {
      txid = await sendBitcoin();
      if (!txid) return;
    }
    doBridge(
      BTCAddress.value,
      "1",
      tickData.value,
      btcAmount.value,
      txid,
      ETHAddress.value
    );
  } else {
    txid = await sendEth();
    doBridgePost(
      ETHAddress.value,
      "2",
      tickData.value,
      btcAmount.value,
      txid,
      BTCAddress.value
    );
  }
};

const sendEth = async () => {
  spinning.value = true;
  const provider = window["ethereum"] || window.web3.currentProvider;
  let web3 = new Web3(provider);
  let contract = new web3.eth.Contract(bridgeBackAbi, stakeAddress.value);
  const ETHWalletType = window.localStorage.getItem("ETHWalletType");
  if (ETHWalletType === "ip") {
    web3.setProvider(okxwallet);
  }
  let num1 = new Big(btcAmount.value);
  let num2 = new Big("10").pow(18);
  let amount = Number(num1.times(num2).toFixed(6));
  try {
    const res = await contract.methods
      .transfer(toEthAddress, amount)
      .send({ from: ETHAddress.value });
    spinning.value = false;
    return res.transactionHash;
  } catch (error) {
    spinning.value = false;
  }
};

const sendInscription = async (address, id, feeRate) => {
  try {
    const BTCWalletType = window.localStorage.getItem("BTCWalletType");
    if (BTCWalletType === "unisat") {
      let txid = await window.unisat.sendInscription(address, id, feeRate);
      return txid;
    } else if (BTCWalletType === "okx") {
      let txid = await okxwallet.bitcoin.sendInscription(address, id, feeRate);
      return txid;
    }
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
    close();
    const errorMsg = {
      ErrorTitle: "External Service Error",
      ErrorMessage: res.result.error,
    };
    emit("change", "error", errorMsg);
  }
};

const doBridgePost = async (
  BridgeFromAddress,
  BridgeType,
  BridgeTokenSymbol,
  BridgeTokenBalance,
  BridgeTxHash,
  BridgeToAddress
) => {
  const res = await doBridgePostData({
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
    close();
    const errorMsg = {
      ErrorTitle: "External Service Error",
      ErrorMessage: res.result.error,
    };
    emit("change", "error", errorMsg);
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
    <a-spin :spinning="spinning">
      <div :class="`transfer_style ${walletType === 'ETH' ? 'h200' : ''}`">
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
            <span>{{
              getAddress(walletType === "BTC" ? BTCAddress : ETHAddress)
            }}</span>
            <img src="@/assets/copy.png" alt="" srcset="" />
          </div>
        </div>
        <div class="list">
          <div class="left">To BITPARTY Safe Address:</div>
          <div class="right" v-if="toAddress">
            <span>{{
              getAddress(walletType === "BTC" ? toAddress : toEthAddress)
            }}</span>
            <img src="@/assets/copy.png" alt="" srcset="" />
          </div>
        </div>
        <div class="list" v-if="walletType === 'BTC'">
          <div class="left">Service Fee:</div>
          <div class="right">{{ serviceFee }} {{ walletType }}</div>
        </div>
        <div
          :class="`list ${walletType === 'BTC' ? 'tran' : ''}`"
          v-if="walletType === 'BTC'"
        >
          <div class="fee">Transaction Fee</div>
          <div class="fee-data" v-if="walletType === 'BTC'">
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
          <div class="gas" v-else>0</div>
        </div>
        <div class="btn" @click="Confirm">Confirm</div>
      </div>
    </a-spin>
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
    .fee-data {
      display: flex;
    }
    .gas {
      line-height: 60px;
    }
    .Normal {
      line-height: 22px;
      padding-top: 9px;
      text-align: center;
      width: 95px;
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
.h200 {
  height: 220px;
}
</style>
<style></style>
