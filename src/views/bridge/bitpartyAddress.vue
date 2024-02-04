<script setup>
import Web3 from "web3";
import { ref, onMounted } from "vue";
import erc20Abi from "@/abi/erc20.json";
import stakeAbi from "@/abi/stake.json";
const emit = defineEmits(["change"]);
const amountData = ref(null);
const record = ref();
const show = ref(false);
const open = (symbol) => {
  show.value = true;
  record.value = symbol;
};
const close = () => {
  show.value = false;
};
const Confirm = () => {
  console.log(record.value, "BridgeTokenSymbol.value");
  console.log(amountData.value, "amountData.value");
  if (amountData.value) {
    goStake();
  }
};
const goStake = async () => {
  var stakeAddress = "0x0058616ba6bE4cE5e588c0453332dbA13aea32d0";
  let web3 = new Web3(window.web3.currentProvider);

  let contract = new web3.eth.Contract(stakeAbi, stakeAddress);
  let fromAddresses = await web3.eth.getAccounts();
  let amount = amountData.value * 10 ** 18;

  let brc20Contract = new web3.eth.Contract(
    erc20Abi,
    record.value.BridgeTokenContractAddress
  );
  // debugger;
  brc20Contract.methods
    .approve(stakeAddress, amount)
    .send({ from: fromAddresses[0] })
    .then(async (r) => {
      console.log("approve res", r);
      const res = await contract.methods
        .stake(record.value.BridgeTokenContractAddress, amount)
        .send({ from: fromAddresses[0] });
      close();
    });
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
    <div class="modal_style">
      <img class="head-img" src="@/assets/cat_ava.png" />
      <div class="close" @click="close">
        <img src="@/assets/close.png" alt="" srcset="" />
      </div>
      <div class="title">To bitparty address</div>
      <div class="desc">it will cost 30 mins</div>
      <div class="sats">
        <div class="txt">{{ record.BridgeTokenSymbol }} account</div>
        <div class="txt">to</div>
        <div class="txt">{{ record.BridgeTokenSymbol }} group</div>
      </div>
      <div class="sats">
        <div class="txt input_style">
          amount
          <a-input
            class="amount"
            v-model:value="amountData"
            placeholder="0.222"
            size="small"
          ></a-input>
        </div>
        <div class="txt">
          {{ record.BridgeTokenSymbol }}
          <span class="max">maximum</span>
        </div>
      </div>
      <div class="warn">you should do something first</div>

      <div class="btn" @click="Confirm">Confirm</div>
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
      color: #ffaa08;
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
    background: #f6cb37;
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
