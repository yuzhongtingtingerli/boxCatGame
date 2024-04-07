<script setup>
import Web3 from "web3";
import { ref, onMounted } from "vue";
import erc20Abi from "@/abi/erc20.json";
import stakeAbi from "@/abi/stake.json";
const emit = defineEmits(["change"]);
const record = ref();
const show = ref(false);
const balance = ref(0);
const spinning = ref(false);
const open = async (symbol, ETHaddress) => {
  record.value = symbol;
  balance.value = symbol.TokenWaitingBalance;
  show.value = true;
  return;
  record.value = symbol;
  balance.value = symbol.TokenWaitingBalance;
  const newBalance = await getBalance();
  if (newBalance >= BigInt(symbol.TokenWaitingBalance * 10 ** 18)) {
    show.value = true;
    spinning.value = false;
  } else {
    const errorBalance = {
      tkn: symbol.TokenContractAddress,
      fadd: ETHaddress,
    };
    emit("change", "errorBalance", errorBalance);
  }
};
const close = () => {
  show.value = false;
};
const Confirm = () => {
  if (balance.value === 0) return;
  spinning.value = true;
  goStake();
};
const getBalance = async () => {
  try {
    let web3 = new Web3(window.web3.currentProvider);
    let fromAddresses = await web3.eth.getAccounts();
    let brc20Contract = new web3.eth.Contract(
      erc20Abi,
      record.value.BridgeTokenContractAddress ||
        record.value.TokenContractAddress
    );
    const res = await brc20Contract.methods.balanceOf(fromAddresses[0]).call();
    return res;
  } catch (error) {
    console.log(error, "e");
  }
};
const goStake = async () => {
  let stakeAddress;
  if (window.location.origin.indexOf("bitparty.tech") !== -1) {
    stakeAddress = "0xC854a902c6E1D9F861342318fC612041d63dB15A";
  } else {
    stakeAddress = "0x4Df30bE441ecdF9B5D118286E7EFe2EC4C106b20";
  }
  // let stakeAddress = "0xC854a902c6E1D9F861342318fC612041d63dB15A";
  try {
    const provider = window["ethereum"] || window.web3.currentProvider;
    let web3 = new Web3(provider);
    let contract = new web3.eth.Contract(stakeAbi, stakeAddress);
    let fromAddresses = await web3.eth.getAccounts();
    let amount = balance.value * 10 ** 18;
    let brc20Contract = new web3.eth.Contract(
      erc20Abi,
      record.value.BridgeTokenContractAddress ||
        record.value.TokenContractAddress
    );
    // debugger;
    brc20Contract.methods
      .approve(stakeAddress, amount)
      .send({ from: fromAddresses[0] })
      .then(async (r) => {
        console.log("approve res", r);
        try {
          const res = await contract.methods
            .stake(
              record.value.BridgeTokenContractAddress ||
                record.value.TokenContractAddress,
              amount
            )
            .send({ from: fromAddresses[0] });
          close();
          spinning.value = false;
          emit("change", "success", res.transactionHash);
        } catch (error) {
          console.log(error, "stakeerror");
          emit("change", "error", error);
          close();
          spinning.value = false;
        }
      })
      .catch((error) => {
        console.log(error, "approveerror");
        emit("change", "error", error);
        close();
        spinning.value = false;
      });
  } catch (error) {
    console.log(error, "Contracterror");
    emit("change", "error", error);
    close();
    spinning.value = false;
  }
};
onMounted(() => {});
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
      <div class="modal_style">
        <img class="head-img" src="@/assets/cat_ava.png" />
        <div class="close" @click="close">
          <img src="@/assets/close.png" height="24px" alt="" srcset="" />
        </div>
        <div class="title">stake To Smart contract</div>
        <div class="desc">This is the last step</div>
        <div class="sats">
          <div class="txt">From</div>
          <div class="txt">to</div>
          <div class="txt">
            {{ decodeURIComponent(record.TokenSymbol) }} Group
          </div>
        </div>
        <div class="sats">
          <div class="txt input_style">
            Amount
            <a-input
              class="amount"
              v-model:value="balance"
              disabled
              size="small"
            ></a-input>
          </div>
          <div class="txt">
            {{ decodeURIComponent(record.TokenSymbol) }}
            <!-- <span class="max">Maximum</span> -->
          </div>
        </div>
        <div class="warn">
          After the game is over, you can get all your assets back.
        </div>

        <div class="btn" @click="Confirm">Confirm</div>
      </div>
    </a-spin>
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

  .title {
    text-align: center;
    font-family: LilitaOne;
    font-size: 30px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
  }
  .desc {
    text-align: center;
    font-family: LilitaOne;
    font-size: 15px;
    margin-top: 20px;
    padding-bottom: 10px;
  }
  .sats {
    font-family: LilitaOne;
    background: #ededed;
    height: 40px;
    padding: 0 22px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    .amount {
      color: rgba(0, 0, 0, 0.2);
      margin-left: 10px;
    }
    .max {
      color: #b06ce5;
      margin-left: 10px;
    }
    .input_style {
      display: flex;
    }
  }
  .warn {
    font-family: LilitaOne;
    color: #ff4d00;
    margin-top: 8px;
  }
  .btn {
    width: 180px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    margin: 0 auto;
    background: #b06ce5;
    border: 2px solid rgba(0, 0, 0, 1);
    box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
    font-family: LilitaOne;
    font-size: 20px;
    font-weight: 400;
    border-radius: 8px;
    margin-top: 42px;
    cursor: pointer;
  }
}
</style>

<style>
.input_style .ant-input.ant-input-sm.css-dev-only-do-not-override-19yxfbp {
  background-color: #ededed;
  border: none;
  input {
    background-color: #ededed;
    font-family: LilitaOne;
    font-size: 15px;
    font-weight: 400;
  }
}
</style>
