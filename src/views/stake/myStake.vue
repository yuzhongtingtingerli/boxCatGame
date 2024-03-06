<template>
  <div class="myStake">
    <div class="top">
      <div class="title">MY STAKE</div>
      <div class="wallet" @click="connectETHWallet">
        <img
          src="@/assets/matemask.png"
          width="32px"
          style="margin-right: 12px"
          alt=""
          srcset=""
        />
        {{
          Address.ETHaddress ? getAddress(Address.ETHaddress) : "Connect Wallet"
        }}
      </div>
    </div>
    <div class="nocontent" v-if="!Address.ETHaddress">
      Please connect your wallet, check the white paper know the rules
    </div>
    <div class="content" v-else>
      <MyTokenList :address="Address.ETHaddress" />
      <MyStakeList :address="Address.ETHaddress" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MyTokenList from "./myTokenList.vue";
import MyStakeList from "./myStakeList.vue";
import { getAddress } from "@/utils/Tools";
import { useAddressStore } from "@/store/address";

const Address = useAddressStore();
const connectETHWallet = async () => {
  Address.linkETHWallet();
};
onMounted(() => {
  Address.getETHWallet();
  Address.getBTCWallet();
});
</script>
<style scoped lang="scss">
.myStake {
  padding-top: 60px;
  .top {
    display: flex;
    justify-content: space-between;
    .title {
      font-family: LilitaOne;
      font-size: 40px;
      font-weight: 400;
      line-height: 46px;
    }
    .wallet {
      font-family: LilitaOne;
      font-size: 18px;
      font-weight: 400;
      width: 240px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background: linear-gradient(
        135deg,
        rgba(131, 196, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.1) 100%
      );
      cursor: pointer;
    }
  }
  .nocontent {
    margin-top: 20px;
    height: 300px;
    line-height: 300px;
    text-align: center;
    font-family: LilitaOne;
    font-size: 15px;
    font-weight: 400;
    color: #ffffff;
    background: linear-gradient(
      135deg,
      rgba(131, 196, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
  }
  .content {
    margin-top: 20px;
    height: 400px;
    padding: 30px 15px;
    display: flex;
    justify-content: space-between;
    background: linear-gradient(
      135deg,
      rgba(131, 196, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
  }
}
</style>
